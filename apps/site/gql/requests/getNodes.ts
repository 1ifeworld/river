import sdk from '../client'

export async function getNodes() {
    try {
      const response = await sdk.Nodes();
  
      const nodes = response?.nodes ?? [];
  
      return { nodes };
    } catch (error) {
      console.error('Error fetching nodes:', error);
      throw error; 
    }
  }