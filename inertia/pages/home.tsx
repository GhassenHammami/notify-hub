import { useState, useEffect, useRef } from 'react'
import GuestLayout from '~/layouts/GuestLayout'
import { InertiaPage } from '~/app/app'
import { Head } from '@inertiajs/react'
import { Check } from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  popular: boolean
}

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const Home: InertiaPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)
    intervalRef.current = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const features: Feature[] = [
    {
      title: 'Email Notifications',
      description: 'Send beautiful, responsive emails with dynamic templates and personalization',
      icon: '📧',
      color: 'bg-blue-500',
    },
    {
      title: 'SMS Notifications',
      description: 'Reach your users instantly with reliable SMS delivery worldwide',
      icon: '📱',
      color: 'bg-green-500',
    },
    {
      title: 'Push Notifications',
      description: 'Engage users with real-time push notifications across all platforms',
      icon: '🔔',
      color: 'bg-purple-500',
    },
  ]

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'Perfect for small projects and testing',
      features: [
        '1,000 notifications/month',
        'Email & SMS support',
        'Basic templates',
        'Community support',
      ],
      buttonText: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        '50,000 notifications/month',
        'All notification types',
        'Advanced templates',
        'Priority support',
        'Analytics dashboard',
      ],
      buttonText: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale applications',
      features: [
        'Unlimited notifications',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'White-label options',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ]

  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Status', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ]

  const handleFeatureClick = (index: number): void => {
    setActiveFeature(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
  }

  const handleButtonClick = (action: string): void => {
    console.log(`Button clicked: ${action}`)
  }
  return (
    <>
      <Head title="Home" />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1
              className={`mb-4 text-3xl leading-tight font-bold transition-all duration-1000 sm:mb-6 sm:text-4xl md:text-5xl lg:text-7xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Notify Hub
            </h1>
            <p
              className={`mx-auto mb-6 max-w-3xl px-4 text-lg leading-relaxed transition-all delay-300 duration-1000 sm:mb-8 sm:text-xl md:text-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              The complete notification solution for developers. Send emails, SMS, and push
              notifications with powerful APIs and beautiful templates.
            </p>
            <div
              className={`flex flex-col justify-center gap-3 transition-all delay-500 duration-1000 sm:flex-row sm:gap-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <button
                className="transform rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:text-base"
                onClick={() => handleButtonClick('start-building')}
              >
                Start Building Now
              </button>
              <button
                className="transform rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-blue-600 sm:px-8 sm:text-base"
                onClick={() => handleButtonClick('view-documentation')}
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 hidden h-20 w-20 animate-bounce rounded-full bg-white opacity-10 sm:block"></div>
        <div className="absolute right-10 bottom-20 hidden h-16 w-16 animate-pulse rounded-full bg-white opacity-10 sm:block"></div>
      </section>

      <section id="features" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 px-4 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
              Everything you need to send notifications
            </h2>
            <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600 sm:text-xl">
              Powerful APIs, beautiful templates, and reliable delivery for all your notification
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {features.map((feature: Feature, index: number) => (
              <div
                key={index}
                className={`transform cursor-pointer rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 ${
                  activeFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div
                  className={`mb-4 text-3xl sm:text-4xl ${feature.color} flex h-14 w-14 items-center justify-center rounded-lg text-white sm:h-16 sm:w-16`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
              How it works
            </h2>
            <p className="text-lg text-gray-600 sm:text-xl">Get started in minutes, not hours</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 sm:h-16 sm:w-16">
                <span className="text-xl font-bold text-blue-600 sm:text-2xl">1</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
                Create a Project
              </h3>
              <p className="px-4 text-sm text-gray-600 sm:text-base">
                Set up your project and get your unique API key in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
                <span className="text-xl font-bold text-green-600 sm:text-2xl">2</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
                Design Templates
              </h3>
              <p className="px-4 text-sm text-gray-600 sm:text-base">
                Create beautiful email and SMS templates with our drag-and-drop editor
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 sm:h-16 sm:w-16">
                <span className="text-xl font-bold text-purple-600 sm:text-2xl">3</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
                Send Notifications
              </h3>
              <p className="px-4 text-sm text-gray-600 sm:text-base">
                Integrate with your app using our simple REST API
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 sm:text-xl">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan: PricingPlan, index: number) => (
              <div
                key={index}
                className={`transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 md:col-span-2 lg:col-span-1 ${
                  plan.popular ? 'relative ring-2 ring-blue-500' : ''
                } `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 text-center sm:mb-8">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-sm text-gray-600 sm:text-base">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">{plan.description}</p>
                </div>

                <ul className="mb-6 space-y-2 sm:mb-8 sm:space-y-3">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500 sm:mr-3 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full transform rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 sm:text-base ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() =>
                    handleButtonClick(plan.buttonText.toLowerCase().replace(/\s+/g, '-'))
                  }
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-12 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl px-4 text-lg sm:mb-8 sm:text-xl">
            Join thousands of developers who trust Notify Hub for their notification needs.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              className="transform rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:text-base"
              onClick={() => handleButtonClick('create-account')}
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4">Notify Hub</h3>
              <p className="text-sm text-gray-400 sm:text-base">
                The complete notification solution for modern developers.
              </p>
            </div>
            {footerSections.map((section: FooterSection, index: number) => (
              <div key={index}>
                <h4 className="mb-3 text-sm font-semibold sm:mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link: FooterLink, linkIndex: number) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-white sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 text-center text-gray-400 sm:mt-8 sm:pt-8">
            <p className="text-sm sm:text-base">&copy; 2025 Notify Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

Home.layout = (page) => <GuestLayout children={page} />

export default Home
