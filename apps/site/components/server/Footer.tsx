import { Flex, Typography } from '@/design-system'

export function Footer() {
  return (
    <Flex className="gap-2 w-full justify-end py-3">
      <Typography className="text-muted-foreground items-center">
        <span className="text-[14px] align-middle">&#169;</span> 2024 ·{' '}
        <a
          className="hover:text-primary-foreground transition-all"
          href="https://www.lifeworld.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lifeworld, Co.
        </a>
      </Typography>
    </Flex>
  )
}
