export function getContasVencendo(despesas) {

  const hoje = new Date();

  const limite = new Date();

  limite.setDate(
    hoje.getDate() + 3
  );

  return despesas.filter((item) => {

    if (item.pago) return false;

    const vencimento =
      new Date(item.dataVencimento);

    return (
      vencimento >= hoje &&
      vencimento <= limite
    );
  });
}