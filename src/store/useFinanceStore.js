import { create } from "zustand";

export const useFinanceStore = create(
  (set) => ({
    receitas: [],
    despesas: [],

    setReceitas: (receitas) =>
      set({ receitas }),

    setDespesas: (despesas) =>
      set({ despesas }),
  })
);