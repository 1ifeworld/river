import sdk from '../client'
import { Hex } from 'viem';


export async function getUserIdByAddress(address: Hex) {
    try {
      // Make sure the address is provided
      if (!address) {
        throw new Error("Address is required");
      }
  
      const response = await sdk.getUser();
  
      const userId = response.idRegistrys[0].userId;
  
      return userId ? { userId } : null;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      throw error; 
    }
  }