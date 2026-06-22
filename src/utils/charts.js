export function getFinanceChartData(
  receitas,
  despesas
) {
  const receitasTotal = receitas.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  const despesasTotal = despesas.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  return {
    labels: ["Receitas", "Despesas"],

    datasets: [
      {
        data: [
          receitasTotal,
          despesasTotal,
        ],
      },
    ],
  };
}

export function getCategoryTotals(
  despesas
) {
  const categories = {};

  despesas.forEach((item) => {
    if (!categories[item.categoria]) {
      categories[item.categoria] = 0;
    }

    categories[item.categoria] += item.valor;
  });

  return categories;
}