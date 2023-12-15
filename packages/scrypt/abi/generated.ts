//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AttestationRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const attestationRegistryABI = [
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
  { type: 'error', inputs: [], name: 'Invalid_Signature' },
  { type: 'error', inputs: [], name: 'No_Existing_Attestation' },
  { type: 'error', inputs: [], name: 'Signature_Expired' },
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
  { type: 'error', inputs: [], name: 'Has_No_Id' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const idRegistryABI = [
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
  { type: 'error', inputs: [], name: 'Has_Id' },
  { type: 'error', inputs: [], name: 'Has_No_Id' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Initiator' },
  { type: 'error', inputs: [], name: 'Not_Transfer_Recipient' },
  { type: 'error', inputs: [], name: 'Unauthorized_Backup' },
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
// LightAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lightAccountABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: 'anEntryPoint',
        internalType: 'contract IEntryPoint',
        type: 'address',
      },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'addDeposit',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'dest', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'func', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'dest', internalType: 'address[]', type: 'address[]' },
      { name: 'func', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'executeBatch',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'dest', internalType: 'address[]', type: 'address[]' },
      { name: 'value', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'func', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'executeBatch',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'anOwner', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'tokensReceived',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'withdrawAddress',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawDepositTo',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'entryPoint',
        internalType: 'contract IEntryPoint',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LightAccountInitialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'error', inputs: [], name: 'ArrayLengthMismatch' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'NotAuthorized',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
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
  { type: 'error', inputs: [], name: 'Array_Length_Mismatch' },
  { type: 'error', inputs: [], name: 'Only_Operator' },
] as const
