import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

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

const Home: React.FC = () => {
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 transition-all duration-1000 leading-tight ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              Notify Hub
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4 transition-all duration-1000 delay-300 leading-relaxed ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              The complete notification solution for developers. Send emails, SMS, and push
              notifications with powerful APIs and beautiful templates.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <button
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                onClick={() => handleButtonClick('start-building')}
              >
                Start Building Now
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                onClick={() => handleButtonClick('view-documentation')}
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Everything you need to send notifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Powerful APIs, beautiful templates, and reliable delivery for all your notification
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature: Feature, index: number) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div
                  className={`text-3xl sm:text-4xl mb-4 ${feature.color} w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How it works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Get started in minutes, not hours</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Create a Project
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">
                Set up your project and get your unique API key in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Design Templates
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">
                Create beautiful email and SMS templates with our drag-and-drop editor
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Send Notifications
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">
                Integrate with your app using our simple REST API
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan: PricingPlan, index: number) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-blue-500 relative' : ''
                } ${plan.popular ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1 text-sm sm:text-base">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">{plan.description}</p>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base ${
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600 text-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 text-center mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of developers who trust Notify Hub for their notification needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => handleButtonClick('create-account')}
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-3 sm:mb-4">Notify Hub</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                The complete notification solution for modern developers.
              </p>
            </div>
            {footerSections.map((section: FooterSection, index: number) => (
              <div key={index}>
                <h4 className="text-sm font-semibold mb-3 sm:mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link: FooterLink, linkIndex: number) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors text-sm sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 Notify Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
