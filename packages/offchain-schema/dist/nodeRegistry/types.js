export const nodeRegistrationData = [
    {
        name: 'nodeRegisrationStruct',
        outputs: [
            {
                components: [
                    {
                        name: 'userId',
                        type: 'uint256',
                    },
                    {
                        name: 'schema',
                        type: 'bytes32',
                    },
                    {
                        name: 'regType',
                        type: 'uint256',
                    },
                    {
                        name: 'regBody',
                        type: 'bytes',
                    },
                ],
                name: 'nodeRegistration',
                type: 'tuple',
            },
        ],
    },
];
