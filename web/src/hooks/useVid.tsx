import { useContext } from "react";
import { VidContext } from "@/contexts/VidContext";

export function useVid() {
  const context = useContext(VidContext);
  if (context === undefined) {
    throw new Error("useVid must be used within a VidProvider");
  }
  return context;
}
