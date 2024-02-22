import { Typography } from '@/design-system'
import { pluralize } from '@/utils'
import ReactMarquee from 'react-fast-marquee'

const currentDate = new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

interface MarqueeProps {
  totalChannels?: number
  totalItems?: number
  totalUsers?: number
}

export function Marquee({
  totalChannels,
  totalItems,
  totalUsers,
}: MarqueeProps) {
  return (
    <ReactMarquee
      className="py-[11px] border-t border-b border-border bg-popover"
      speed={30}
      pauseOnHover
    >
      <Typography>
        {`Welcome to River – Today is ${currentDate} – There ${
          totalChannels === 1 ? 'is' : 'are'
        } ${pluralize(
          totalChannels as number,
          'channel',
          'channels',
        )}, ${pluralize(
          totalItems as number,
          'item',
          'items',
        )}, and ${pluralize(totalUsers as number, 'user', 'users')}.`}
      </Typography>
    </ReactMarquee>
  )
}
