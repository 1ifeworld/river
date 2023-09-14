import * as lanyard from 'lanyard'
import { Hash, Hex } from 'viem'

interface LanyardTreeError {
  message: string
}

interface UseLanyardTreeResult {
  merkle: Hash | null
  error: LanyardTreeError | null
}

// need to adjust this to get data from form
export const createLanyardTree = async (
  owners: Hex[],
): Promise<UseLanyardTreeResult> => {
  try {
    if (!owners || owners.length === 0) {
      throw new Error('No valid addresses provided')
    }

    const { merkleRoot } = await lanyard.createTree({
      unhashedLeaves: owners,
    })
    console.log('merkleRoot', merkleRoot)
    return { merkle: merkleRoot as Hash, error: null }
  } catch (error: any) {
    return { merkle: null, error: { message: error.message } }
  }
}

export const getTreeFromRoot = async (
  root: Hash | null,
  address: Hex,
): Promise<any> => {
  if (!root) {
    console.error('Root is null or undefined.')
    return null
  }
  try {
    const basicTree = await lanyard.getTree(root)
    console.log('root', root)
    if (!basicTree) {
      console.error('Failed to retrieve the basic tree.')
      return null
    }
    console.log('basic leaf count', basicTree.leafCount)
    return basicTree
  } catch (error: any) {
    console.error('Error fetching the tree:', error.message)
    return null
  }
}

export const getMerkleProofs = async (
  merkleRoot: Hash,
  address: Hex,
): Promise<any> => {
  try {
    const proof = await lanyard.getProof({ merkleRoot, address })
    console.log(proof)
    return proof
  } catch (error: any) {
    console.error('Failed to get the Merkle proofs:', error.message)
    return null
  }
}
