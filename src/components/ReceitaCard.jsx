import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useTheme,
} from "../hooks/useTheme";

export default function ReceitaCard({
  item,
  onDelete,
  onEdit,
}) {

  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor:
          theme.card,

        padding: 15,

        borderRadius: 10,

        marginBottom: 10,
      }}
    >

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.text,
        }}
      >
        {item.titulo}
      </Text>

      <Text
        style={{
          color: "green",
          marginTop: 5,
        }}
      >
        R$ {item.valor}
      </Text>

      <Text
        style={{
          marginTop: 5,
          color: theme.text,
        }}
      >
        {item.categoria}
      </Text>

      <TouchableOpacity
        onPress={() =>
          onDelete(item.id)
        }

        style={{
          marginTop: 10,
          backgroundColor: "red",
          padding: 10,
          borderRadius: 8,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Excluir
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          onEdit(item)
        }

        style={{
          marginTop: 10,
          backgroundColor: "#2563eb",
          padding: 10,
          borderRadius: 8,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Editar
        </Text>

      </TouchableOpacity>

    </View>
  );
}