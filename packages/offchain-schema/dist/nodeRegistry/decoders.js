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

// nodeRegistry/decoders.ts
var decoders_exports = {};
__export(decoders_exports, {
  decodeNodeRegistrationData: () => decodeNodeRegistrationData
});
module.exports = __toCommonJS(decoders_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decodeNodeRegistrationData
});
