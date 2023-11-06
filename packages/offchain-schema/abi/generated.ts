//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AdminWithMembers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const adminWithMembersABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportInitialize_100Type',
    outputs: [
      {
        name: '',
        internalType: 'struct AdminWithMembers.Initialize_100',
        type: 'tuple',
        components: [
          { name: 'admin', internalType: 'uint256', type: 'uint256' },
          { name: 'members', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportUpdate_200Type',
    outputs: [
      {
        name: '',
        internalType: 'struct AdminWithMembers.Update_200',
        type: 'tuple',
        components: [
          { name: 'admin', internalType: 'uint256', type: 'uint256' },
          { name: 'members', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'roles', internalType: 'uint8[]', type: 'uint8[]' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ChannelMessageTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const channelMessageTypesABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportAdd_110Type',
    outputs: [
      {
        name: '',
        internalType: 'struct ChannelMessageTypes.Add_110',
        type: 'tuple',
        components: [
          {
            name: 'pointer',
            internalType: 'struct ChannelMessageTypes.CustomParam_Pointer',
            type: 'tuple',
            components: [
              { name: 'chainId', internalType: 'uint256', type: 'uint256' },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'target', internalType: 'address', type: 'address' },
              { name: 'hasId', internalType: 'bool', type: 'bool' },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportRemove_120Type',
    outputs: [
      {
        name: '',
        internalType: 'struct ChannelMessageTypes.Remove_120',
        type: 'tuple',
        components: [
          { name: 'channelIndex', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportUri_100Type',
    outputs: [
      {
        name: '',
        internalType: 'struct ChannelMessageTypes.Uri_100',
        type: 'tuple',
        components: [{ name: 'uri', internalType: 'string', type: 'string' }],
      },
    ],
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
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
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
  { type: 'error', inputs: [], name: 'Has_Attested' },
  { type: 'error', inputs: [], name: 'Has_Id' },
  { type: 'error', inputs: [], name: 'Has_No_Id' },
  { type: 'error', inputs: [], name: 'Invalid_Signature' },
  { type: 'error', inputs: [], name: 'No_Active_Attestation' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Initiator' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Recipient' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
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
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'attestor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RevokeAttestation',
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
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
      { name: 'signerOverride', internalType: 'address', type: 'address' },
    ],
    name: 'attest',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'attestedBy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'attestedFor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'backupForId',
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
      { name: 'backup', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'register',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'revokeAttestation',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'transferCountForId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
// NodeRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nodeRegistryABI = [
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
        name: 'messageId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'MessageNode',
  },
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
        name: 'nodeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'RegisterNode',
  },
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
        name: 'schema',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'RegisterSchema',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'messageCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'messageNode',
    outputs: [{ name: 'messageId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'datas', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'messageNodeBatch',
    outputs: [
      { name: 'messageIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nodeCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'registerNode',
    outputs: [{ name: 'nodeId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'datas', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'registerNodeBatch',
    outputs: [
      { name: 'nodeIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'registerSchema',
    outputs: [{ name: 'schema', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'datas', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'registerSchemaBatch',
    outputs: [
      { name: 'schemas', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'schemaCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NodeRegistryTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nodeRegistryTypesABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportCallType',
    outputs: [
      {
        name: '',
        internalType: 'struct NodeRegistryTypes.Call',
        type: 'tuple',
        components: [
          { name: 'nodeId', internalType: 'uint256', type: 'uint256' },
          { name: 'userId', internalType: 'uint256', type: 'uint256' },
          { name: 'msgType', internalType: 'uint256', type: 'uint256' },
          { name: 'msgBody', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportRegistrationType',
    outputs: [
      {
        name: '',
        internalType: 'struct NodeRegistryTypes.Registration',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'userId', internalType: 'uint256', type: 'uint256' },
          { name: 'msgType', internalType: 'uint256', type: 'uint256' },
          { name: 'msgBody', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PublicationMessageTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const publicationMessageTypesABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exportTypes',
    outputs: [
      {
        name: '',
        internalType: 'struct PublicationMessageTypes.Uri_100',
        type: 'tuple',
        components: [{ name: 'uri', internalType: 'string', type: 'string' }],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RiverValidatorV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const riverValidatorV1ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_riverOperator', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'Array_Length_Mismatch' },
  { type: 'error', inputs: [], name: 'Only_Operator' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OperatorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: true },
    ],
    name: 'Validate',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'riverOperator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'updateOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'validate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'statuses', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'validateBatch',
    outputs: [],
  },
] as const
