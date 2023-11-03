import { Hex, Hash } from 'viem';

declare function isValidSchemaRegistration({ sender, schema, data, }: {
    sender: Hex;
    schema: Hash;
    data: Hash;
}): boolean;

export { isValidSchemaRegistration };
