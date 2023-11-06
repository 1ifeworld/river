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
} | null;
declare function decodeAdminWithMembersData({ msgType, msgBody, }: {
    msgType: bigint;
    msgBody: Hash;
}): {
    admin: bigint;
    members: readonly bigint[];
} | null;
declare function decodeNodeCallData({ data }: {
    data: Hash;
}): {
    nodeId: bigint;
    userId: bigint;
    msgType: bigint;
    msgBody: Hash;
} | null;
/***  PUBLICATION SPECIFIC ***/
declare function decodeMessagePublicationData({ msgType, msgBody, }: {
    msgType: bigint;
    msgBody: Hash;
}): {
    uri: string;
} | null;
/***  CHANNEL SPECIFIC ***/
declare function decodeMessageChannelData({ msgType, msgBody, }: {
    msgType: bigint;
    msgBody: Hash;
}): {
    chainId: bigint;
    id: bigint;
    target: Hex;
    hasId: boolean;
} | null;

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
    readonly name: "exportAdd_110Type";
    readonly outputs: readonly [{
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
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportRemove_120Type";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct ChannelMessageTypes.Remove_120";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "channelIndex";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "exportUri_100Type";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct ChannelMessageTypes.Uri_100";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "uri";
            readonly internalType: "string";
            readonly type: "string";
        }];
    }];
}];
declare const delegateRegistryABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_idRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Has_No_Id";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "nonce";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "target";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "status";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: true;
    }];
    readonly name: "Delegate";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "idDelegates";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "idRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract IdRegistry";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "target";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isDelegate";
    readonly outputs: readonly [{
        readonly name: "delegateStatus";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "target";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "status";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "updateDelegate";
    readonly outputs: readonly [];
}];
declare const idRegistryABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Has_Attested";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Has_Id";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Has_No_Id";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Invalid_Signature";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "No_Active_Attestation";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Not_Transfer_Initiator";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Not_Transfer_Recipient";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "attestor";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "Attest";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "backup";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "Register";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "attestor";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "RevokeAttestation";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "TransferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "TransferComplete";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "TransferInitiated";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "acceptTransfer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "sig";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "signerOverride";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "attest";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "attestedBy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "attestedFor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "backupForId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelTransfer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "idCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "idOwnedBy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "recipient";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "initiateTransfer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "pendingTransfers";
    readonly outputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "backup";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "register";
    readonly outputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "revokeAttestation";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferCountForId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferPendingForId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IIdRegistry.PendingTransfer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }];
    }];
}];
declare const nodeRegistryABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "messageId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "MessageNode";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "nodeId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "RegisterNode";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "schema";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: true;
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "RegisterSchema";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "messageCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "messageNode";
    readonly outputs: readonly [{
        readonly name: "messageId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "datas";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "messageNodeBatch";
    readonly outputs: readonly [{
        readonly name: "messageIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "nodeCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "registerNode";
    readonly outputs: readonly [{
        readonly name: "nodeId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "datas";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "registerNodeBatch";
    readonly outputs: readonly [{
        readonly name: "nodeIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "registerSchema";
    readonly outputs: readonly [{
        readonly name: "schema";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "datas";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "registerSchemaBatch";
    readonly outputs: readonly [{
        readonly name: "schemas";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "schemaCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
declare const riverValidatorV1ABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_riverOperator";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Array_Length_Mismatch";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Only_Operator";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OperatorUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "status";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: true;
    }];
    readonly name: "Validate";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "riverOperator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateOperator";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "status";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "validate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "ids";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "statuses";
        readonly internalType: "bool[]";
        readonly type: "bool[]";
    }];
    readonly name: "validateBatch";
    readonly outputs: readonly [];
}];

declare const idRegistry: Hex;
declare const delegateRegistry: Hex;
declare const nodeRegistry: Hex;
declare const riverValidatorV1: Hex;
declare const lightAccountFactory: Hex;
declare const entryPoint: Hex;
declare const operator: Hex;

declare const publicationSchema: Hash;
declare const channelSchema: Hash;

export { adminWithMembersABI, channelMessageTypesABI, channelSchema, decodeAdminWithMembersData, decodeMessageChannelData, decodeMessagePublicationData, decodeNodeCallData, decodeNodeRegistrationData, delegateRegistry, delegateRegistryABI, entryPoint, idRegistry, idRegistryABI, isValidNodeRegistration, isValidSchemaRegistration, lightAccountFactory, nodeRegistrationData, nodeRegistry, nodeRegistryABI, nodeRegistryTypesABI, operator, publicationMessageTypesABI, publicationSchema, riverValidatorV1, riverValidatorV1ABI };
