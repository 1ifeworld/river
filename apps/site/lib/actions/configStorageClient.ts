'use server'

import { CarReader } from '@ipld/car'
import { parse as parseDid } from '@ipld/dag-ucan/did'
import { importDAG } from '@ucanto/core/delegation'
import { parse } from '@ucanto/principal/ed25519' // Agents on Node should use Ed25519 keys
import { create } from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/access'

export async function configStorageClient({
  did,
}: { did: `did:${string}:${string}` }): Promise<Uint8Array | undefined> {
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
   * Create a delegation for a specific did
   */
  const audience = parseDid(did)
  const abilities = ['upload/add', 'store/add']
  // @ts-ignore
  const delegation = await client.createDelegation(audience, abilities, { expiration: 0 })
  /**
   * Serialize the delegation and send it to the client
   */
  const archive = await delegation.archive()
  return archive.ok
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
