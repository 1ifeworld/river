import { Flex } from '@/design-system'
import { MarqueeWrapper, RecentChannels } from '@/server'

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <section>
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        <MarqueeWrapper />
      </div>
      <Flex className="px-5 pt-[57px] md:pt-[104px]">
        <div className="hidden md:w-[19%] md:block">
          <RecentChannels params={params} />
        </div>
        <div className="w-full md:w-[78%]">{children}</div>
        <div className="hidden md:w-[3%] md:block">{}</div>
      </Flex>
    </section>
  )
}
