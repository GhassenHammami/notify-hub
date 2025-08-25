import { Mail, MessageSquare, Smartphone, LucideIcon } from 'lucide-react'
import Channel from '#enums/channel'

const channelIcons: Record<Channel, LucideIcon> = {
  [Channel.EMAIL]: Mail,
  [Channel.SMS]: MessageSquare,
  [Channel.PUSH]: Smartphone,
}

const channelColorClasses: Record<
  Channel,
  {
    bg: {
      50: string
      100: string
      200: string
      500: string
      600: string
      700: string
      800: string
    }
    text: {
      50: string
      100: string
      200: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
    border: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
    }
    from: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
    }
    to: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
    }
    ring: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
    }
  }
> = {
  [Channel.EMAIL]: {
    bg: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      200: 'bg-blue-200',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      800: 'bg-blue-800',
    },
    text: {
      50: 'text-blue-50',
      100: 'text-blue-100',
      200: 'text-blue-200',
      500: 'text-blue-500',
      600: 'text-blue-600',
      700: 'text-blue-700',
      800: 'text-blue-800',
      900: 'text-blue-900',
    },
    border: {
      50: 'border-blue-50',
      100: 'border-blue-100',
      200: 'border-blue-200',
      300: 'border-blue-300',
      400: 'border-blue-400',
      500: 'border-blue-500',
      600: 'border-blue-600',
    },
    from: {
      50: 'from-blue-50',
      100: 'from-blue-100',
      200: 'from-blue-200',
      300: 'from-blue-300',
      400: 'from-blue-400',
      500: 'from-blue-500',
      600: 'from-blue-600',
    },
    to: {
      100: 'to-blue-100',
      200: 'to-blue-200',
      300: 'to-blue-300',
      400: 'to-blue-400',
      500: 'to-blue-500',
      600: 'to-blue-600',
      700: 'to-blue-700',
    },
    ring: {
      50: 'ring-blue-50',
      100: 'ring-blue-100',
      200: 'ring-blue-200',
      300: 'ring-blue-300',
      400: 'ring-blue-400',
      500: 'ring-blue-500',
      600: 'ring-blue-600',
    },
  },
  [Channel.SMS]: {
    bg: {
      50: 'bg-green-50',
      100: 'bg-green-100',
      200: 'bg-green-200',
      500: 'bg-green-500',
      600: 'bg-green-600',
      700: 'bg-green-700',
      800: 'bg-green-800',
    },
    text: {
      50: 'text-green-50',
      100: 'text-green-100',
      200: 'text-green-200',
      500: 'text-green-500',
      600: 'text-green-600',
      700: 'text-green-700',
      800: 'text-green-800',
      900: 'text-green-900',
    },
    border: {
      50: 'border-green-50',
      100: 'border-green-100',
      200: 'border-green-200',
      300: 'border-green-300',
      400: 'border-green-400',
      500: 'border-green-500',
      600: 'border-green-600',
    },
    from: {
      50: 'from-green-50',
      100: 'from-green-100',
      200: 'from-green-200',
      300: 'from-green-300',
      400: 'from-green-400',
      500: 'from-green-500',
      600: 'from-green-600',
    },
    to: {
      100: 'to-green-100',
      200: 'to-green-200',
      300: 'to-green-300',
      400: 'to-green-400',
      500: 'to-green-500',
      600: 'to-green-600',
      700: 'to-green-700',
    },
    ring: {
      50: 'ring-green-50',
      100: 'ring-green-100',
      200: 'ring-green-200',
      300: 'ring-green-300',
      400: 'ring-green-400',
      500: 'ring-green-500',
      600: 'ring-green-600',
    },
  },
  [Channel.PUSH]: {
    bg: {
      50: 'bg-purple-50',
      100: 'bg-purple-100',
      200: 'bg-purple-200',
      500: 'bg-purple-500',
      600: 'bg-purple-600',
      700: 'bg-purple-700',
      800: 'bg-purple-800',
    },
    text: {
      50: 'text-purple-50',
      100: 'text-purple-100',
      200: 'text-purple-200',
      500: 'text-purple-500',
      600: 'text-purple-600',
      700: 'text-purple-700',
      800: 'text-purple-800',
      900: 'text-purple-900',
    },
    border: {
      50: 'border-purple-50',
      100: 'border-purple-100',
      200: 'border-purple-200',
      300: 'border-purple-300',
      400: 'border-purple-400',
      500: 'border-purple-500',
      600: 'border-purple-600',
    },
    from: {
      50: 'from-purple-50',
      100: 'from-purple-100',
      200: 'from-purple-200',
      300: 'from-purple-300',
      400: 'from-purple-400',
      500: 'from-purple-500',
      600: 'from-purple-600',
    },
    to: {
      100: 'to-purple-100',
      200: 'to-purple-200',
      300: 'to-purple-300',
      400: 'to-purple-400',
      500: 'to-purple-500',
      600: 'to-purple-600',
      700: 'to-purple-700',
    },
    ring: {
      50: 'ring-purple-50',
      100: 'ring-purple-100',
      200: 'ring-purple-200',
      300: 'ring-purple-300',
      400: 'ring-purple-400',
      500: 'ring-purple-500',
      600: 'ring-purple-600',
    },
  },
}

export const formatChannelName = (channel: Channel) => {
  return channel === Channel.SMS
    ? channel
    : channel.charAt(0).toUpperCase() + channel.slice(1).toLowerCase()
}

export function getChannelIcon(channel: Channel): LucideIcon {
  return channelIcons[channel]
}

export function getChannelBg(
  channel: Channel,
  intensity: 50 | 100 | 200 | 500 | 600 | 700 | 800
): string {
  return channelColorClasses[channel].bg[intensity]
}

export function getChannelText(
  channel: Channel,
  intensity: 50 | 100 | 200 | 500 | 600 | 700 | 800 | 900
): string {
  return channelColorClasses[channel].text[intensity]
}

export function getChannelBorder(
  channel: Channel,
  intensity: 50 | 100 | 200 | 300 | 400 | 500 | 600
): string {
  return channelColorClasses[channel].border[intensity]
}

export function getChannelGradient(
  channel: Channel,
  fromIntensity: 50 | 100 | 200 | 300 | 400 | 500 | 600,
  toIntensity: 100 | 200 | 300 | 400 | 500 | 600 | 700
): string {
  return `${channelColorClasses[channel].from[fromIntensity]} ${channelColorClasses[channel].to[toIntensity]}`
}

export function getChannelRing(
  channel: Channel,
  intensity: 50 | 100 | 200 | 300 | 400 | 500 | 600
): string {
  return channelColorClasses[channel].ring[intensity]
}

export function getChannelBadgeClasses(channel: Channel): string {
  return `${getChannelBg(channel, 100)} ${getChannelText(channel, 800)} ${getChannelBorder(channel, 200)}`
}

export function getChannelIconBgClasses(channel: Channel): string {
  return `${getChannelBg(channel, 500)} ${getChannelText(channel, 50)}`
}

export function getChannelIconBgHoverClasses(channel: Channel): string {
  return `${getChannelBg(channel, 600)} ${getChannelText(channel, 50)}`
}

export function getChannelCardClasses(channel: Channel): string {
  return `${getChannelBg(channel, 50)} ${getChannelBorder(channel, 200)}`
}

export function getChannelCardHoverClasses(channel: Channel): string {
  return `${getChannelBg(channel, 100)} ${getChannelBorder(channel, 300)}`
}
