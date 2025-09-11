import { Head, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { Copy, Check, Zap, Shield, Bell, BarChart3, ExternalLink, Code } from 'lucide-react'
import { useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import Channel from '#enums/channel'
import Project from '#models/project'

interface ApiDocsProps {
  baseUrl: string
}

const ApiDocs: InertiaPage<ApiDocsProps> = ({ baseUrl }) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const endpoints = [
    {
      method: 'POST',
      path: '/notifications',
      description: 'Send a notification to one or more recipients across multiple channels',
      params: [
        {
          name: 'title',
          required: false,
          type: 'string',
          description: 'Notification title (optional, uses template title if not set)',
        },
        {
          name: 'channel',
          required: true,
          type: 'string',
          description: 'Channel type: SMS, EMAIL, or PUSH',
        },
        {
          name: 'recipients',
          required: true,
          type: 'string|string[]',
          description: 'Single recipient string or array of recipient strings',
        },
        {
          name: 'notificationId',
          required: false,
          type: 'string',
          description: 'Unique notification ID (required if externalId not provided)',
        },
        {
          name: 'externalId',
          required: false,
          type: 'string',
          description: 'External reference ID (required if notificationId not provided)',
        },
        {
          name: 'attributes',
          required: false,
          type: 'object',
          description: 'Additional data for template rendering',
        },
      ],
    },
    {
      method: 'GET',
      path: '/notifications/:id',
      description: 'Get the delivery status of a specific notification',
      params: [
        {
          name: 'id',
          required: true,
          type: 'string',
          description: 'Notification ID (path parameter)',
        },
      ],
    },
  ]

  const swaggerSpec = {
    openapi: '3.0.0',
    servers: [
      {
        url: `${baseUrl}/api/v1`,
        description: 'API server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
    paths: {
      '/notifications': {
        post: {
          summary: 'Send a notification',
          description: 'Send a notification to one or more recipients across multiple channels.',
          security: [{ ApiKeyAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      example: 'Order Confirmation',
                      description: 'Notification title (optional, uses template title if not set)',
                    },
                    notificationId: {
                      type: 'string',
                      example: 'notif_12345',
                      description: 'Unique notification ID (required if externalId not provided)',
                    },
                    channel: {
                      type: 'string',
                      description: 'Channel type: SMS, EMAIL, or PUSH',
                      enum: Object.values(Channel),
                      example: Channel.EMAIL,
                    },
                    recipients: {
                      oneOf: [
                        { type: 'string', description: 'Single recipient' },
                        {
                          type: 'array',
                          items: { type: 'string' },
                          description: 'Multiple recipients',
                        },
                      ],
                      description: 'Recipients',
                      example: ['user@example.com', 'test@test.com'],
                    },
                    attributes: {
                      type: 'object',
                      description: 'Additional attributes used in the template',
                      properties: {
                        customerName: { type: 'string', example: 'John Doe' },
                        orderNumber: { type: 'string', example: '12345' },
                        totalAmount: { type: 'string', example: '$99.99' },
                      },
                    },
                  },
                  required: ['channel', 'recipients'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Notification sent successfully' },
            400: { description: 'Invalid request' },
          },
        },
      },

      '/notifications/{id}': {
        get: {
          summary: 'Get notification status',
          description: 'Retrieve the delivery status of a specific notification.',
          security: [{ ApiKeyAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              example: '123',
            },
          ],
          responses: {
            200: { description: 'Status retrieved' },
            404: { description: 'Notification not found' },
          },
        },
      },
    },
  }

  return (
    <>
      <Head title="API Documentation" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                API Documentation
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Integrate notifications into your applications with our RESTful API
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">v1.0</span>
            </div>
          </div>
        </header>

        {currentProject ? (
          <>
            {!currentProject.isActive && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Project Inactive</h3>
                    <p className="text-sm text-red-700">
                      This project is currently inactive. API requests will not work until the
                      project is activated.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-8 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">
                    Project: {currentProject.name}
                  </h3>
                  <p className="text-sm text-indigo-700">
                    Use this API key to authenticate your requests
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="rounded-lg border border-indigo-300 bg-white px-3 py-2 font-mono text-sm text-indigo-800">
                    {currentProject.apiKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(currentProject.apiKey)}
                    className="rounded-lg p-2 text-indigo-600 transition-colors hover:bg-white hover:shadow-sm"
                    title="Copy API key"
                  >
                    {copiedCode === currentProject.apiKey ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">No Project Selected</h3>
                <p className="text-sm text-yellow-700">
                  Please select a project to view your API key and start integrating
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <Code className="mr-2 h-6 w-6 text-indigo-600" />
                API Endpoints
              </h2>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            endpoint.method === 'POST'
                              ? 'bg-green-100 text-green-800'
                              : endpoint.method === 'GET'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-900">
                          {endpoint.path}
                        </code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${baseUrl}${endpoint.path}`)}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                        title="Copy endpoint URL"
                      >
                        {copiedCode === `${baseUrl}${endpoint.path}` ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="mb-3 text-gray-600">{endpoint.description}</p>
                    {endpoint.params.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-700">Parameters:</span>
                        <div className="rounded-lg bg-gray-50 p-3 font-mono text-sm">
                          {endpoint.params.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-start space-x-2">
                              <span
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                  param.required
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {param.required ? 'REQUIRED' : 'OPTIONAL'}
                              </span>
                              <span className="font-semibold text-gray-900">{param.name}</span>
                              <span className="text-gray-600">:</span>
                              <span className="text-blue-600">{param.type}</span>
                              <span className="text-gray-500">// {param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <Zap className="mr-2 h-6 w-6 text-indigo-600" />
                API Documentation (Swagger)
              </h2>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <SwaggerUI spec={swaggerSpec} />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <Shield className="mr-2 h-5 w-5 text-indigo-600" />
                Authentication
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>All API requests require authentication using your project's API key.</p>
                <p>
                  Include it in the <code className="rounded bg-gray-100 px-1">X-API-Key</code>{' '}
                  header:
                </p>
                <div className="rounded-lg bg-gray-50 p-3">
                  <code className="text-xs">
                    X-API-Key: {currentProject?.apiKey || 'YOUR_API_KEY'}
                  </code>
                </div>
                <p>
                  Or use the <code className="rounded bg-gray-100 px-1">Authorization</code> header:
                </p>
                <div className="rounded-lg bg-gray-50 p-3">
                  <code className="text-xs">
                    Authorization: Bearer {currentProject?.apiKey || 'YOUR_API_KEY'}
                  </code>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <Bell className="mr-2 h-5 w-5 text-indigo-600" />
                Notification Flow
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                    1
                  </span>
                  <p>Create notification templates</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                    2
                  </span>
                  <p>Send notification via API with recipients and channels</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                    3
                  </span>
                  <p>System processes and delivers notifications to the recipients</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                    4
                  </span>
                  <p>Track delivery status and get analytics</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <BarChart3 className="mr-2 h-5 w-5 text-indigo-600" />
                Rate Limits
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Current limits:</p>
                <ul className="space-y-1">
                  <li>• 100 requests per minute</li>
                  <li>• 1000 notifications per hour</li>
                  <li>• 10,000 notifications per day</li>
                </ul>
                <p className="text-xs text-gray-500">
                  Limits are per project and can be adjusted based on your needs.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                <ExternalLink className="mr-2 h-5 w-5 text-indigo-600" />
                SDKs & Libraries
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Official SDKs coming soon:</p>
                <ul className="space-y-1">
                  <li>• JavaScript/Node.js</li>
                  <li>• Python</li>
                  <li>• PHP</li>
                  <li>• Ruby</li>
                </ul>
                <p className="text-xs text-gray-500">
                  For now, use the REST API with your preferred HTTP client.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApiDocs
