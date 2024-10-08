import { CHAIN_ID, REGISTRY_CONTRACT_CONFIG } from "@/constants/config";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  useAccountEffect,
  useReadContract,
  useWriteContract,
  useChainId,
  useSwitchChain,
} from "wagmi";

export type Auth = {
  isVerified: boolean;
  isRegistered: boolean;
  id: string | null;
};

type AuthContextType = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    isVerified: false,
    isRegistered: false,
    id: null,
  });
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isCorrectChain = chainId === CHAIN_ID;

  const switchToCorrectChain = useCallback(async () => {
    try {
      await switchChain({ chainId: CHAIN_ID });
    } catch (err) {
      console.error("Failed to switch network");
    }
  }, [switchChain]);

  useEffect(() => {
    if (!isCorrectChain) {
      switchToCorrectChain();
    }
  }, [isCorrectChain, switchToCorrectChain]);

  useAccountEffect({
    onDisconnect() {
      setAuth({
        isVerified: false,
        isRegistered: false,
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
    isSuccess: registerSuccess,
    isPending,
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
      setAuth(prev => ({ ...prev, isRegistered: true }));
      console.log("voter already registered");
    }
  }, [registeredId]);

  useEffect(() => {
    if (registerSuccess) setAuth(prev => ({ ...prev, isRegistered: true }));
  }, [registerSuccess]);

  console.log("register hash", hash);
  console.log("register isPending", isPending);
  console.log("register isSuccess", registerSuccess);
  console.log("register error", error);
  console.log("isRegistered", auth.isRegistered);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
