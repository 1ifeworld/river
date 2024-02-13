import {
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
  Stack,
} from '@/design-system'
import { pluralize } from '@/utils'

interface ChannelMembersPopoverProps {
  popoverTrigger: React.ReactNode
  popoverContent: React.ReactNode
  activeMemberCount: number
}

export function ChannelMembersPopover({
  popoverTrigger,
  popoverContent,
  activeMemberCount,
}: ChannelMembersPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex className="items-center hover:underline underline-offset-2 transition-all decoration-secondary-foreground">
          {popoverTrigger}
          <Typography className="text-secondary-foreground">
            &nbsp;
            {`+ ${pluralize(activeMemberCount, 'other', 'others')}`}
          </Typography>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Stack className="gap-y-2">
          <Typography>Active members</Typography>
          <Stack className="gap-y-1">{popoverContent}</Stack>
        </Stack>
      </PopoverContent>
    </Popover>
  )
}
