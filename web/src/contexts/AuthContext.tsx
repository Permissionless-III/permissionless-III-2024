import { REGISTRY_CONTRACT_CONFIG } from "@/constants/config";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  useAccount,
  useAccountEffect,
  useReadContract,
  useWriteContract,
} from "wagmi";

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

  const { data: registeredId, error: registeredIdError } = useReadContract({
    ...REGISTRY_CONTRACT_CONFIG,
    functionName: "registeredVoters",
    args: auth?.id ? [auth.id] : undefined,
  });

  console.log("auth.id", auth.id);
  console.log("registeredIdError", registeredIdError);
  console.log("registeredId", registeredId);

  const {
    writeContract,
    data: hash,
    isSuccess,
    isPending,
    isError,
    error,
  } = useWriteContract();

  useEffect(() => {
    if (registeredId?.[1] === "") {
      console.log("registering voter");
      writeContract({
        ...REGISTRY_CONTRACT_CONFIG,
        functionName: "register",
        args: [auth.id as string],
      });
    }
    if (registeredId?.[1]) {
      console.log("voter already registered");
    }
  }, [registeredId]);

  console.log("register hash", hash);
  console.log("register isPending", isPending);
  console.log("register error", error);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
