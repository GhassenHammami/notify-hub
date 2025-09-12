import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  email: 'Please enter a valid email address',

  'fullName.required': 'Full name is required',
  'fullName.minLength': 'Full name must be more than 5 characters',
  'fullName.regex': 'Please enter both first and last name',

  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 5 characters',
  'password.regex':
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',

  'confirmPassword.required': 'Please confirm your password',
  'confirmPassword.sameAs': 'Passwords do not match',

  'agreeToTerms.confirmed': 'You must agree to the terms and conditions',
})

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine
      .string()
      .trim()
      .minLength(6)
      .regex(/^[^\s]+(?:\s+[^\s]+)+$/),

    email: vine.string().email().toLowerCase().trim().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(5),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim(),
    password: vine.string().minLength(5),
    rememberMe: vine.boolean().optional(),
  })
)
