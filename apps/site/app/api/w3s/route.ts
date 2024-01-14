import { CarReader } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'
import { parse } from '@ucanto/principal/ed25519'
import { StoreMemory } from '@web3-storage/access'
import { create } from '@web3-storage/w3up-client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  /**
   * Initialize the client with your own local agent instead of creating a new agent by default
   */
  const principal = parse(process.env.KEY as string)
  const client = await create({ principal, store: new StoreMemory() })
  /**
   * Configure your Space with the client by passing in the generated proof
   */
  const proof = await parseProof(process.env.PROOF as string)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
  /**
   * Extract the file from the FormData object
   */
  const formData = await req.formData()
  const fileOrBlob = formData.get('file') as Blob | null
  /**
   * Respond with a 400 code if no File or Blob is presnt
   */
  if (!fileOrBlob) {
    return NextResponse.json(
      { error: 'File blob is required.' },
      { status: 400 },
    )
  }
  /**
   * Convert the data to a buffer
   */
  const buffer = Buffer.from(await fileOrBlob.arrayBuffer())
  /**
   * Upload the file and return the cid
   */
  const cid = await client.uploadFile(
    new Blob([buffer], { type: 'application/json' }),
  )

  console.log(`https://${cid?.toString()}.ipfs.w3s.link`)
  /**
   *  Return the cid as an API response
   * */
  return NextResponse.json({ cid: cid?.toString() })
}

async function parseProof(data: string) {
  const blocks = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }

  // @ts-ignore
  return importDAG(blocks)
}
