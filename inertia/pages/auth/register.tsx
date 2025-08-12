import React from 'react'
import { Link, Head, useForm } from '@inertiajs/react'
import Input from '../../components/Input'
import { LoaderCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import * as yup from 'yup'
import { route } from '@izzyjs/route/client'
import GuestLayout from '~/layouts/GuestLayout'
import { InertiaPage } from '~/app/app'

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .test('full-name-validation', 'Please enter both first and last name', (value) => {
      if (!value) return false
      const trimmed = value.trim()
      const parts = trimmed.split(/\s+/)

      if (parts.length < 2) {
        return false
      }

      const lettersOnly = /^[A-Za-z]+$/
      if (!lettersOnly.test(parts[0]) || !lettersOnly.test(parts[1])) {
        return new yup.ValidationError('Name must contain letters only', value, 'fullName')
      }

      return true
    }),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
})

const Register: InertiaPage = () => {
  const { data, setData, post, processing, errors, setError, clearErrors } = useForm(defaultValues)
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await validationSchema.validate(data, { abortEarly: false })
      clearErrors()

      post(route('auth.register.store').path, {
        onError: (serverErrors) => {
          toast.error('An unexpected error occurred. Please try again.')
          console.error('Registration failed:', serverErrors)
        },
      })
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const yupErrors: Record<string, string> = {}
        err.inner.forEach((error) => {
          if (error.path) {
            yupErrors[error.path] = error.message
          }
        })
        setError(yupErrors)
      }
    }
  }

  const handleConfirmPasswordBlur = (): void => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      setError('confirmPassword', 'Passwords do not match')
    }
  }

  return (
    <>
      <Head title="Register" />
      <Toaster
        containerStyle={{
          position: 'relative',
        }}
      />
      <div className="flex h-full flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 sm:max-w-lg lg:max-w-xl">
          <div className="text-center">
            <h2 className="mb-2 text-2xl leading-tight font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Create your account
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Start building with Notify Hub today
            </p>
          </div>
          <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                <Input
                  id="fullName"
                  label="Full Name"
                  required
                  type="text"
                  value={data.fullName}
                  setValue={(val) => {
                    setData('fullName', val)
                    if (errors?.fullName) clearErrors('fullName')
                  }}
                  placeholder="John Doe"
                  error={errors?.fullName}
                  disabled={processing}
                />

                <Input
                  id="email"
                  label="Email Address"
                  required
                  type="email"
                  value={data.email}
                  setValue={(val) => {
                    setData('email', val)
                    if (errors?.email) clearErrors('email')
                  }}
                  placeholder="john@company.com"
                  error={errors?.email}
                  disabled={processing}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                <Input
                  id="password"
                  label="Password"
                  required
                  type="password"
                  value={data.password}
                  setValue={(val) => {
                    setData('password', val)
                    if (errors?.password) clearErrors('password')
                  }}
                  placeholder="••••••••"
                  error={errors?.password}
                  disabled={processing}
                />

                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  required
                  type="password"
                  value={data.confirmPassword}
                  setValue={(val) => {
                    setData('confirmPassword', val)
                    if (errors?.confirmPassword) clearErrors('confirmPassword')
                  }}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="••••••••"
                  error={errors?.confirmPassword}
                  disabled={processing}
                />
              </div>

              <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                <div className="flex h-5 items-center">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={data.agreeToTerms}
                    onChange={(e) => {
                      setData('agreeToTerms', e.target.checked as any)
                      if (errors?.agreeToTerms) clearErrors('agreeToTerms')
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={processing}
                  />
                </div>
                <div className="ml-3 min-w-0 text-sm">
                  <label htmlFor="agreeToTerms" className="leading-6 text-gray-700">
                    I agree to the{' '}
                    <a href="#" tabIndex={-1} className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" tabIndex={-1} className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </a>
                    *
                  </label>
                  {errors?.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
              >
                {processing ? (
                  <div className="flex items-center gap-2.5">
                    <LoaderCircle size={20} className="animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href={route('auth.login.show')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
Register.layout = (page) => <GuestLayout children={page} />

export default Register
