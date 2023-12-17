import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { getUsername } from "@/lib";
import { getAllUserIds } from "@/gql";

interface UsernamesState {
  [id: string]: string | null;
}

const UsernameContext = createContext<UsernamesState | undefined>(undefined);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [usernames, setUsernames] = useState<UsernamesState>({});

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        // Fetch all user IDs first
        const { userIds } = await getAllUserIds();

        if (!userIds || userIds.length === 0) {
          console.error("No user IDs found");
          return;
        }

        // Extract just the id values from the userIds array
        const ids = userIds.map((user) => user.id);

        // Fetch usernames for all user IDs
        const promises = ids.map((id) => getUsername({ id }));
        const results = await Promise.all(promises);

        // Construct a map of id to username
        const usernamesMap = results.reduce((acc, username, index) => {
          const id = ids[index];
          if (id) {
            acc[id] = username;
          }
          return acc;
        }, {});

        setUsernames(usernamesMap);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <UsernameContext.Provider value={usernames}>
      {children}
    </UsernameContext.Provider>
  );
};

export function useUsernames(ids: string[]) {
  const usernames = useContext(UsernameContext);
  if (usernames === undefined) {
    throw new Error("useUsernames must be used within a UsernameProvider");
  }

  // Filter and return usernames for the given ids
  const usernamesForIds = ids.reduce<UsernamesState>((acc, id) => {
    acc[id] = usernames[id] || "Loading..."; // Replace 'Loading...' with your preferred default/fallback value
    return acc;
  }, {});

  return usernamesForIds;
}

// Usage in your application
// <UsernameProvider>{/* rest of your app */}</UsernameProvider>
