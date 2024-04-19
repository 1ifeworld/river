import { Stack, Typography, DialogTrigger } from '@/design-system'
import { useMediaQuery } from '@/hooks'

export function NewChannelTrigger() {
  const { isMobile } = useMediaQuery()
  return (
    <DialogTrigger
      className={`                
                ${
                  isMobile === true
                    ? 'flex items-center gap-x-3'
                    : 'flex flex-col items-start space-y-[10px]'
                }
        `}
    >
      <Stack
        className={`
                    border-border border-[1px] aspect-ratio items-center justify-center hover:cursor-pointer transition-all
                    ${
                      isMobile === true
                        ? 'w-[65px] h-[65px]'
                        : 'w-[256px] h-[256px] hover:bg-[#F9F9F9]'
                    }     
            `}
      >
        <Typography
          className={`
                    ${isMobile === true ? 'text-[12px]' : 'text-[22px]'}
                `}
        >
          +
        </Typography>
      </Stack>
      {/* <Typography className='hover:underline underline-offset-2 transition-all'> */}
      <Typography>New channel</Typography>
    </DialogTrigger>
  )
}
