import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useAccount, useAccountEffect } from "wagmi";

type Auth = {
  isVerified: boolean;
  id: string | null;
};

type AuthContextType = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    isVerified: false,
    id: null,
  });

  useAccountEffect({
    onDisconnect() {
      setAuth({
        isVerified: false,
        id: null,
      });
    },
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
