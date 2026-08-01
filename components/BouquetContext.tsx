"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type BouquetState = {
  /** How many memory flowers she has scrolled past. */
  collected: number;
  collect: (count: number) => void;
  /** True once the closing section is on screen — the corner bouquet steps aside. */
  finale: boolean;
  setFinale: (value: boolean) => void;
};

const BouquetCtx = createContext<BouquetState | null>(null);

export function BouquetProvider({ children }: { children: React.ReactNode }) {
  const [collected, setCollected] = useState(0);
  const [finale, setFinale] = useState(false);

  // Only ever grows — scrolling back up shouldn't take her flowers away.
  const collect = useCallback((count: number) => {
    setCollected((current) => (count > current ? count : current));
  }, []);

  const value = useMemo(
    () => ({ collected, collect, finale, setFinale }),
    [collected, collect, finale],
  );

  return <BouquetCtx.Provider value={value}>{children}</BouquetCtx.Provider>;
}

export function useBouquet() {
  const ctx = useContext(BouquetCtx);
  if (!ctx) throw new Error("useBouquet must be used inside <BouquetProvider>");
  return ctx;
}
