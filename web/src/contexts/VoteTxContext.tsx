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

export type Vote = {
  voteTxHash: string | null;
};

type VoteContextType = {
  vote: Vote;
  setVote: React.Dispatch<React.SetStateAction<Vote>>;
};

export const VoteTxContext = createContext<VoteContextType | undefined>(
  undefined
);

export function VoteTxProvider({ children }: { children: ReactNode }) {
  const [vote, setVote] = useState<Vote>({
    voteTxHash: null,
  });

  return (
    <VoteTxContext.Provider value={{ vote, setVote }}>
      {children}
    </VoteTxContext.Provider>
  );
}
