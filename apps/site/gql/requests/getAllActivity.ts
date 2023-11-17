import sdk from '../client';

export async function getAllActivity({ userId }: { userId: bigint }) {



    const response = await sdk.allActivity({
        userId: userId
    })

    const { channels, publications } = response


    return {
      channels: channels ?? [],
      publications: publications ?? [],
    }

}
