export const delegateRegistryAbi = [
  {
    inputs: [{ internalType: 'address', name: '_idRegistry', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'Has_No_Id', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'status', type: 'bool' },
    ],
    name: 'Delegate',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'idDelegates',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'idRegistry',
    outputs: [
      { internalType: 'contract IdRegistry', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'isDelegate',
    outputs: [{ internalType: 'bool', name: 'delegateStatus', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'status', type: 'bool' },
    ],
    name: 'updateDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
