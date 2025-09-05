import Channel from '#enums/channel'

type FormatMode = 'plain' | 'withArticle' | 'insideSentence'

export const formatChannelName = (channel: Channel, mode: FormatMode = 'plain') => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  switch (mode) {
    case 'plain':
      return channel === Channel.SMS ? channel : capitalize(channel)

    case 'withArticle':
      const lower = channel.toLowerCase()
      const article = ['a', 'e', 'i', 'o', 'u'].includes(lower[0]) || lower === 'sms' ? 'An' : 'A'
      return `${article} ${capitalize(channel)}`

    case 'insideSentence':
      return channel === Channel.SMS ? channel : channel.toLowerCase()

    default:
      return channel
  }
}
