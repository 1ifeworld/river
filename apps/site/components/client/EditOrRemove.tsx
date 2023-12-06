import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, Button, Typography } from "@/design-system";

export function EditOrRemove() {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {'...'}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            
            
           
              <DropdownMenuItem>
              <Button variant="link"><Typography>Edit item</Typography></Button>
                
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Button variant="link"><Typography>Remove item</Typography></Button>
                
              </DropdownMenuItem>
                
          </DropdownMenuContent>
        </DropdownMenu>
      )
}