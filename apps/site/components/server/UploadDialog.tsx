import * as React from 'react'
import {
  Button,
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/design-system'

interface UploadDialogProps {
  triggerChildren: React.ReactNode
  children: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
}

export const UploadDialog = React.forwardRef<HTMLDivElement, UploadDialogProps>(
  ({ triggerChildren, children, onSelect, onOpenChange }, forwardedRef) => {
    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            ref={forwardedRef}
            onSelect={(event) => {
              event.preventDefault()
              onSelect && onSelect()
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="focus:outline-none">
            {children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
)
