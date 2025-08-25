import React from 'react'
import Channel from '#enums/channel'
import { getChannelIcon } from '~/utils/channels'

interface ChannelIconProps {
  channel: Channel
  className?: string
}
const ChannelIcon: React.FC<ChannelIconProps> = ({ channel, className }) => {
  const IconComponent = getChannelIcon(channel)
  return <IconComponent className={`h-5 w-5 ${className || ''}`} />
}

export default ChannelIcon
