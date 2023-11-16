import { Stack, Typography } from '@/design-system'

export async function UserBanner({ 
    user 
}: { 
    // user: User 
    user:  any
}) {

  return (
    <Stack className="border">
      {/* User Name */}
      <Typography variant="smallText">{user.name}</Typography>
      <Typography variant="smallText">{user.desc}</Typography>
    </Stack>
  )
}
