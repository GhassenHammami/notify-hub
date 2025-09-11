import vine from '@vinejs/vine'
import Channel from '#enums/channel'

const recipientsRule = vine.createRule(async (v, __, field) => {
  if (!field.data.channel) return false
  const value = v as string
  const channel = (field.data.channel as string).toUpperCase() as Channel

  if (!Channel[channel]) return false

  switch (channel) {
    case Channel.EMAIL:
      if (!vine.helpers.isEmail(value)) {
        field.report('Invalid email address', 'recipients.email', field)
      }
      return
    case Channel.SMS:
      if (!vine.helpers.isMobilePhone(value)) {
        field.report('Invalid mobile phone number', 'recipients.sms', field)
      }
      return
    case Channel.PUSH:
      if (!vine.helpers.isString(value)) {
        field.report('Value must be a string for PUSH channel', 'recipients.push', field)
      }
      return
    default:
      field.report('Unknown channel type', 'recipients.unknown_channel', field)
      return
  }
})

const attributesRule = vine.createRule(async (value, __, field) => {
  if (!vine.helpers.isObject(value)) {
    field.report('Attributes must be a valid object', 'attributes', field)
  }
})

export const sendNotificationValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    notificationId: vine.number().optional().requiredIfMissing('externalId'),
    externalId: vine.string().trim().maxLength(255).optional().requiredIfMissing('notificationId'),
    channel: vine.enum(Channel).parse((value) => (value ? (value as string).toUpperCase() : value)),
    recipients: vine.unionOfTypes([
      vine.string().use(recipientsRule()),
      vine.array(vine.string().use(recipientsRule())).notEmpty().distinct().compact(),
    ]),
    attributes: vine.any().use(attributesRule()),
  })
)

export const getNotificationStatusValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
