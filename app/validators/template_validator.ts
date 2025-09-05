import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import Channel from '#enums/channel'
import AttributeType from '#enums/attribute_type'

vine.messagesProvider = new SimpleMessagesProvider({
  'content.required': 'Template content is required.',
  'content.minLength': 'Template content must be at least {{ min }} characters long.',
  'content.maxLength': 'Template content must not exceed {{ max }} characters.',
  'content.sms.maxLength': 'SMS messages must not exceed 160 characters.',
  'content.push.maxLength': 'Push notifications must not exceed 256 characters.',
  'content.email.maxLength': 'Email content must not exceed 2000 characters.',
  'channel.required': 'Channel type is required.',
  'channel.in': 'Invalid channel type. Must be SMS, EMAIL, or PUSH.',
  'notification_id.required': 'Notification selection is required.',
  'notification_id.number': 'Invalid notification ID.',
  'notification_id.positive': 'Notification ID must be a positive number.',
  'attributes.array': 'Attributes must be an array.',
  'attributes.*.name.required': 'Attribute name is required.',
  'attributes.*.name.minLength': 'Attribute name must be at least {{ min }} characters long.',
  'attributes.*.name.maxLength': 'Attribute name must not exceed {{ max }} characters.',
  'attributes.*.type.required': 'Attribute type is required.',
  'attributes.*.type.in': 'Invalid attribute type.',
  'attributes.*.isRequired.boolean': 'Attribute required flag must be a boolean.',
})

const contentLengthRule = vine.createRule(async (value, _, field) => {
  const channel = field.parent.channel as Channel
  const content = value as string
  if (channel === Channel.SMS && content.length > 160) {
    field.report('SMS messages must not exceed 160 characters.', 'sms.maxLength', field)
    return false
  }

  if (channel === Channel.PUSH && content.length > 256) {
    field.report('Push notifications must not exceed 256 characters.', 'push.maxLength', field)
    return false
  }

  if (channel === Channel.EMAIL && content.length > 100000) {
    field.report('Email content must not exceed 100000 characters.', 'email.maxLength', field)
    return false
  }

  return true
})

const attributeSchema = vine.object({
  name: vine.string().trim().minLength(1).maxLength(50),
  type: vine.enum(Object.values(AttributeType)),
  isRequired: vine.boolean(),
})

const baseTemplateSchema = vine.object({
  channel: vine.enum(Object.values(Channel)),
  content: vine.string().trim().minLength(1).maxLength(100000).use(contentLengthRule()),
  attributes: vine.array(attributeSchema).optional(),
  images: vine
    .array(
      vine.file({
        size: '5mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
    )
    .optional(),
})

const createTemplateSchema = vine.object({
  notification_id: vine.number().positive(),
  ...baseTemplateSchema.getProperties(),
})

const updateTemplateSchema = vine.object({
  ...baseTemplateSchema.getProperties(),
})

export const createTemplateValidator = vine.compile(createTemplateSchema)
export const updateTemplateValidator = vine.compile(updateTemplateSchema)
