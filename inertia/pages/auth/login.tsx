import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Input from '~/components/Input'
import { LoaderCircle } from 'lucide-react'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { route } from '@izzyjs/route/client'
import { InertiaPage } from '~/app/app'
import GuestLayout from '~/layouts/GuestLayout'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  rememberMe: yup.boolean().default(false),
})

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false,
}

const Login: InertiaPage = () => {
  const { data, setData, post, processing, errors, setError, clearErrors } = useForm(defaultValues)
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    clearErrors()
    toast.dismiss()

    try {
      await validationSchema.validate(data, { abortEarly: false })

      post(route('auth.login.store').path, {
        onError: (serverErrors) => {
          if (serverErrors?.E_INVALID_CREDENTIALS) {
            toast.error('Invalid email or password.')
          } else {
            toast.error('An unexpected error occurred. Please try again.')
          }
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

  return (
    <>
      <Head title="Login" />
      <Toaster
        containerStyle={{
          position: 'relative',
        }}
      />
      <div className="flex h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600">Sign in to your Notify Hub account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={data.rememberMe}
                    onChange={(e) => {
                      setData('rememberMe', e.target.checked as any)
                      if (errors?.rememberMe) clearErrors('rememberMe')
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={processing}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <div className="flex items-center">
                    <LoaderCircle size={20} className="animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href={route('auth.register.show')}
                  as="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

Login.layout = (page) => <GuestLayout children={page} />

export default Login
