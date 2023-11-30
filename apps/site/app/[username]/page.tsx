import { Stack } from '@/design-system'
import { ActivityBanner, ActivityChannels, ActivityItems } from '@/server'

export const dynamic = 'force-dynamic'

export default async function User({
  params,
}: {
  params: { username: string }
}) {

  const mockUserObject: {
    name: string
    desc: string
    channels: {
      id: string
      name: string
      creator: string
      imageUri: string
      modified: string
    }[]
    items: {
      id: string
      name: string
      creator: string
      imageUri: string
      channel: string
      added: string
    }[]
  } = {
    name: params.username,
    desc: 'Design, Research, Art Direction - j@lifeworld.co',
    channels: [
      {
        id: 'unique-id-1',
        name: 'nothing was the same',
        creator: 'tranqui.eth',
        imageUri: 'naHH',
        modified: '23 minutes ago',
      },
      {
        id: 'unique-id-2',
        name: 'what about us',
        creator: 'salief.eth',
        imageUri: 'naHH',
        modified: '3 days ago',
      },
      {
        id: 'unique-id-3',
        name: 'nothing was the same',
        creator: 'tranqui.eth',
        imageUri: 'naHH',
        modified: '4 days ago',
      },
    ],
    items: [
      {
        id: 'unique-id-1',
        name: 'uknxwWthevib832os.png',
        creator: 'joey',
        imageUri: 'naHH',
        channel: 'nothing was the same',
        added: '1 day ago',
      },
      {
        id: 'unique-id-2',
        name: 'heyyyyyyyyY.mp4',
        creator: 'tranqui.eth',
        imageUri: 'naHH',
        channel: 'Network Protagonist',
        added: '2 days ago',
      },
      {
        id: 'unique-id-3',
        name: 'Unstoppable',
        creator: 'verymehari.eth',
        imageUri: 'naHH',
        channel: 'Vestiges - pt 1',
        added: '5 days ago',
      },
    ],
  }

  return (
    <Stack className="pt-[72px] gap-14">
      <ActivityBanner user={mockUserObject} />
      <ActivityChannels user={mockUserObject} />
      <ActivityItems user={mockUserObject} />
    </Stack>
  )
}
