import { redisClient } from './redisClient'
import { fetchIpfsData, isCid, isValidCidData } from './helpers'

export async function GET(req: Request) {
  const cids = await req.json() // parse the incoming request body as JSON

  // Check if `cids` is an array and it's not empty
  if (!Array.isArray(cids) || cids.length === 0) {
    Response.json({ error: 'No CIDs provided or invalid format' })
    return
  }

  try {
    // Fetch all values at once using MGET
    const dataValues = await redisClient.mget(...cids)

    const results: Record<string, unknown> = {}

    for (const [index, cid] of cids.entries()) {
      results[cid] = dataValues[index]
    }

    Response.json({
      message: 'CIDs processed successfully',
      data: results,
    })
  } catch (error) {
    console.error('Error occurred when fetching data for CIDs', error)
    Response.json({ error: 'Error fetching data for CIDs' })
  }
}

export async function POST(req: Request) {
  const fullCid = await req.json() // parse the incoming request body as JSON

  if (!fullCid || typeof fullCid !== 'string') {
    Response.json({ error: 'CID is not provided or is not a string' })
    return
  }

  // Extract the CID part from the full CID string
  // const cid = fullCid.replace(/^ipfs:\/\//, "");
  const cid = fullCid.slice(7).trim()

  if (!isCid(cid)) {
    console.error(`Invalid CID format: ${cid}`)
    // Store a null value for the invalid CID
    await redisClient.set(fullCid, null)
    Response.json({ error: 'Invalid CID format, stored as null' })
    return
  }

  const cidFetchResponse = await fetchIpfsData(fullCid)

  if (cidFetchResponse && isValidCidData(cidFetchResponse)) {
    try {
      await redisClient.set(fullCid, JSON.stringify(cidFetchResponse))
      Response.json({ message: 'Request processed successfully' })
    } catch (error) {
      console.error('Redis set failed', error)
      Response.json({ error: 'Error setting data for CID: ' })
    }
  } else {
    Response.json({ error: 'Invalid CID data or fetch unsuccessful' })
  }
}
