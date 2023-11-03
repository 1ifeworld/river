import { Hex, Hash } from 'viem';

declare function isValidSchemaRegistration({ sender, schema, data, }: {
    sender: Hex;
    schema: Hash;
    data: Hash;
}): boolean;

declare function decodeNodeRegistrationData({ data }: {
    data: Hash;
}): {
    userId: bigint;
    schema: Hash;
    regType: bigint;
    regBody: Hash;
};

declare const nodeRegistrationData: readonly [{
    readonly name: "nodeRegisrationStruct";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly name: "userId";
            readonly type: "uint256";
        }, {
            readonly name: "schema";
            readonly type: "bytes32";
        }, {
            readonly name: "regType";
            readonly type: "uint256";
        }, {
            readonly name: "regBody";
            readonly type: "bytes";
        }];
        readonly name: "nodeRegistration";
        readonly type: "tuple";
    }];
}];

declare function isValidNodeRegistration({ sender, nodeId, data, }: {
    sender: Hex;
    nodeId: bigint;
    data: Hash;
}): boolean;

export { decodeNodeRegistrationData, isValidNodeRegistration, isValidSchemaRegistration, nodeRegistrationData };
