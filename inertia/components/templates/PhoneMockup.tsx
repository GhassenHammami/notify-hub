import React from 'react'
import Channel from '#enums/channel'
import { Phone, Mail, Bell } from 'lucide-react'
import { formatChannelName } from '~/utils/channels'

interface PhoneMockupProps {
  channel: Channel
  content: string
  notificationTitle?: string
  screenWidth?: number
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  channel,
  content,
  notificationTitle,
  screenWidth = 300,
}) => {
  const styles = React.useMemo(() => {
    const getSizeWithRatio = (size: number) => {
      const sizeRatio = Math.floor((screenWidth * size) / 1080)
      return Math.max(sizeRatio, 1)
    }

    const FRAME_WIDTH = getSizeWithRatio(32)
    const mHeight = Math.floor((screenWidth / 9) * 19.5)
    const widthAndFrame = screenWidth + FRAME_WIDTH * 2
    const heightAndFrame = mHeight + FRAME_WIDTH * 2

    return {
      container: {
        display: 'flex' as const,
        position: 'relative' as const,
        boxSizing: 'content-box' as const,
        width: widthAndFrame,
        height: heightAndFrame,
      },
      frame: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        borderRadius: getSizeWithRatio(140),
        borderStyle: 'solid' as const,
        borderWidth: FRAME_WIDTH,
        borderColor: '#666666',
        overflow: 'hidden',
      },
      screen: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        position: 'relative' as const,
        width: screenWidth,
        height: mHeight,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      },
      statusbar: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        width: '100%',
        height: getSizeWithRatio(90),
        backgroundColor: '#CCCCCC',
        alignItems: 'center' as const,
        justifyContent: 'flex-start' as const,
      },
      camera: {
        width: getSizeWithRatio(60),
        height: getSizeWithRatio(60),
        borderRadius: getSizeWithRatio(60),
        backgroundColor: '#666666',
        marginTop: getSizeWithRatio(20),
      },
      screenCont: {
        display: 'flex' as const,
        flex: 1,
        overflow: 'hidden',
      },
      navigationSwipeCont: {
        display: 'flex' as const,
        width: '100%',
        height: getSizeWithRatio(60),
        backgroundColor: '#CCCCCC',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      },
      navigationSwipeBar: {
        backgroundColor: '#666666',
        borderRadius: getSizeWithRatio(100),
        width: getSizeWithRatio(350),
        height: getSizeWithRatio(15),
      },
    }
  }, [])

  const renderSMSContent = () => (
    <div className="h-full bg-gray-50 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <span className="text-sm font-bold text-white">Me</span>
          </div>
          <span className="font-medium text-gray-900">Me</span>
        </div>
        <span className="text-xs text-gray-500">Now</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="max-w-xs rounded-2xl bg-blue-500 px-4 py-2">
            <p className="text-sm text-white">
              {content || 'Your SMS message will appear here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPushContent = () => (
    <div className="h-full bg-gray-50 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500">
            <Bell className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-gray-900">MyApp</span>
        </div>
        <span className="text-xs text-gray-500">Now</span>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notificationTitle || 'Notification'}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {content || 'Your push notification will appear here...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailContent = () => (
    <div className="h-full bg-gray-50 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-gray-900">Mail</span>
        </div>
        <span className="text-xs text-gray-500">Now</span>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <div className="space-y-2">
            <div className="border-b border-gray-100 pb-2">
              <p className="text-xs text-gray-500">From: noreply@myapp.com</p>
              <p className="text-xs text-gray-500">To: user@example.com</p>
              <p className="text-xs text-gray-500">
                Subject: {notificationTitle || 'Notification'}
              </p>
            </div>
            <div className="flex min-h-[60px] items-center justify-center">
              <p className="text-center text-sm text-gray-400">Email preview not available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (!channel) {
      return (
        <div className="flex h-full items-center justify-center bg-gray-50">
          <div className="text-center">
            <Phone className="mx-auto mb-2 h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-500">Select a channel to preview</p>
          </div>
        </div>
      )
    }

    switch (channel) {
      case Channel.SMS:
        return renderSMSContent()
      case Channel.PUSH:
        return renderPushContent()
      case Channel.EMAIL:
        return renderEmailContent()
      default:
        return null
    }
  }

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Preview</h3>
        <p className="text-sm text-gray-600">
          See how your {formatChannelName(channel)} will look on mobile
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.frame}>
          <div style={styles.screen}>
            <div style={styles.statusbar}>
              <div style={styles.camera} />
            </div>
            <div style={styles.screenCont}>
              <div className="h-full w-full">{renderContent()}</div>
            </div>
            <div style={styles.navigationSwipeCont}>
              <div style={styles.navigationSwipeBar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneMockup
