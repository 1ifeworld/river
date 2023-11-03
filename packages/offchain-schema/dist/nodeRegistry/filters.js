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

// nodeRegistry/filters.ts
var filters_exports = {};
__export(filters_exports, {
  isValidNodeRegistration: () => isValidNodeRegistration
});
module.exports = __toCommonJS(filters_exports);

// constants/addresses.ts
var operator = "0x004991c3bbcF3dd0596292C80351798965070D75";

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
  isValidNodeRegistration
});
