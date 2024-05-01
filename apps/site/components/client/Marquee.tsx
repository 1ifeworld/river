import ReactMarquee from 'react-fast-marquee'
import Link from 'next/link'
import { Flex, Typography } from '@/design-system'
import { truncateText } from '@/utils'
import type { Action } from '@/server'

export function Marquee({ actions }: { actions: Action[] }) {
  return (
    <ReactMarquee
      className="py-[11px] border-t border-b border-border bg-popover"
      speed={30}
      pauseOnHover
    >
      <Typography>Welcome to River -&nbsp;</Typography>
      {/* <Flex className="gap-x-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={`channel/${action.channelId}/${action.channelIndex}`}
            className="flex gap-x-2 hover:border-b-[1px] border-secondary-foreground"
          >
            <Typography className="text-primary-foreground">
              {action.userName}
            </Typography>
            <Typography className="text-secondary-foreground">
              {'added'}
            </Typography>
            <Typography className="text-primary-foreground">
              {truncateText(action.itemName, 40, false)}
            </Typography>
            <Typography className="text-secondary-foreground">
              {'to'}
            </Typography>
            <Typography className="text-secondary-foreground">
              {truncateText(action.channelName, 40, false)}
            </Typography>
          </Link>
        ))}
      </Flex> */}
    </ReactMarquee>
  )
}
