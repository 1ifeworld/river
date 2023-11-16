import { Header } from '@/client'
import { getChannels, type Node } from '@/gql'
import { UserBanner, UserChannels, UserItems } from '@/server'

export default async function User({
    params,
}: {
    params: { username: string }
}) {
  // const { user } = await getUser()

  const mockUserObject: {
    name: string, 
    desc: string,
    channels: {
      id: string
      name: string,
      creator: string,
      imageUri: string
      modified: string
    }[],
    items: {
      id: string,
      name: string,
      creator: string,
      imageUri: string,
      channel: string
      added: string
    }[]
  } = {
    name: params.username,
    desc: "this is the description for my channel. isnt it great?",
    channels: [{id: "unique-id", name: "nothing was the same", creator: "tranqui.eth", imageUri: "naHH", modified: "1 days ago"}],
    items: [{id: "unique-id", name: "uknxwWthevib832os.png", creator: "joey", imageUri: "naHH", channel: "nothing was the same", added: "3 days ago"}]
  }

  return (
    <div className="pt-4">      
      <UserBanner user={mockUserObject} />
      <br />
      <br />
      <UserChannels user={mockUserObject} />
      <br />
      <br />
      <UserItems user={mockUserObject} />
    </div>
  )
}