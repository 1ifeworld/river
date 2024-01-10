'use server'

import { CarReader } from '@ipld/car'
import { parse as parseDid } from '@ipld/dag-ucan/did'
import { importDAG } from '@ucanto/core/delegation'
import { parse } from '@ucanto/principal/ed25519' // Agents on Node should use Ed25519 keys
import { StoreMemory } from '@web3-storage/access'
import { create } from '@web3-storage/w3up-client'
import { type BlobLike } from '@web3-storage/w3up-client/dist/src/types'

export async function w3sUpload({ formData }: { formData: FormData }) {
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
  const fileOrBlob = formData.get('file') as BlobLike;
  /**
   * Upload the file and return the cid
   */
  const cid = await client.uploadFile(fileOrBlob)
  return { cid: cid.toString()} 
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
