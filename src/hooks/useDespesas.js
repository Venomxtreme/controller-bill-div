import { useEffect } from "react";

import { getDespesas } from "../services/despesasService";

import { useFinanceStore } from "../store/useFinanceStore";

export function useDespesas(userId) {
  const despesas =
    useFinanceStore((state) => state.despesas);

  const setDespesas =
    useFinanceStore(
      (state) => state.setDespesas
    );

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getDespesas(
      userId,
      setDespesas
    );

    return unsubscribe;
  }, [userId]);

  return { despesas };
}