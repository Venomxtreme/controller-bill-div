import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useTheme,
} from "../hooks/useTheme";

export default function DespesaCard({
  item,
  onDelete,
  onTogglePaid,
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
          marginTop: 5,
          fontSize: 16,
          color: theme.text,
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
        Vence:
        {" "}
        {new Date(
          item.vencimento
        ).toLocaleDateString()}
      </Text>

      <Text
        style={{
          marginTop: 5,
          fontWeight: "bold",

          color: item.pago
            ? "green"
            : "red",
        }}
      >
        {item.pago
          ? "PAGO"
          : "PENDENTE"}
      </Text>

      <TouchableOpacity
        onPress={() =>
          onTogglePaid(
            item.id,
            !item.pago
          )
        }

        style={{
          backgroundColor:
            "#ffee00",

          padding: 10,

          borderRadius: 8,

          marginTop: 10,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          {item.pago
            ? "Marcar como pendente"
            : "Marcar como pago"}
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onEdit(item)}

        style={{
          backgroundColor: "#2563eb",
          padding: 10,
          borderRadius: 8,
          marginTop: 10,
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

      <TouchableOpacity
        onPress={() =>
          onDelete(item.id)
        }

        style={{
          backgroundColor: "red",

          padding: 10,

          borderRadius: 8,

          marginTop: 10,
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

    </View>
  );
}