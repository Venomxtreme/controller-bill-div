import { MotiView } from "moti";
import { Text } from "react-native";
import {
  useTheme,
} from "../hooks/useTheme";

export default function TransactionItem({
  item,
  type,
}) {
  const isReceita = type === "receita";

  const { theme } = useTheme();

  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: 20,
      }}

      animate={{
        opacity: 1,
        translateY: 0,
      }}

      transition={{
        type: "timing",
        duration: 500,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.text,
        }}
      >
        {item.titulo}
      </Text>

      <Text
        style={{
          marginTop: 5,
          color: isReceita
            ? "#16a34a"
            : "#dc2626",
        }}
      >
        {isReceita ? "+" : "-"} R$ {item.valor}
      </Text>

      <Text
        style={{
          marginTop: 5,
          color: theme.text,
        }}
      >
        {item.categoria}
      </Text>
    </MotiView>
  );
}