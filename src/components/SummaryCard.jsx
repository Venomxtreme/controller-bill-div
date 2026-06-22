import {
  Text,
  View,
} from "react-native";

import {
  premiumCard,
} from "../styles/cardStyle";

import {
  useTheme,
} from "../contexts/ThemeContext";

export default function SummaryCard({
  title,
  value,
  color,
}) {

  const { theme } =
    useTheme();

  return (
    <View
      style={{
        ...premiumCard,

        flex: 1,

        backgroundColor:
          theme.card,

        borderColor:
          theme.border,

        margin: 5,
      }}
    >

      <Text
        style={{
          color:
            theme.secondaryText,

          fontSize: 15,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color,

          fontSize: 24,

          fontWeight: "bold",

          marginTop: 10,
        }}
      >
        R$ {value.toFixed(2)}
      </Text>

    </View>
  );
}