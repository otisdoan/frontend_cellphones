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
  login: boolean;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [login, setLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const value: AuthContextType = {
    user,
    setUser,
    login,
    loading,
  };

  const getUser = async () => {
    try {
      const result = await userApi.getById();
      setUser(result.data);
      setLogin(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType | undefined =>
  useContext<AuthContextType | undefined>(AuthContext);
