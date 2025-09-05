import React, { useState } from 'react'
import Channel from '#enums/channel'
import AttributeType from '#enums/attribute_type'
import { Phone, Bell, Play } from 'lucide-react'
import Modal from '~/components/ui/Modal'
import { formatChannelName } from '#utils/formatChannelName'
import Attribute from '#models/attribute'

type TemplateEditorAttribute = Pick<Attribute, 'name' | 'type' | 'isRequired'>

interface PhoneMockupProps {
  channel: Channel
  content: string
  notificationTitle?: string
  screenWidth?: number
  attributes: TemplateEditorAttribute[]
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  channel,
  content,
  notificationTitle,
  screenWidth = 300,
  attributes,
}) => {
  const [showAttributeTester, setShowAttributeTester] = useState(false)
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({})

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

  const renderHighlightedContent = (text: string) => {
    if (!text) return null

    const regex = /\{\{([^}]+)\}\}/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${match.index}`}>{text.slice(lastIndex, match.index)}</span>)
      }

      parts.push(
        <span
          key={`attribute-${match.index}`}
          className="inline-block rounded border border-blue-200 bg-blue-100 px-1 py-0.5 font-mono text-xs text-blue-800"
        >
          {`{{${match[1]}}}`}
        </span>
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.slice(lastIndex)}</span>)
    }

    return parts.length > 0 ? parts : text
  }

  const renderContentWithValues = (text: string) => {
    if (!text) return null

    const hasValues = Object.values(attributeValues).some((value) => value.trim() !== '')
    if (!hasValues) {
      return renderHighlightedContent(text)
    }

    let result = text
    attributes?.forEach((attribute) => {
      const value = attributeValues[attribute.name]
      if (value && value.trim() !== '') {
        result = result.replace(new RegExp(`\\{\\{${attribute.name}\\}\\}`, 'g'), value)
      }
    })

    return renderHighlightedContent(result)
  }

  const handleAttributeValueChange = (attribute: TemplateEditorAttribute, value: string) => {
    setAttributeValues((prev) => ({
      ...prev,
      [attribute.name]: value,
    }))
  }

  const resetAttributeValues = () => {
    setAttributeValues({})
  }

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

      <div className="flex max-h-5/6 justify-end space-y-3">
        <div className="max-h-full max-w-xs overflow-hidden rounded-2xl bg-blue-500 px-4 py-2">
          <p className="text-sm text-white">
            {content
              ? renderContentWithValues(content)
              : `Your ${formatChannelName(channel, 'insideSentence')} message will appear here...`}
          </p>
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

      <div className="flex max-h-5/6 space-y-3">
        <div className="w-full max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notificationTitle ? renderContentWithValues(notificationTitle) : 'Notification'}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {content
                  ? renderContentWithValues(content)
                  : `Your ${formatChannelName(channel, 'insideSentence')} notification will appear here...`}
              </p>
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
      default:
        return null
    }
  }

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col items-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Preview</h3>
        <p className="text-sm text-gray-600">
          See how your {formatChannelName(channel, 'insideSentence')} will look on mobile
        </p>
        {attributes && attributes.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAttributeTester(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            <Play className="h-4 w-4" />
            Test with Attributes
          </button>
        )}
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

      <Modal
        isOpen={showAttributeTester}
        onClose={() => setShowAttributeTester(false)}
        title="Test Attributes"
        size="md"
        icon={<Play className="h-5 w-5 text-indigo-600" />}
        iconClassName="bg-indigo-100"
        showFooter={true}
        footer={
          <>
            <button
              type="button"
              onClick={resetAttributeValues}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset Values
            </button>
            <button
              type="button"
              onClick={() => setShowAttributeTester(false)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </>
        }
      >
        <div className="p-6">
          <p className="mb-4 text-sm text-gray-600">
            Set values for your attributes to see how the template will look with real data.
          </p>

          <div className="space-y-3">
            {attributes?.map((attribute) => (
              <div key={attribute.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{attribute.name}</label>
                {attribute.type === AttributeType.DATE ? (
                  <input
                    type="date"
                    value={attributeValues[attribute.name] || ''}
                    onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : attribute.type === AttributeType.NUMBER ? (
                  <input
                    type="number"
                    value={attributeValues[attribute.name] || ''}
                    onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                    placeholder={`Enter number for ${attribute.name}`}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={attributeValues[attribute.name] || ''}
                    onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                    placeholder={`Enter text for ${attribute.name}`}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PhoneMockup
