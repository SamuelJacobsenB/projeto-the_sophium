import React, { createContext, useCallback, useEffect, useState } from "react";

import { api } from "../../services";
import type { User } from "../../types";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  findUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const findUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>("/api/v1/user/own");
      console.log(data);
      setUser(data);
    } catch {
      console.log("user not authenticated");
    }
  }, []);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <UserContext.Provider value={{ user, setUser, findUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
