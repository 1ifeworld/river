import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Button,
  Typography,
} from '@/design-system'

export function EditOrRemove() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {'...'}
      </DropdownMenuTrigger>
      {/* mx-8 */}
      <DropdownMenuContent side="top" className="w-32 mx-8">
        <DropdownMenuItem className="py-1">
          <Button variant="link" disabled={true}>
            <Typography>Edit item</Typography>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-1">
          <Button variant="link">
            <Typography>Remove item</Typography>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
