import { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import Template from '#models/template'
import NotificationDelivery from '#models/notification_delivery'
import NotificationDeliveryStatus from '#enums/notification_delivery_status'
import {
  sendNotificationValidator,
  getNotificationStatusValidator,
} from '#validators/api_validator'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as lucidErrors } from '@adonisjs/lucid'
import { errors as mailErrors } from '@adonisjs/mail'
import { formatChannelName } from '#utils/formatChannelName'
import AttributeType from '#enums/attribute_type'
import { buildAttributeValidator } from '#utils/buildAttributeValidator'
import AttributeValue from '#models/attribute_value'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import Channel from '#enums/channel'

export default class ApiController {
  async sendNotification(ctx: HttpContext) {
    let requestedTemplate: Template | undefined
    try {
      const payload = await sendNotificationValidator.validate(ctx.request.body())
      const { title, notificationId, externalId, channel, recipients, attributes = {} } = payload
      const projectId = ctx.request.input('projectId')

      const query = Notification.query()
        .where('projectId', projectId)
        .select('id', 'title')
        .preload('templates')

      if (notificationId) {
        query.andWhere('id', notificationId)
      } else if (externalId) {
        query.andWhere('externalId', externalId)
      }

      const notification = await query.firstOrFail()

      requestedTemplate = notification.templates.find(
        (t) => formatChannelName(t.channel) === formatChannelName(channel)
      )

      if (!requestedTemplate) {
        const availableChannels = notification.templates.map((t) => formatChannelName(t.channel))
        return ctx.response.status(400).json({
          error: 'Invalid channel',
          message: availableChannels.length
            ? `The channel ${formatChannelName(channel)} is not available for this notification. Available channels are: ${availableChannels.join(', ')}`
            : `The channel ${formatChannelName(channel)} is not available for this notification, and no channels are configured.`,
        })
      }

      await requestedTemplate.load('attributes')

      const validator = buildAttributeValidator(requestedTemplate.attributes)
      const attributesOutput = await validator.validate(attributes)

      let processedContent = requestedTemplate.content

      for (const [key, value] of Object.entries(attributesOutput)) {
        const placeholder = `{{${key}}}`
        processedContent = processedContent.replace(new RegExp(placeholder, 'g'), String(value))
      }

      const recipientsArray = Array.isArray(recipients) ? recipients : [recipients]

      const deliveries = await Promise.all(
        recipientsArray.map(async (recipient) => {
          let status: NotificationDeliveryStatus = NotificationDeliveryStatus.SENT
          let failReason: string | null = null

          if (channel === Channel.EMAIL) {
            try {
              await mail.send((message) => {
                message
                  .to(recipient)
                  .from('info@notifyhub.org')
                  .subject(title ?? notification.title)
                  .html(processedContent)
              })
            } catch (error: any) {
              if (error instanceof mailErrors.E_MAIL_TRANSPORT_ERROR) {
                status = NotificationDeliveryStatus.FAILED
                failReason = (error.cause as string) ?? 'Unknown email transport error'
              } else {
                throw error
              }
            }
          } else {
            if (Math.random() < 0.2) {
              status = NotificationDeliveryStatus.FAILED
              failReason = `${formatChannelName(channel)} failed to deliver`
            }
          }

          const delivery = await NotificationDelivery.create({
            title: title ?? notification.title,
            templateId: requestedTemplate!.id,
            recipient: recipient,
            status,
            failReason,
            sentAt: status === NotificationDeliveryStatus.SENT ? DateTime.now() : null,
          })

          await Promise.all(
            requestedTemplate!.attributes.map((attr) => {
              const value = attributesOutput[attr.name]
              if (value === undefined) return Promise.resolve()

              return AttributeValue.create({
                notificationDeliveryId: delivery.id,
                attributeId: attr.id,
                valueString: attr.type === AttributeType.TEXT ? String(value) : null,
                valueNumber: attr.type === AttributeType.NUMBER ? Number(value) : null,
                valueDate:
                  attr.type === AttributeType.DATE && value
                    ? DateTime.fromJSDate(new Date(value))
                    : null,
              })
            })
          )

          return {
            id: delivery.id,
            recipient: delivery.recipient,
            status,
            ...(failReason && { failReason }),
          }
        })
      )

      return ctx.response.status(201).json({
        message: 'Notification deliveries processed',
        deliveries,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        const formattedErrors: Record<string, any> = {}
        const attributeNames = requestedTemplate
          ? requestedTemplate?.attributes.map((attr) => attr.name)
          : []

        for (const m of error.messages) {
          const field = m.field
          if (attributeNames.includes(field)) {
            if (!formattedErrors.attributes) formattedErrors.attributes = {}
            formattedErrors.attributes[field] = m.message
          } else {
            formattedErrors[field] = m.message
          }
        }

        return ctx.response.status(400).json({
          error: 'Validation failed',
          errors: formattedErrors,
        })
      }

      if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
        if (error.model?.name === 'Notification') {
          return ctx.response.status(404).json({
            error: 'Notification Not Found',
            message: 'The requested notification does not exist for this project.',
          })
        }
      }

      return ctx.response.status(500).json({
        error: 'Failed to send notification',
        message: 'An error occurred while processing your request',
      })
    }
  }
  async getNotificationStatus(ctx: HttpContext) {
    try {
      const { id } = await getNotificationStatusValidator.validate(ctx.params)
      const projectId = ctx.request.input('projectId')

      const notificationDelivery = await NotificationDelivery.query()
        .where('id', id)
        .preload('attributeValues', (query) => {
          query.select('attribute_id', 'value_string', 'value_number', 'value_date')
        })
        .preload('template', (templateQuery) => {
          templateQuery.preload('attributes', (attrQuery) => {
            attrQuery.select('id', 'name', 'type')
          })
          templateQuery.preload('notification', (notificationQuery) => {
            notificationQuery.where('project_id', projectId).select('project_id')
          })
          templateQuery.select('notificationId')
        })
        .select('id', 'title', 'status', 'recipient', 'sent_at', 'fail_reason', 'templateId')
        .first()

      if (!notificationDelivery) {
        return ctx.response.status(404).json({
          error: 'Notification not found',
          message: 'The specified notification does not exist or belongs to another project',
        })
      }
      const attributes: Record<string, string | number | DateTime | null> = {}

      notificationDelivery.template.attributes.forEach((attr) => {
        const valueObj = notificationDelivery.attributeValues.find((v) => v.attributeId === attr.id)

        if (valueObj) {
          attributes[attr.name] =
            valueObj.valueString ?? valueObj.valueNumber ?? valueObj.valueDate ?? null
        }
      })

      const parsedNotification = {
        title: notificationDelivery.title,
        status: notificationDelivery.status,
        recipient: notificationDelivery.recipient,
        ...(notificationDelivery.sentAt && { sentAt: notificationDelivery.sentAt }),
        ...(notificationDelivery.failReason && { failReason: notificationDelivery.failReason }),
        attributes,
      }

      return ctx.response.json({
        success: true,
        data: parsedNotification,
      })
    } catch (error) {
      if (error instanceof Error) {
        return ctx.response.status(400).json({
          error: 'Validation failed',
          message: error.message,
        })
      }
      return ctx.response.status(500).json({
        error: 'Failed to retrieve notification status',
        message: 'An error occurred while processing your request',
      })
    }
  }
}
