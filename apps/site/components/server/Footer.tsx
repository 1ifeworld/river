import { Flex, Typography } from '@/design-system'
import Link from 'next/link'

export function Footer() {
  return (
    <Flex className="gap-2 w-full py-3 justify-center md:justify-end">
      <Typography className="text-muted-foreground items-center">
        <a
          className="hover:text-primary-foreground transition-all"
          href="https://www.lifeworld.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lifeworld
        </a>
        <span className="px-1">·</span>
        <Link
          className="hover:text-primary-foreground"
          href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna"
        >
          Feedback
        </Link>
        <span className="px-1">·</span>
        {/* Copyright symbol */}
        <span className="text-[14px] align-middle">&#169;</span> river.ph, 2024
      </Typography>
    </Flex>
  )
}
