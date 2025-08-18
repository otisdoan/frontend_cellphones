/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { userApi } from "../utils/api/user.api";
import type { UserProps } from "../types/api/UserResponse";

export interface AuthContextType {
  user: UserProps | null;
  setUser: (payload: UserProps) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const value: AuthContextType = {
    user,
    setUser,
  };

  const getUser = async (id: number) => {
    try {
      const result = await userApi.getById(id);
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      getUser(Number(id));
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType | undefined =>
  useContext<AuthContextType | undefined>(AuthContext);
