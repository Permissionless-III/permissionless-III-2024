import { useContext } from "react";
import { VoteTxContext } from "../contexts/VoteTxContext";

export function useVoteTx() {
  const context = useContext(VoteTxContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
