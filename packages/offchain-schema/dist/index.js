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
  decodeNodeRegistrationData: () => decodeNodeRegistrationData,
  isValidNodeRegistration: () => isValidNodeRegistration,
  isValidSchemaRegistration: () => isValidSchemaRegistration,
  nodeRegistrationData: () => nodeRegistrationData,
  nodeRegistryTypesABI: () => nodeRegistryTypesABI,
  publicationMessageTypesABI: () => publicationMessageTypesABI
});
module.exports = __toCommonJS(offchain_schema_exports);

// constants/addresses.ts
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
    name: "exportTypes",
    outputs: [
      {
        name: "",
        internalType: "struct ChannelMessageTypes.Uri_100",
        type: "tuple",
        components: [{ name: "uri", internalType: "string", type: "string" }]
      },
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
      },
      {
        name: "",
        internalType: "struct ChannelMessageTypes.Remove_120",
        type: "tuple",
        components: [
          { name: "channelIndex", internalType: "uint256", type: "uint256" }
        ]
      }
    ]
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

// nodeRegistry/decoders.ts
function decodeNodeRegistrationData({ data }) {
  const [decodedData] = (0, import_viem.decodeAbiParameters)(
    nodeRegistryTypesABI[1].outputs,
    data
  );
  return decodedData;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adminWithMembersABI,
  channelMessageTypesABI,
  decodeNodeRegistrationData,
  isValidNodeRegistration,
  isValidSchemaRegistration,
  nodeRegistrationData,
  nodeRegistryTypesABI,
  publicationMessageTypesABI
});
