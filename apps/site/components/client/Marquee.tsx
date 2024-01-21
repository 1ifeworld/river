import { Typography } from '@/design-system'
import ReactMarquee from 'react-fast-marquee'

const currentDate = new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function Marquee() {
  return (
    <ReactMarquee className="py-3 border-t border-b border-border bg-popover">
      <Typography>
        {`Welcome to River – Today is ${currentDate} – There are 32 channels, 412 items, and 17 users on River today.`}
      </Typography>
    </ReactMarquee>
  )
}
