import type { NextApiRequest, NextApiResponse } from 'next';
import { muxClient } from '@/config/muxClient'
import { isVideo } from 'lib/isContent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === 'POST') {
    const { assetEndpointForMux, contentType } = req.body

    try {
      const muxAsset = await muxClient.Video.Assets.create({
        input: assetEndpointForMux,
        playback_policy: 'public',
        ...(isVideo({ mimeType: contentType }) && {
          encoding_tier: 'baseline',
        }),
      });

      res.status(200).json(muxAsset);
    } catch (error) {
      console.error('Error creating Mux asset:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
