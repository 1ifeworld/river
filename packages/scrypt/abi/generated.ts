//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ChannelRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const channelRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_idRegistry', internalType: 'address', type: 'address' },
      { name: '_delegateRegistry', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CHANNEL_SALT',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ITEM_SALT',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NEW_CHANNEL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPDATE_CHANNEL_DATA_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPDATE_CHANNEL_LOGIC_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'channelCountForUser',
    outputs: [{ name: 'channelId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'channelId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'channelUri',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'channelId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'dataForChannel',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'delegateRegistry',
    outputs: [
      { name: '', internalType: 'contract DelegateRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparatorV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'generateChanneHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'access', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAccess',
    outputs: [{ name: 'role', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'structHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'hashTypedDataV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    inputs: [{ name: 'channelId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'logicForChannel',
    outputs: [{ name: 'logic', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'logic', internalType: 'address', type: 'address' },
      { name: 'logicInit', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'newChannel',
    outputs: [
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'pointer', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'logic', internalType: 'address', type: 'address' },
      { name: 'logicInit', internalType: 'bytes', type: 'bytes' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'newChannelFor',
    outputs: [
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'pointer', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'self',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateChannelData',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateChannelDataFor',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logic', internalType: 'address', type: 'address' },
      { name: 'logicInit', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateChannelLogic',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logic', internalType: 'address', type: 'address' },
      { name: 'logicInit', internalType: 'bytes', type: 'bytes' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateChannelLogicFor',
    outputs: [],
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'channelId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'pointer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'logic',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewChannel',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'channelId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'pointer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UpdateData',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'channelId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'logic',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UpdateLogic',
  },
  {
    type: 'error',
    inputs: [
      { name: '_size', internalType: 'uint256', type: 'uint256' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
      { name: '_end', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCodeAtRange',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'No_Update_Access' },
  { type: 'error', inputs: [], name: 'SignatureExpired' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  {
    type: 'error',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'Unauthorized_Signer_For_User',
  },
  { type: 'error', inputs: [], name: 'WriteError' },
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
    inputs: [],
    name: 'SET_DELEGATES_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparatorV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'structHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'hashTypedDataV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'delegate', internalType: 'address', type: 'address' },
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'selector', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'isDelegate',
    outputs: [{ name: 'status', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'dels',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'selector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'status', internalType: 'bool', type: 'bool' },
          { name: 'delegate', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'setDelegates',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'dels',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'selector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'status', internalType: 'bool', type: 'bool' },
          { name: 'delegate', internalType: 'address', type: 'address' },
        ],
      },
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setDelegatesFor',
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
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'selector', internalType: 'bytes4', type: 'bytes4' },
          { name: 'status', internalType: 'bool', type: 'bool' },
          { name: 'delegate', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'Delegations',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'SignatureExpired' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  {
    type: 'error',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'Unauthorized_Signer_For_User',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const idRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CHANGE_RECOVERY_ADDRESS_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NAME',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REGISTER_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TRANSFER_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recovery', internalType: 'address', type: 'address' }],
    name: 'changeRecoveryAddress',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'changeRecoveryAddressFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'rid', internalType: 'uint256', type: 'uint256' }],
    name: 'custodyOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'disableTrustedOnly',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparatorV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'structHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'hashTypedDataV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'idCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'idOf',
    outputs: [{ name: 'rid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'toSig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recover',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'recoveryDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'recoverySig', internalType: 'bytes', type: 'bytes' },
      { name: 'toDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'toSig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'recoverFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'rid', internalType: 'uint256', type: 'uint256' }],
    name: 'recoveryOf',
    outputs: [{ name: 'recovery', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recovery', internalType: 'address', type: 'address' }],
    name: 'register',
    outputs: [{ name: 'rid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'registerFor',
    outputs: [{ name: 'rid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_trustedCaller', internalType: 'address', type: 'address' },
    ],
    name: 'setTrustedCaller',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'toSig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transfer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferAndChangeRecovery',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'recovery', internalType: 'address', type: 'address' },
      { name: 'fromDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'fromSig', internalType: 'bytes', type: 'bytes' },
      { name: 'toDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'toSig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferAndChangeRecoveryFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'fromDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'fromSig', internalType: 'bytes', type: 'bytes' },
      { name: 'toDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'toSig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferFor',
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'trustedCaller',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'trustedOnly',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'useNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'custodyAddress', internalType: 'address', type: 'address' },
      { name: 'rid', internalType: 'uint256', type: 'uint256' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyRidSignature',
    outputs: [{ name: 'isValid', internalType: 'bool', type: 'bool' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'recovery',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ChangeRecoveryAddress',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'DisableTrustedOnly' },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
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
    name: 'OwnershipTransferStarted',
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Recover',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'recovery',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Register',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldCaller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newCaller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetTrustedCaller',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'Has_Id' },
  { type: 'error', inputs: [], name: 'Has_No_Id' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'Invalid_Address' },
  { type: 'error', inputs: [], name: 'Only_Trusted' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'SignatureExpired' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  { type: 'error', inputs: [], name: 'Unauthorized' },
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
// ItemRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_idRegistry', internalType: 'address', type: 'address' },
      { name: '_delegateRegistry', internalType: 'address', type: 'address' },
      { name: '_channelRegistry', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADD_BATCH_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADD_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CHANNEL_SALT',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EDIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ITEM_SALT',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NEW_ITEMS_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REMOVE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPDATE_ADMINS_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'add',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelIds', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'addBatch',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addBatchFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'addedItemToChannel',
    outputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'channelRegistry',
    outputs: [
      { name: '', internalType: 'contract ChannelRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'itemId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'dataForItem',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'delegateRegistry',
    outputs: [
      { name: '', internalType: 'contract DelegateRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparatorV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'edit',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'editFor',
    outputs: [{ name: 'pointer', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'generateItemHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'structHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'hashTypedDataV4',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isAdminForItem',
    outputs: [{ name: 'status', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'itemCountForUser',
    outputs: [{ name: 'itemCount', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'itemId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'itemUri',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'inits',
        internalType: 'struct IItemRegistry.Init[]',
        type: 'tuple[]',
        components: [
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'channels', internalType: 'bytes32[]', type: 'bytes32[]' },
        ],
      },
    ],
    name: 'newItems',
    outputs: [
      { name: 'itemIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'pointers', internalType: 'address[]', type: 'address[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'inits',
        internalType: 'struct IItemRegistry.Init[]',
        type: 'tuple[]',
        components: [
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'channels', internalType: 'bytes32[]', type: 'bytes32[]' },
        ],
      },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'newItemsFor',
    outputs: [
      { name: 'itemIds', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'pointers', internalType: 'address[]', type: 'address[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'remove',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'removeFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'self',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'userIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'statuses', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'updateAdmins',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'itemId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'userIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'statuses', internalType: 'bool[]', type: 'bool[]' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'sig', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'updateAdminsFor',
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
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'channelId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Add',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'pointer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Edit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'pointer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'New',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'channelId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Remove',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'itemId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'userIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'statuses',
        internalType: 'bool[]',
        type: 'bool[]',
        indexed: false,
      },
    ],
    name: 'UpdateAdmins',
  },
  { type: 'error', inputs: [], name: 'Input_Length_Mismatch' },
  {
    type: 'error',
    inputs: [
      { name: '_size', internalType: 'uint256', type: 'uint256' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
      { name: '_end', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCodeAtRange',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'No_Add_Access' },
  { type: 'error', inputs: [], name: 'No_Edit_Access' },
  { type: 'error', inputs: [], name: 'No_Remove_Access' },
  { type: 'error', inputs: [], name: 'Only_Admin' },
  { type: 'error', inputs: [], name: 'SignatureExpired' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  {
    type: 'error',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'Unauthorized_Signer_For_User',
  },
  { type: 'error', inputs: [], name: 'WriteError' },
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
// NftRenderer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftRendererABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'render',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RoleBasedAccess
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const roleBasedAccessABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_idRegistry', internalType: 'address', type: 'address' },
      { name: '_delegateRegistry', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'access',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'delegateRegistry',
    outputs: [
      { name: '', internalType: 'contract DelegateRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'userIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'channelHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'roles', internalType: 'enum IRoles.Roles[]', type: 'uint8[]' },
    ],
    name: 'editRoles',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelId', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAccess',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initializeWithData',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'userId', internalType: 'uint256', type: 'uint256' },
      { name: 'channelHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'userRoleForChannel',
    outputs: [{ name: '', internalType: 'enum IRoles.Roles', type: 'uint8' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'userId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'userIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'channelHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'roles',
        internalType: 'enum IRoles.Roles[]',
        type: 'uint8[]',
        indexed: false,
      },
    ],
    name: 'RolesSet',
  },
  { type: 'error', inputs: [], name: 'Input_Length_Mismatch' },
  { type: 'error', inputs: [], name: 'Only_Admin' },
  {
    type: 'error',
    inputs: [{ name: 'userId', internalType: 'uint256', type: 'uint256' }],
    name: 'Unauthorized_Signer_For_User',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StringRenderer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringRendererABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'render',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
] as const
