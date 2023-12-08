import { Item } from '@/gql'
import { Typography } from '@/design-system'
import { getFromDb } from 'lib/getRedis'

export async function ItemContentType({ item }: { item: Item }) {
  const publicationUri = item.target?.publication?.uri
  console.log('ItemContentType - item:', item)
  console.log('ItemContentType - publicationUri:', publicationUri)

  if (!publicationUri) {
    console.error('No publication URI found for item:', item)
    return <Typography className="text-primary-foreground">No URI</Typography>
  }

  try {
    // Fetch metadata from the database using the publicationUri
    const metadataResponse = await getFromDb([publicationUri])
    console.log(
      'Metadata response for URI',
      publicationUri,
      ':',
      metadataResponse,
    )

    if (
      !metadataResponse ||
      !metadataResponse.data ||
      !metadataResponse.data[publicationUri]
    ) {
      console.error('No metadata found for URI:', publicationUri)
      return (
        <Typography className="text-primary-foreground">
          Unknown Type
        </Typography>
      )
    }

    const itemMetadata = metadataResponse.data[publicationUri]
    console.log('Item metadata:', itemMetadata)

    if (!itemMetadata.content_type) {
      console.error(
        'No content_type found in metadata for URI:',
        publicationUri,
      )
      return (
        <Typography className="text-primary-foreground">
          No Content Type
        </Typography>
      )
    }

    return (
      <Typography className="text-primary-foreground">
        {itemMetadata.content_type}
      </Typography>
    )
  } catch (error) {
    console.error('Error fetching or processing data:', error)
    return <Typography className="text-primary-foreground">Error</Typography>
  }
}
