import { Hex, Hash } from 'viem';

declare function isValidSchemaRegistration({ sender, schema, data, }: {
    sender: Hex;
    schema: Hash;
    data: Hash;
}): boolean;

declare function decodeNodeRegistrationData({ data }: {
    data: Hash;
}): {
    schema: Hash;
    userId: bigint;
    msgType: bigint;
    msgBody: Hash;
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

declare const adminWithMembersABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportInitialize_100Type";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct AdminWithMembers.Initialize_100";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "admin";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "members";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportUpdate_200Type";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct AdminWithMembers.Update_200";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "admin";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "members";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "roles";
            readonly internalType: "uint8[]";
            readonly type: "uint8[]";
        }];
    }];
}];
declare const channelMessageTypesABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportTypes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct ChannelMessageTypes.Uri_100";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "uri";
            readonly internalType: "string";
            readonly type: "string";
        }];
    }, {
        readonly name: "";
        readonly internalType: "struct ChannelMessageTypes.Add_110";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "pointer";
            readonly internalType: "struct ChannelMessageTypes.CustomParam_Pointer";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "chainId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "id";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "target";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "hasId";
                readonly internalType: "bool";
                readonly type: "bool";
            }];
        }];
    }, {
        readonly name: "";
        readonly internalType: "struct ChannelMessageTypes.Remove_120";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "channelIndex";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}];
declare const nodeRegistryTypesABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportCallType";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct NodeRegistryTypes.Call";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "nodeId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "userId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "msgType";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "msgBody";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportRegistrationType";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct NodeRegistryTypes.Registration";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "schema";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "userId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "msgType";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "msgBody";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}];
declare const publicationMessageTypesABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportTypes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct PublicationMessageTypes.Uri_100";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "uri";
            readonly internalType: "string";
            readonly type: "string";
        }];
    }];
}];

export { adminWithMembersABI, channelMessageTypesABI, decodeNodeRegistrationData, isValidNodeRegistration, isValidSchemaRegistration, nodeRegistrationData, nodeRegistryTypesABI, publicationMessageTypesABI };
