export function calculateTotalReceitas(
  receitas
) {

  return receitas.reduce(
    (total, item) => {

      return (
        total +
        Number(item.valor || 0)
      );
    },

    0
  );
}

export function calculateTotalDespesas(
  despesas
) {

  return despesas.reduce(
    (total, item) => {

      return (
        total +
        Number(item.valor || 0)
      );
    },

    0
  );
}

export function calculateSaldo(
  receitas,
  despesas
) {

  const receitasTotal =
    calculateTotalReceitas(
      receitas
    );

  const despesasTotal =
    calculateTotalDespesas(
      despesas
    );

  return (
    receitasTotal -
    despesasTotal
  );
}