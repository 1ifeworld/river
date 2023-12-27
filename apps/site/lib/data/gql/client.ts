import { createClient } from './generated'

export const client = createClient({
  fetcher: (operation) => {
    return fetch(process.env.NEXT_PUBLIC_GRAPHQL_API as string, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There was an error with the fetch operation', error);
    });
  },
});
