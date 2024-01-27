import { Marquee } from '@/client'
import { Flex } from '@/design-system'
// import { RecentChannels } from '@/server'

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <section>
      <div className="hidden md:block fixed top-[38px] z-50">
        <Marquee />
      </div>
      <Flex className="px-5 pt-[70px] md:pt-[110px]">
        <div className="hidden md:w-[19%] md:block">
          {/* <RecentChannels params={params} /> */}
        </div>
        <div className="w-full md:w-[78%]">{children}</div>
        <div className="hidden md:w-[3%] md:block">{}</div>
      </Flex>
    </section>
  )
}
