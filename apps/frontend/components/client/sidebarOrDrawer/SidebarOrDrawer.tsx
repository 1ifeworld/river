import { SidebarAsDrawer, Sidebar } from './index'
import { useMediaQuery } from '@/hooks'

export function SidebarOrDrawer() {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return <SidebarAsDrawer />
  }
  return (
    <aside className="max-w-[210px]">
      <Sidebar />
    </aside>
  )
}
