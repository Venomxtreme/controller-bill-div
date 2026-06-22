import {
  Text,
  View,
} from "react-native";

import {
  useTheme,
} from "../hooks/useTheme";

export default function EmptyState({
  message,
}) {

  const { theme } =
    useTheme();

  return (
    <View
      style={{
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Text
        style={{
          fontSize: 16,
          color: theme.text,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        {message}
      </Text>

    </View>
  );
}