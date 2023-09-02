import fetch from 'cross-fetch'

export interface IPFSData {
    name: string;
    description: string;
    image: string;
}

export default async function fetchIPFSData(ipfsLink: string): Promise<IPFSData | undefined> {
    // Convert IPFS link to HTTP link
    const httpLink = ipfsLink.replace('ipfs://', 'https://ipfs.io/ipfs/');
    try {
        const response = await fetch(httpLink);
        const data = await response.json();
        if ('name' in data && 'description' in data && 'image' in data) {
            return data;
        } else {
            return undefined
        }
    } catch (error) {
        return undefined
    }
}


