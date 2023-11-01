import * as React from 'react'
import {
  Button,
  Typography,
  Stack,
  Separator,
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DialogDescription,
} from '@/design-system'
import { uploadToIPFS } from '@/actions'

interface UploadDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
}

export const UploadDialog = React.forwardRef<HTMLDivElement, UploadDialogProps>(
  ({ triggerChildren, onSelect, onOpenChange }, forwardedRef) => {
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
          <DialogContent className="sm:max-w-[425px] focus:outline-none">
            <Stack className="items-center gap-4">
              <DialogHeader>
                <DialogTitle>
                  <Typography>Add New Item</Typography>
                </DialogTitle>
              </DialogHeader>
              <Separator />
              {/* <DialogDescription>
                <Typography>
                  Drag and drop your files here or click here to browse
                </Typography>
              </DialogDescription> */}
              {/* Upload form */}
              <form action={uploadToIPFS}>
                {/* // {...getInputProps()} */}
                <input />
                {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
                <Typography>
                  Drag and drop your files here or click here to browse
                </Typography>
              </form>
            </Stack>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
)
