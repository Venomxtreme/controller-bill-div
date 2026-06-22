import {
    Text,
    View,
} from "react-native";

import {
    useTheme,
} from "../hooks/useTheme";

export default function MonthlySummary({
  receitas,
  despesas,
}) {

  const { theme } =
    useTheme();

  const totalReceitas =
    receitas.reduce(
      (total, item) =>
        total + Number(item.valor),
      0
    );

  const totalDespesas =
    despesas.reduce(
      (total, item) =>
        total + Number(item.valor),
      0
    );

  const saldo =
    totalReceitas -
    totalDespesas;

  return (
    <View
      style={{
        backgroundColor:
          theme.card,

        padding: 20,

        borderRadius: 20,

        marginBottom: 20,
      }}
    >

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
          color: theme.text,
        }}
      >
        Resumo do Mês
      </Text>

      <Text
        style={{
          color: "#16a34a",
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        Receitas: R$ {totalReceitas.toFixed(2)}
      </Text>

      <Text
        style={{
          color: "#dc2626",
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        Despesas: R$ {totalDespesas.toFixed(2)}
      </Text>

      <Text
        style={{
          color:
            saldo >= 0
              ? "#16a34a"
              : "#dc2626",

          fontSize: 18,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Saldo: R$ {saldo.toFixed(2)}
      </Text>

    </View>
  );
}