import fetch from 'cross-fetch'

export default async function fetchIPFSData(ipfsLink: string): Promise<any> {
    // Convert IPFS link to HTTP link
    const httpLink = ipfsLink.replace('ipfs://', 'https://ipfs.io/ipfs/');

    try {
        const response = await fetch(httpLink);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from IPFS:', error);
        return null;
    }
}



