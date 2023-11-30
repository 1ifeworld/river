//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AttestationRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const attestationRegistryABI = [
  { type: 'error', inputs: [], name: 'Invalid_Signature' },
  { type: 'error', inputs: [], name: 'No_Existing_Attestation' },
  { type: 'error', inputs: [], name: 'Signature_Expired' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'attestor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Attest',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'revoker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'attestedFor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Revoke',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'message', internalType: 'bytes', type: 'bytes' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'attest',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'attestedBy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'attestorFor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'revoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DelegateRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const delegateRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_idRegistry', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'Has_No_Id' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'target',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: true },
    ],
    name: 'Delegate',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'idDelegates',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'idRegistry',
    outputs: [
      { name: '', internalType: 'contract IdRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'target', internalType: 'address', type: 'address' },
    ],
    name: 'isDelegate',
    outputs: [{ name: 'delegateStatus', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateDelegate',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const idRegistryABI = [
  { type: 'error', inputs: [], name: 'Has_Id' },
  { type: 'error', inputs: [], name: 'Has_No_Id' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Initiator' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Recipient' },
  { type: 'error', inputs: [], name: 'Unauthorized_Backup' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Backup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'backup',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ChangeBackupAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'backup',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Register',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'TransferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'TransferComplete',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'TransferInitiated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'acceptTransfer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'backup',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'backupFor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelTransfer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'backupAddress', internalType: 'address', type: 'address' },
    ],
    name: 'changeBackupAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'idCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'idOwnedBy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'initiateTransfer',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'pendingTransfers',
    outputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'backupAddress', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'register',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'transferPendingForId',
    outputs: [
      {
        name: '',
        internalType: 'struct IIdRegistry.PendingTransfer',
        type: 'tuple',
        components: [
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'to', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'exportItem',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'hasId', internalType: 'bool', type: 'bool' },
      { name: 'id', internalType: 'int256', type: 'int256' },
      { name: 'channelId', internalType: 'int256', type: 'int256' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LightAccountFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lightAccountFactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_entryPoint',
        internalType: 'contract IEntryPoint',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'accountImplementation',
    outputs: [
      { name: '', internalType: 'contract LightAccount', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [
      { name: 'ret', internalType: 'contract LightAccount', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const messageABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'exportMessage',
    outputs: [
      { name: 'msgType', internalType: 'uint32', type: 'uint32' },
      { name: 'msgBody', internalType: 'bytes', type: 'bytes' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Post
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'exportPost',
    outputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'sigType', internalType: 'uint8', type: 'uint8' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
      { name: 'version', internalType: 'uint16', type: 'uint16' },
      { name: 'expiration', internalType: 'uint64', type: 'uint64' },
      { name: 'messageArray', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PostGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postGatewayABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Post',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'input', internalType: 'bytes', type: 'bytes' }],
    name: 'post',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'inputs', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'postBatch',
    outputs: [],
  },
] as const
