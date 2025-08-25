import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'externalId.regex': 'Invalid external ID.',
})

const notificationSchema = vine.object({
  title: vine.string().trim().minLength(1).maxLength(255),
  externalId: vine
    .string()
    .trim()
    .maxLength(255)
    .regex(/^[a-zA-Z0-9_-]*$/)
    .optional(),
})

export const createNotificationValidator = vine.compile(notificationSchema)
export const updateNotificationValidator = vine.compile(notificationSchema)
