var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var offchain_schema_exports = {};
__export(offchain_schema_exports, {
  adminWithMembersABI: () => adminWithMembersABI,
  channelMessageTypesABI: () => channelMessageTypesABI,
  channelSchema: () => channelSchema,
  decodeAdminWithMembersData: () => decodeAdminWithMembersData,
  decodeMessageChannelData: () => decodeMessageChannelData,
  decodeMessagePublicationData: () => decodeMessagePublicationData,
  decodeNodeCallData: () => decodeNodeCallData,
  decodeNodeRegistrationData: () => decodeNodeRegistrationData,
  delegateRegistry: () => delegateRegistry,
  delegateRegistryABI: () => delegateRegistryABI,
  entryPoint: () => entryPoint,
  idRegistry: () => idRegistry,
  idRegistryABI: () => idRegistryABI,
  isValidNodeRegistration: () => isValidNodeRegistration,
  isValidSchemaRegistration: () => isValidSchemaRegistration,
  lightAccountFactory: () => lightAccountFactory,
  nodeRegistrationData: () => nodeRegistrationData,
  nodeRegistry: () => nodeRegistry,
  nodeRegistryABI: () => nodeRegistryABI,
  nodeRegistryTypesABI: () => nodeRegistryTypesABI,
  operator: () => operator,
  publicationMessageTypesABI: () => publicationMessageTypesABI,
  publicationSchema: () => publicationSchema,
  riverValidatorV1: () => riverValidatorV1,
  riverValidatorV1ABI: () => riverValidatorV1ABI
});
module.exports = __toCommonJS(offchain_schema_exports);

// constants/addresses.ts
var idRegistry = "0xf89a7C9a0517da815dB66CdcAf61F44E01476697";
var delegateRegistry = "0x995D4621B4B72cd2805f99972A1313bd9876c613";
var nodeRegistry = "0xd8Dbf7dC3746B968485164c05b5c11C78a2BFebc";
var riverValidatorV1 = "0x3E3522Ac4d89c56c8759F81a86ff94b8c39A45e3";
var lightAccountFactory = "0x000000893A26168158fbeaDD9335Be5bC96592E2";
var entryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
var operator = "0x004991c3bbcF3dd0596292C80351798965070D75";

// idRegistry/filters.ts
function isValidSchemaRegistration({
  sender,
  schema,
  data
}) {
  if (sender != operator)
    return false;
  return true;
}

// nodeRegistry/decoders.ts
var import_viem = require("viem");

// abi/generated.ts
var adminWithMembersABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportInitialize_100Type",
    outputs: [
      {
        name: "",
        internalType: "struct AdminWithMembers.Initialize_100",
        type: "tuple",
        components: [
          { name: "admin", internalType: "uint256", type: "uint256" },
          { name: "members", internalType: "uint256[]", type: "uint256[]" }
        ]
      }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportUpdate_200Type",
    outputs: [
      {
        name: "",
        internalType: "struct AdminWithMembers.Update_200",
        type: "tuple",
        components: [
          { name: "admin", internalType: "uint256", type: "uint256" },
          { name: "members", internalType: "uint256[]", type: "uint256[]" },
          { name: "roles", internalType: "uint8[]", type: "uint8[]" }
        ]
      }
    ]
  }
];
var channelMessageTypesABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportAdd_110Type",
    outputs: [
      {
        name: "",
        internalType: "struct ChannelMessageTypes.Add_110",
        type: "tuple",
        components: [
          {
            name: "pointer",
            internalType: "struct ChannelMessageTypes.CustomParam_Pointer",
            type: "tuple",
            components: [
              { name: "chainId", internalType: "uint256", type: "uint256" },
              { name: "id", internalType: "uint256", type: "uint256" },
              { name: "target", internalType: "address", type: "address" },
              { name: "hasId", internalType: "bool", type: "bool" }
            ]
          }
        ]
      }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportRemove_120Type",
    outputs: [
      {
        name: "",
        internalType: "struct ChannelMessageTypes.Remove_120",
        type: "tuple",
        components: [
          { name: "channelIndex", internalType: "uint256", type: "uint256" }
        ]
      }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportUri_100Type",
    outputs: [
      {
        name: "",
        internalType: "struct ChannelMessageTypes.Uri_100",
        type: "tuple",
        components: [{ name: "uri", internalType: "string", type: "string" }]
      }
    ]
  }
];
var delegateRegistryABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_idRegistry", internalType: "address", type: "address" }]
  },
  { type: "error", inputs: [], name: "Has_No_Id" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "nonce",
        internalType: "uint256",
        type: "uint256",
        indexed: false
      },
      {
        name: "target",
        internalType: "address",
        type: "address",
        indexed: true
      },
      { name: "status", internalType: "bool", type: "bool", indexed: true }
    ],
    name: "Delegate"
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "address", type: "address" }
    ],
    name: "idDelegates",
    outputs: [{ name: "", internalType: "bool", type: "bool" }]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "idRegistry",
    outputs: [
      { name: "", internalType: "contract IdRegistry", type: "address" }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "target", internalType: "address", type: "address" }
    ],
    name: "isDelegate",
    outputs: [{ name: "delegateStatus", internalType: "bool", type: "bool" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "target", internalType: "address", type: "address" },
      { name: "status", internalType: "bool", type: "bool" }
    ],
    name: "updateDelegate",
    outputs: []
  }
];
var idRegistryABI = [
  { type: "error", inputs: [], name: "Has_Attested" },
  { type: "error", inputs: [], name: "Has_Id" },
  { type: "error", inputs: [], name: "Has_No_Id" },
  { type: "error", inputs: [], name: "Invalid_Signature" },
  { type: "error", inputs: [], name: "No_Active_Attestation" },
  { type: "error", inputs: [], name: "Not_Transfer_Initiator" },
  { type: "error", inputs: [], name: "Not_Transfer_Recipient" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "attestor",
        internalType: "address",
        type: "address",
        indexed: true
      }
    ],
    name: "Attest"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "backup",
        internalType: "address",
        type: "address",
        indexed: false
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false }
    ],
    name: "Register"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "attestor",
        internalType: "address",
        type: "address",
        indexed: true
      }
    ],
    name: "RevokeAttestation"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true }
    ],
    name: "TransferCancelled"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true }
    ],
    name: "TransferComplete"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true }
    ],
    name: "TransferInitiated"
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "acceptTransfer",
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "hash", internalType: "bytes32", type: "bytes32" },
      { name: "sig", internalType: "bytes", type: "bytes" },
      { name: "signerOverride", internalType: "address", type: "address" }
    ],
    name: "attest",
    outputs: []
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "attestedBy",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "attestedFor",
    outputs: [{ name: "", internalType: "address", type: "address" }]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "backupForId",
    outputs: [{ name: "", internalType: "address", type: "address" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "cancelTransfer",
    outputs: []
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "idCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "idOwnedBy",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "initiateTransfer",
    outputs: []
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "pendingTransfers",
    outputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" }
    ]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "backup", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" }
    ],
    name: "register",
    outputs: [{ name: "id", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "revokeAttestation",
    outputs: []
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "transferCountForId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "transferPendingForId",
    outputs: [
      {
        name: "",
        internalType: "struct IIdRegistry.PendingTransfer",
        type: "tuple",
        components: [
          { name: "from", internalType: "address", type: "address" },
          { name: "to", internalType: "address", type: "address" }
        ]
      }
    ]
  }
];
var nodeRegistryABI = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true
      },
      {
        name: "messageId",
        internalType: "uint256",
        type: "uint256",
        indexed: true
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false }
    ],
    name: "MessageNode"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true
      },
      {
        name: "nodeId",
        internalType: "uint256",
        type: "uint256",
        indexed: true
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false }
    ],
    name: "RegisterNode"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true
      },
      {
        name: "schema",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false }
    ],
    name: "RegisterSchema"
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "messageCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "messageNode",
    outputs: [{ name: "messageId", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "datas", internalType: "bytes[]", type: "bytes[]" }],
    name: "messageNodeBatch",
    outputs: [
      { name: "messageIds", internalType: "uint256[]", type: "uint256[]" }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "nodeCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "registerNode",
    outputs: [{ name: "nodeId", internalType: "uint256", type: "uint256" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "datas", internalType: "bytes[]", type: "bytes[]" }],
    name: "registerNodeBatch",
    outputs: [
      { name: "nodeIds", internalType: "uint256[]", type: "uint256[]" }
    ]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "registerSchema",
    outputs: [{ name: "schema", internalType: "bytes32", type: "bytes32" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "datas", internalType: "bytes[]", type: "bytes[]" }],
    name: "registerSchemaBatch",
    outputs: [
      { name: "schemas", internalType: "bytes32[]", type: "bytes32[]" }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "schemaCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }]
  }
];
var nodeRegistryTypesABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportCallType",
    outputs: [
      {
        name: "",
        internalType: "struct NodeRegistryTypes.Call",
        type: "tuple",
        components: [
          { name: "nodeId", internalType: "uint256", type: "uint256" },
          { name: "userId", internalType: "uint256", type: "uint256" },
          { name: "msgType", internalType: "uint256", type: "uint256" },
          { name: "msgBody", internalType: "bytes", type: "bytes" }
        ]
      }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportRegistrationType",
    outputs: [
      {
        name: "",
        internalType: "struct NodeRegistryTypes.Registration",
        type: "tuple",
        components: [
          { name: "schema", internalType: "bytes32", type: "bytes32" },
          { name: "userId", internalType: "uint256", type: "uint256" },
          { name: "msgType", internalType: "uint256", type: "uint256" },
          { name: "msgBody", internalType: "bytes", type: "bytes" }
        ]
      }
    ]
  }
];
var publicationMessageTypesABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "exportTypes",
    outputs: [
      {
        name: "",
        internalType: "struct PublicationMessageTypes.Uri_100",
        type: "tuple",
        components: [{ name: "uri", internalType: "string", type: "string" }]
      }
    ]
  }
];
var riverValidatorV1ABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_riverOperator", internalType: "address", type: "address" }
    ]
  },
  { type: "error", inputs: [], name: "Array_Length_Mismatch" },
  { type: "error", inputs: [], name: "Only_Operator" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true
      }
    ],
    name: "OperatorUpdated"
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "status", internalType: "bool", type: "bool", indexed: true }
    ],
    name: "Validate"
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "riverOperator",
    outputs: [{ name: "", internalType: "address", type: "address" }]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "updateOperator",
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "status", internalType: "bool", type: "bool" }
    ],
    name: "validate",
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ids", internalType: "uint256[]", type: "uint256[]" },
      { name: "statuses", internalType: "bool[]", type: "bool[]" }
    ],
    name: "validateBatch",
    outputs: []
  }
];

// nodeRegistry/decoders.ts
function decodeNodeRegistrationData({ data }) {
  try {
    const [decodedData] = (0, import_viem.decodeAbiParameters)(
      nodeRegistryTypesABI[1].outputs,
      data
    );
    return decodedData;
  } catch (error) {
    console.error("Failed to decode node registration data:", error);
    return null;
  }
}
function decodeAdminWithMembersData({
  msgType,
  msgBody
}) {
  try {
    const [decodedData] = (0, import_viem.decodeAbiParameters)(
      adminWithMembersABI[0].outputs,
      msgBody
    );
    return decodedData;
  } catch (error) {
    console.error("Failed to decode admin with members data:", error);
    return null;
  }
}
function decodeNodeCallData({ data }) {
  try {
    const [decodedData] = (0, import_viem.decodeAbiParameters)(
      nodeRegistryTypesABI[0].outputs,
      data
    );
    return decodedData;
  } catch (error) {
    console.error("Failed to decode node call data:", error);
    return null;
  }
}
function decodeMessagePublicationData({
  msgType,
  msgBody
}) {
  try {
    const [decodedData] = (0, import_viem.decodeAbiParameters)(
      publicationMessageTypesABI[0].outputs,
      msgBody
    );
    return decodedData;
  } catch (error) {
    console.error("Failed to decode message Publication data:", error);
    return null;
  }
}
function decodeMessageChannelData({
  msgType,
  msgBody
}) {
  try {
    const [chainId, id, target, hasId] = (0, import_viem.decodeAbiParameters)(
      channelMessageTypesABI[0].outputs[0].components[0].components,
      msgBody
    );
    return {
      chainId,
      id,
      target,
      hasId
    };
  } catch (error) {
    console.error("Failed to decode message Channel data:", error);
    return null;
  }
}

// nodeRegistry/types.ts
var nodeRegistrationData = [
  {
    name: "nodeRegisrationStruct",
    outputs: [
      {
        components: [
          {
            name: "userId",
            type: "uint256"
          },
          {
            name: "schema",
            type: "bytes32"
          },
          {
            name: "regType",
            type: "uint256"
          },
          {
            name: "regBody",
            type: "bytes"
          }
        ],
        name: "nodeRegistration",
        type: "tuple"
      }
    ]
  }
];

// nodeRegistry/filters.ts
function isValidNodeRegistration({
  sender,
  nodeId,
  data
}) {
  if (sender != operator)
    return false;
  return true;
}

// constants/nodeSchemas.ts
var publicationSchema = "0xF36F2F0432F99EA34A360F154CEA9D1FAD45C7319E27ADED55CC0D28D0924068";
var channelSchema = "0x08B83A3AFF9950D7F88522AC4A172BD8405BE30B0D3B416D42FD73C30AC27C9F";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adminWithMembersABI,
  channelMessageTypesABI,
  channelSchema,
  decodeAdminWithMembersData,
  decodeMessageChannelData,
  decodeMessagePublicationData,
  decodeNodeCallData,
  decodeNodeRegistrationData,
  delegateRegistry,
  delegateRegistryABI,
  entryPoint,
  idRegistry,
  idRegistryABI,
  isValidNodeRegistration,
  isValidSchemaRegistration,
  lightAccountFactory,
  nodeRegistrationData,
  nodeRegistry,
  nodeRegistryABI,
  nodeRegistryTypesABI,
  operator,
  publicationMessageTypesABI,
  publicationSchema,
  riverValidatorV1,
  riverValidatorV1ABI
});
