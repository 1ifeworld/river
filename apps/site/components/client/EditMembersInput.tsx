import { Flex, cn } from '@/design-system'
import { type InputProps, Plus, X } from '@/design-system'
import * as React from 'react'

interface EditMembersInputProps extends InputProps {
  onButtonClickStateTrue: () => void
  onButtonClickStateFalse: () => void
  state: number
}

const EditMembersInput = React.forwardRef<
  HTMLInputElement,
  EditMembersInputProps
>(
  (
    {
      className,
      type,
      onButtonClickStateTrue,
      onButtonClickStateFalse,
      state,
      ...props
    },
    ref,
  ) => {
    return (
      <Flex className="relative w-full items-center">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full border border-border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {state === 0 ? (
          <></>
        ) : (
          <button
            type="button"
            className="absolute right-3 cursor-pointer"
            onClick={
              state === 1 ? onButtonClickStateTrue : onButtonClickStateFalse
            }
          >
            {state === 1 ? <Plus /> : <X />}
          </button>
        )}
      </Flex>
    )
  },
)
EditMembersInput.displayName = 'EditMembersInput'

export { EditMembersInput }
