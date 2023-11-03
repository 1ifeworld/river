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
  decodeNodeRegistrationData: () => decodeNodeRegistrationData,
  isValidNodeRegistration: () => isValidNodeRegistration,
  isValidSchemaRegistration: () => isValidSchemaRegistration,
  nodeRegistrationData: () => nodeRegistrationData
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

// nodeRegistry/decoders.ts
function decodeNodeRegistrationData({ data }) {
  const [decodedData] = (0, import_viem.decodeAbiParameters)(
    nodeRegistrationData[0].outputs,
    data
  );
  return decodedData;
}

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
  decodeNodeRegistrationData,
  isValidNodeRegistration,
  isValidSchemaRegistration,
  nodeRegistrationData
});
