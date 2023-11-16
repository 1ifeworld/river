import { Stack, Typography } from '@/design-system'

export async function ActivityBanner({ 
    user 
}: { 
    // user: User 
    user:  any
}) {

  return (
    <Stack className="space-y-[10px]">
      <Typography variant="smallText">{user.name}</Typography>
      <Typography variant="smallText" className='text-[#747474]'  >{user.desc}</Typography>
    </Stack>
  )
}
