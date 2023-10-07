import { SidebarAsDrawer, Sidebar } from './index'
import { useMediaQuery } from '@/hooks'

export function SidebarOrDrawer() {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return <SidebarAsDrawer />
  }
  return null
}
