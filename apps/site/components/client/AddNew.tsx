import {
  Typography,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'

export function AddNew() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* TODO: Update spacing between the plus icon and "New" */}
        <Button variant="link">+New</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="link">Item</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="link">Channel</Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
