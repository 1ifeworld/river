import { createTree, getTree, getProof } from 'lanyard'
import { Hash, Hex } from 'viem'

interface LanyardTreeError {
  message: string
}

interface UseLanyardTreeResult {
  merkle: Hash | null
  error: LanyardTreeError | null
}

export const createLanyardTree = async (
  owners: Hex[],
): Promise<UseLanyardTreeResult> => {
  if (!owners || owners.length === 0) {
    return { merkle: null, error: { message: 'No valid addresses provided' } }
  }

  try {
    const { merkleRoot } = await createTree({ unhashedLeaves: owners })
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
    return null
  }

  try {
    const basicTree = await getTree(root)
    if (!basicTree) {
      return null
    }
    return basicTree
  } catch (error: any) {
    return null
  }
}

export const getMerkleProofs = async (
  merkleRoot: Hash,
  address: Hex,
): Promise<any> => {
  try {
    return await getProof({ merkleRoot, address })
  } catch (error: any) {
    return null
  }
}
