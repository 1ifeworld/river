import { type Hex } from 'viem';

export function extractAddressFromListingId(str: string | Hex) {
    const parts = str.split('/');
    if (parts.length < 3) {
        throw new Error('Invalid format');
    }
    const address = parts[1];
    if (address.length !== 42 || !address.startsWith('0x')) {
        throw new Error('Invalid Ethereum address');
    }
    return address;
}
