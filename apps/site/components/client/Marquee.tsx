import { Typography } from '@/design-system'
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
      className="py-3 border-t border-b border-border bg-popover"
      speed={30}
      pauseOnHover
    >
      <Typography>
        {`Welcome to River – Today is ${currentDate} – There are ${totalChannels} channels, ${totalItems} items, and ${totalUsers} users on River today.`}
      </Typography>
    </ReactMarquee>
  )
}
