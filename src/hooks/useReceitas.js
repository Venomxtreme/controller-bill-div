import { useEffect } from "react";

import { getReceitas } from "../services/receitasService";

import { useFinanceStore } from "../store/useFinanceStore";

export function useReceitas(userId) {
  const receitas =
    useFinanceStore((state) => state.receitas);

  const setReceitas =
    useFinanceStore(
      (state) => state.setReceitas
    );

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getReceitas(
      userId,
      setReceitas
    );

    return unsubscribe;
  }, [userId]);

  return { receitas };
}