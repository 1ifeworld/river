//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const idRegistryABI = [
    {
      inputs: [
        { internalType: "address", name: "_initialOwner", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "EnforcedPause", type: "error" },
    { inputs: [], name: "ExpectedPause", type: "error" },
    { inputs: [], name: "Has_Id", type: "error" },
    { inputs: [], name: "Has_No_Id", type: "error" },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "currentNonce", type: "uint256" },
      ],
      name: "InvalidAccountNonce",
      type: "error",
    },
    { inputs: [], name: "InvalidShortString", type: "error" },
    { inputs: [], name: "InvalidSignature", type: "error" },
    { inputs: [], name: "Invalid_Address", type: "error" },
    { inputs: [], name: "Only_Trusted", type: "error" },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    { inputs: [], name: "SignatureExpired", type: "error" },
    {
      inputs: [{ internalType: "string", name: "str", type: "string" }],
      name: "StringTooLong",
      type: "error",
    },
    { inputs: [], name: "Unauthorized", type: "error" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
        {
          indexed: true,
          internalType: "address",
          name: "recovery",
          type: "address",
        },
      ],
      name: "ChangeRecoveryAddress",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "DisableTrustedOnly", type: "event" },
    {
      anonymous: false,
      inputs: [],
      name: "EIP712DomainChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "Recover",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recovery",
          type: "address",
        },
      ],
      name: "Register",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldCaller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newCaller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "SetTrustedCaller",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "CHANGE_RECOVERY_ADDRESS_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NAME",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "REGISTER_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TRANSFER_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "VERSION",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "recovery", type: "address" }],
      name: "changeRecoveryAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "recovery", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes", name: "sig", type: "bytes" },
      ],
      name: "changeRecoveryAddressFor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "rid", type: "uint256" }],
      name: "custodyOf",
      outputs: [{ internalType: "address", name: "owner", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "disableTrustedOnly",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "domainSeparatorV4",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        { internalType: "bytes1", name: "fields", type: "bytes1" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "version", type: "string" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "address", name: "verifyingContract", type: "address" },
        { internalType: "bytes32", name: "salt", type: "bytes32" },
        { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "structHash", type: "bytes32" },
      ],
      name: "hashTypedDataV4",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "idCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "idOf",
      outputs: [{ internalType: "uint256", name: "rid", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "nonces",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes", name: "toSig", type: "bytes" },
      ],
      name: "recover",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "recoveryDeadline", type: "uint256" },
        { internalType: "bytes", name: "recoverySig", type: "bytes" },
        { internalType: "uint256", name: "toDeadline", type: "uint256" },
        { internalType: "bytes", name: "toSig", type: "bytes" },
      ],
      name: "recoverFor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "rid", type: "uint256" }],
      name: "recoveryOf",
      outputs: [{ internalType: "address", name: "recovery", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "recovery", type: "address" }],
      name: "register",
      outputs: [{ internalType: "uint256", name: "rid", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "address", name: "recovery", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes", name: "sig", type: "bytes" },
      ],
      name: "registerFor",
      outputs: [{ internalType: "uint256", name: "rid", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_trustedCaller", type: "address" },
      ],
      name: "setTrustedCaller",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes", name: "toSig", type: "bytes" },
      ],
      name: "transfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "address", name: "recovery", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes", name: "sig", type: "bytes" },
      ],
      name: "transferAndChangeRecovery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "address", name: "recovery", type: "address" },
        { internalType: "uint256", name: "fromDeadline", type: "uint256" },
        { internalType: "bytes", name: "fromSig", type: "bytes" },
        { internalType: "uint256", name: "toDeadline", type: "uint256" },
        { internalType: "bytes", name: "toSig", type: "bytes" },
      ],
      name: "transferAndChangeRecoveryFor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "fromDeadline", type: "uint256" },
        { internalType: "bytes", name: "fromSig", type: "bytes" },
        { internalType: "uint256", name: "toDeadline", type: "uint256" },
        { internalType: "bytes", name: "toSig", type: "bytes" },
      ],
      name: "transferFor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "trustedCaller",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "trustedOnly",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "useNonce",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "custodyAddress", type: "address" },
        { internalType: "uint256", name: "rid", type: "uint256" },
        { internalType: "bytes32", name: "digest", type: "bytes32" },
        { internalType: "bytes", name: "sig", type: "bytes" },
      ],
      name: "verifyRidSignature",
      outputs: [{ internalType: "bool", name: "isValid", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PostGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postGatewayABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "NewPost",
      type: "event",
    },
    {
      inputs: [],
      name: "NAME",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "VERSION",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "exportAddItemStruct",
      outputs: [
        {
          components: [
            { internalType: "string", name: "itemCid", type: "string" },
            { internalType: "string", name: "channelCid", type: "string" },
          ],
          internalType: "struct IPostGateway.AddItem",
          name: "addItem",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "exportChannelStruct",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelDataTypes",
                  name: "dataType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelAccessTypes",
                  name: "accessType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelAccess",
              name: "access",
              type: "tuple",
            },
          ],
          internalType: "struct IPostGateway.Channel",
          name: "channel",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "exportItemStruct",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "enum IPostGateway.ItemDataTypes",
                  name: "dataType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ItemData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ItemAccessTypes",
                  name: "accessType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ItemAccess",
              name: "access",
              type: "tuple",
            },
          ],
          internalType: "struct IPostGateway.Item",
          name: "item",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "exportMessageStruct",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "rid", type: "uint256" },
            { internalType: "uint256", name: "timestamp", type: "uint256" },
            {
              internalType: "enum IPostGateway.MessageTypes",
              name: "msgType",
              type: "uint8",
            },
            { internalType: "bytes", name: "msgBody", type: "bytes" },
          ],
          internalType: "struct IPostGateway.Message",
          name: "message",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "exportPostStruct",
      outputs: [
        {
          components: [
            { internalType: "address", name: "signer", type: "address" },
            {
              components: [
                { internalType: "uint256", name: "rid", type: "uint256" },
                { internalType: "uint256", name: "timestamp", type: "uint256" },
                {
                  internalType: "enum IPostGateway.MessageTypes",
                  name: "msgType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "msgBody", type: "bytes" },
              ],
              internalType: "struct IPostGateway.Message",
              name: "message",
              type: "tuple",
            },
            { internalType: "uint16", name: "hashType", type: "uint16" },
            { internalType: "bytes32", name: "hash", type: "bytes32" },
            { internalType: "uint16", name: "sigType", type: "uint16" },
            { internalType: "bytes", name: "sig", type: "bytes" },
          ],
          internalType: "struct IPostGateway.Post",
          name: "post",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "exportRemoveItemStruct",
      outputs: [
        {
          components: [
            { internalType: "string", name: "itemCid", type: "string" },
            { internalType: "string", name: "channelCid", type: "string" },
          ],
          internalType: "struct IPostGateway.RemoveItem",
          name: "removeItem",
          type: "tuple",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "signer", type: "address" },
            {
              components: [
                { internalType: "uint256", name: "rid", type: "uint256" },
                { internalType: "uint256", name: "timestamp", type: "uint256" },
                {
                  internalType: "enum IPostGateway.MessageTypes",
                  name: "msgType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "msgBody", type: "bytes" },
              ],
              internalType: "struct IPostGateway.Message",
              name: "message",
              type: "tuple",
            },
            { internalType: "uint16", name: "hashType", type: "uint16" },
            { internalType: "bytes32", name: "hash", type: "bytes32" },
            { internalType: "uint16", name: "sigType", type: "uint16" },
            { internalType: "bytes", name: "sig", type: "bytes" },
          ],
          internalType: "struct IPostGateway.Post",
          name: "",
          type: "tuple",
        },
      ],
      name: "post",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "signer", type: "address" },
            {
              components: [
                { internalType: "uint256", name: "rid", type: "uint256" },
                { internalType: "uint256", name: "timestamp", type: "uint256" },
                {
                  internalType: "enum IPostGateway.MessageTypes",
                  name: "msgType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "msgBody", type: "bytes" },
              ],
              internalType: "struct IPostGateway.Message",
              name: "message",
              type: "tuple",
            },
            { internalType: "uint16", name: "hashType", type: "uint16" },
            { internalType: "bytes32", name: "hash", type: "bytes32" },
            { internalType: "uint16", name: "sigType", type: "uint16" },
            { internalType: "bytes", name: "sig", type: "bytes" },
          ],
          internalType: "struct IPostGateway.Post[]",
          name: "posts",
          type: "tuple[]",
        },
      ],
      name: "postBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },

] as const
