import {
  Text,
  View,
} from "react-native";

import {
  useTheme,
} from "../hooks/useTheme";

export default function CategoryChart({
  data,
}) {

  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor:
          theme.card,

        padding: 20,

        borderRadius: 16,

        marginTop: 20,
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
        Gastos por Categoria
      </Text>

      {Object.entries(data).map(
        ([categoria, valor]) => (

          <View
            key={categoria}

            style={{
              marginBottom: 15,
            }}
          >

            <Text
              style={{
                fontSize: 16,
                color: theme.text,
              }}
            >
              {categoria}
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                marginTop: 5,
                color: theme.text,
              }}
            >
              R$ {valor.toFixed(2)}
            </Text>

          </View>
        )
      )}

    </View>
  );
}