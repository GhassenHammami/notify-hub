import React, { useEffect, useMemo, useState } from 'react'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import Project from '#models/project'
import Template from '#models/template'
import Channel from '#enums/channel'
import {
  FileText,
  Save,
  Bell,
  Hash,
  FileText as DocumentIcon,
  ChevronDown,
  AlertCircle,
  Info,
  ArrowLeft,
} from 'lucide-react'
import ChannelIcon from '~/components/ui/ChannelIcon'
import Notification from '#models/notification'
import { getChannelBadgeClasses } from '~/utils/channels'
import { route } from '@izzyjs/route/client'

interface TemplatesCreateProps {
  notifications: Partial<Notification>[]
  selectedNotification?: Partial<Notification> | null
  existingTemplates: Partial<Template>[]
}

export const channelConfig: Record<
  Channel,
  { color: string; description: string; placeholder: string }
> = {
  [Channel.EMAIL]: {
    color: `${getChannelBadgeClasses(Channel.EMAIL)}`,
    description: 'Email templates support rich formatting and longer content',
    placeholder: 'Write your email content here...',
  },
  [Channel.SMS]: {
    color: `${getChannelBadgeClasses(Channel.SMS)}`,
    description: 'SMS templates should be concise and under 160 characters',
    placeholder: 'Write your SMS message here...',
  },
  [Channel.PUSH]: {
    color: `${getChannelBadgeClasses(Channel.PUSH)}`,
    description: 'Push notifications are brief and actionable',
    placeholder: 'Write your push notification here...',
  },
}

const TemplatesCreate: InertiaPage<TemplatesCreateProps> = ({
  notifications,
  selectedNotification,
  existingTemplates,
}) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [selectedChannel, setSelectedChannel] = useState<null | Channel>(
    selectedNotification ? null : Channel.EMAIL
  )

  const { data, setData, post, processing, errors } = useForm({
    notification_id: selectedNotification?.id || '',
    channel: selectedChannel,
    content: '',
  })

  const getExistingTemplatesForNotification = (notificationId: number) => {
    return existingTemplates
      .filter((t) => t.notificationId === notificationId)
      .map((t) => ({ id: t.id, channel: t.channel }))
  }
  const channels = useMemo(() => Object.values(Channel), [])

  const notificationTemplates = useMemo(
    () => getExistingTemplatesForNotification(Number(data.notification_id)),
    [data.notification_id]
  )
  const existingTemplateChannels = useMemo(
    () => notificationTemplates.map((t) => t.channel),
    [notificationTemplates]
  )

  useEffect(() => {
    if (!data.notification_id) return

    const availableChannels = channels.filter(
      (channel) => !existingTemplateChannels.includes(channel)
    )

    if (availableChannels.length === 1) {
      const remainingChannel = availableChannels[0]
      setSelectedChannel(remainingChannel)
      setData('channel', remainingChannel)
      return
    }

    if (availableChannels.length > 0) {
      if (availableChannels.length === channels.length && selectedChannel) return
      const firstAvailable = availableChannels[0]
      setSelectedChannel(firstAvailable)
      setData('channel', firstAvailable)
      return
    }

    setSelectedChannel(null)
    setData('channel', null)
  }, [data.notification_id, existingTemplateChannels, channels])

  const handleChannelChange = (channel: Channel) => {
    setSelectedChannel(channel)
    setData('channel', channel)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('templates.store').path)
  }

  return (
    <>
      <Head title="Create Template" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col space-y-4">
            <Link
              href="/templates"
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create Template
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Create a new notification template for {currentProject?.name || 'your project'}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-200 hover:border-gray-300">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <div className="rounded-lg bg-indigo-100 p-2">
                  <Bell className="h-6 w-6 text-indigo-600" />
                </div>
                Select Notification
              </h2>
              <p className="mb-6 text-base text-gray-600">
                Choose which notification this template will be associated with.
              </p>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <div className="rounded-full bg-blue-100 p-1.5">
                    <DocumentIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>

                <select
                  value={data.notification_id}
                  onChange={(e) => setData('notification_id', Number(e.target.value))}
                  className="block w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white py-4 pr-12 pl-14 text-base font-medium text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  required
                >
                  <option value="" className="text-gray-500">
                    Select a notification...
                  </option>
                  {notifications.map((notification) => (
                    <option
                      key={notification.id}
                      value={notification.id}
                      className="py-2 text-gray-900"
                    >
                      {notification.title}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {errors.notification_id && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{errors.notification_id}</span>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Hash className="h-5 w-5 text-indigo-600" />
                Template Channel
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Choose the channel type for this template. Each notification can have one template
                per channel.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {channels.map((channel) => {
                  const isExisting = existingTemplateChannels.includes(channel)
                  const existingTemplate = notificationTemplates.find((t) => t.channel === channel)
                  return (
                    <div key={channel} className="relative">
                      <button
                        type="button"
                        onClick={() => !isExisting && handleChannelChange(channel)}
                        disabled={isExisting}
                        className={`w-full rounded-lg border-2 p-4 text-center transition-all ${
                          isExisting
                            ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
                            : selectedChannel === channel
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <ChannelIcon channel={channel} />
                          <span
                            className={`font-medium ${isExisting ? 'text-gray-500' : 'text-gray-900'}`}
                          >
                            {channel}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              isExisting
                                ? 'border-gray-200 bg-gray-100 text-gray-600'
                                : channelConfig[channel].color
                            }`}
                          >
                            {isExisting ? 'Created' : channel}
                          </span>
                        </div>
                      </button>

                      {isExisting && existingTemplate && (
                        <div className="absolute -top-2 -right-2">
                          <Link
                            href={`/templates/${existingTemplate.id}/edit`}
                            className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {existingTemplateChannels.length > 0 && (
                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Templates already exist for{' '}
                      {existingTemplateChannels.join(', ')}.
                      {existingTemplateChannels.length < channels.length
                        ? ' You can create the remaining template(s) or edit existing ones.'
                        : ' All channel templates are already created for this notification.'}
                    </p>
                  </div>
                </div>
              )}

              {errors.channel && <p className="mt-2 text-sm text-red-600">{errors.channel}</p>}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <FileText className="h-5 w-5 text-indigo-600" />
                Template Content
              </h2>
              {selectedChannel && (
                <div className={`mb-4 rounded-lg p-4 ${channelConfig[selectedChannel].color}`}>
                  <p className={`text-sm ${channelConfig[selectedChannel].color}`}>
                    💡 <strong>Tip:</strong> {channelConfig[selectedChannel].description}
                  </p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Template Content
                </label>
                <textarea
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  rows={8}
                  className="block w-full rounded-lg border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder={
                    selectedChannel
                      ? channelConfig[selectedChannel].placeholder
                      : 'Select a channel first...'
                  }
                  required
                  disabled={!selectedChannel}
                />
                {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6">
              <Link
                href="/templates"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={
                  processing ||
                  !selectedChannel ||
                  !data.notification_id ||
                  existingTemplateChannels.length === channels.length
                }
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Creating...</span>
                  </div>
                ) : existingTemplateChannels.length === channels.length ? (
                  <div className="flex items-center space-x-2">
                    <span>All Templates Created</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Create Template</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TemplatesCreate
