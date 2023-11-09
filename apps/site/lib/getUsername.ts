export async function getUsername({ id }: { id: string }) {
  const username = await fetch(
    `https://server.talktomenice.workers.dev/get/${id}`,
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log('Username returned successfully')
        return data
      } else {
        console.error('Error:', data.error)
      }
    })
  return username
}
