export async function getAllFields({  field }: {  field: string }) {
    if (!field.length) {
      throw new Error('fields are required')
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USERNAME_SERVICE}/getAllFields`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ field }),
        },
      )
  
      if (!response.ok) {
        const errorResponse = await response.json() 
        throw new Error(errorResponse.error || 'Network response was not ok')
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Fetch error:', error)
      throw error 
    }
}
