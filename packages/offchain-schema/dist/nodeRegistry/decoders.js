import { decodeAbiParameters } from 'viem';
import { nodeRegistrationData } from './types';
export function decodeNodeRegistrationData({ data }) {
    const [decodedData] = decodeAbiParameters(nodeRegistrationData[0].outputs, data);
    return decodedData;
}
