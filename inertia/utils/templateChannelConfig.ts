import Channel from '#enums/channel'
import { formatChannelName } from '#utils/formatChannelName'
import { getChannelBadgeClasses } from './channels'

export const templateChannelConfig: Record<
  Channel,
  { color: string; description: string; placeholder: string }
> = {
  [Channel.EMAIL]: {
    color: `${getChannelBadgeClasses(Channel.EMAIL)}`,
    description: `${formatChannelName(Channel.EMAIL)} templates support rich formatting and longer content`,
    placeholder: `Write your ${formatChannelName(Channel.EMAIL, 'insideSentence')} content here...`,
  },
  [Channel.SMS]: {
    color: `${getChannelBadgeClasses(Channel.SMS)}`,
    description: `${formatChannelName(Channel.SMS)} templates should be concise and under 160 characters`,
    placeholder: `Write your ${formatChannelName(Channel.SMS, 'insideSentence')} message here...`,
  },
  [Channel.PUSH]: {
    color: `${getChannelBadgeClasses(Channel.PUSH)}`,
    description: `${formatChannelName(Channel.PUSH)} notifications are brief and actionable`,
    placeholder: `Write your ${formatChannelName(Channel.PUSH, 'insideSentence')} notification here...`,
  },
}
