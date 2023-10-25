export const logicAbi = [
  { inputs: [], name: 'Invalid_Input_Length', type: 'error' },
  { inputs: [], name: 'Sender_Not_Admin', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'press',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]',
      },
      { indexed: false, internalType: 'bool[]', name: 'roles', type: 'bool[]' },
    ],
    name: 'AccountRolesSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'press',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32',
      },
    ],
    name: 'MerkleRootSet',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'getOverwriteAccess',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    name: 'getPressDataAccess',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'getRemoveAccess',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
      { internalType: 'bytes32[]', name: 'merkleProof', type: 'bytes32[]' },
    ],
    name: 'getSendAccess',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: 'initializeWithData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'pressAdmins',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'pressMerkleRoot',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'press', type: 'address' },
      { internalType: 'address[]', name: 'accounts', type: 'address[]' },
      { internalType: 'bool[]', name: 'roles', type: 'bool[]' },
    ],
    name: 'setAccountRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'press', type: 'address' },
      { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
    ],
    name: 'setMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
