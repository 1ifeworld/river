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
    name: 'exportTypes',
    outputs: [
      {
        name: '',
        internalType: 'struct ChannelMessageTypes.Uri_100',
        type: 'tuple',
        components: [{ name: 'uri', internalType: 'string', type: 'string' }],
      },
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
