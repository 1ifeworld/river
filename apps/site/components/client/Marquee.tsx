import { Typography } from '@/design-system'
import ReactMarquee from 'react-fast-marquee'
import { pluralize } from '@/utils'

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
      className="py-3 border-t border-b border-border bg-popover"
      speed={30}
      pauseOnHover
    >
      <Typography>
        {`Welcome to River – Today is ${currentDate} – There are ${pluralize(
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
