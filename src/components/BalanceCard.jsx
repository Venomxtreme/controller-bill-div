import {
  Text,
  View,
} from "react-native";

import {
  useTheme,
} from "../contexts/ThemeContext";

import {
  premiumCard,
} from "../styles/cardStyle";

export default function BalanceCard({
  saldo,
}) {

  const { theme } =
    useTheme();

  return (
    <View
      style={{
        ...premiumCard,

        backgroundColor:
          theme.card,

        borderColor:
          theme.border,

        marginBottom: 20,
      }}
    >

      <Text
        style={{
          color:
            theme.secondaryText,

          fontSize: 16,
        }}
      >
        Saldo Atual
      </Text>

      <Text
        style={{
          color: theme.text,

          fontSize: 34,

          fontWeight: "bold",

          marginTop: 10,
        }}
      >
        R$ {saldo.toFixed(2)}
      </Text>

    </View>
  );
}