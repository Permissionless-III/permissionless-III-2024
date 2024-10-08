import React, { createContext, useState, useContext, ReactNode } from "react";

type VidContextType = {
  vid: string | null;
  setVid: (vid: string | null) => void;
};

export const VidContext = createContext<VidContextType | undefined>(undefined);

export function VidProvider({ children }: { children: ReactNode }) {
  const [vid, setVid] = useState<string | null>(null);

  return (
    <VidContext.Provider value={{ vid, setVid }}>
      {children}
    </VidContext.Provider>
  );
}
