import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetOverlay,
  SheetTrigger,
  Menu,
  Flex,
  BodySmall,
  Globe,
} from '@river/design-system';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export function Sidebar() {
  return (
    <Sheet open={true}>
      <SheetTrigger className='p-5'>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className='px-5 w-[208px] shadow-none bg-base'
        side={'left'}
      >
        <Flex className='flex-col gap-[40px] mt-12'>
          <Flex className='flex-col gap-4'>
            <Flex className='items-center gap-x-2'>
              {/* TODO: replace with custom `SearchIcon` */}
              <MagnifyingGlassIcon fill={'bg-label'} />
              <BodySmall>Search</BodySmall>
            </Flex>
            <Flex className='items-center gap-x-2'>
              <Globe />
              <BodySmall>Home</BodySmall>
            </Flex>
          </Flex>
          <BodySmall className='text-sonic-silver font-medium'>
            My Channels
          </BodySmall>
        </Flex>
        <SheetClose className='focus:outline-none' />
        <SheetFooter>{/* Auth Placeholder */}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
