import {
  Alert,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  useState,
} from "react";

import {
  updateDespesa,
} from "../../src/services/despesasService";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

export default function EditDespesa() {

  const { theme } =
  useTheme();

  const params =
    useLocalSearchParams();

  const [titulo, setTitulo] =
    useState(params.titulo);

  const [valor, setValor] =
    useState(
      String(params.valor)
    );

  const [categoria, setCategoria] =
    useState(params.categoria);

  const [pago, setPago] =
    useState(
      params.pago === "true"
    );

  async function handleUpdate() {

    try {

      await updateDespesa(
        params.id,

        {
          titulo,

          valor: Number(
            valor.replace(",", ".")
          ),

          categoria,

          pago,
        }
      );

      Alert.alert(
        "Sucesso",
        "Despesa atualizada"
      );

      router.back();

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );
    }
  }

  return (
  <View
    style={{
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor:
        theme.background,
    }}
  >

    <View
      style={{
        backgroundColor:
          theme.card,

        borderRadius: 20,

        padding: 20,

        borderWidth: 1,

        borderColor:
          theme.border,
      }}
    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.text,
        }}
      >
        Editar Despesa
      </Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.background,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.background,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Categoria"
        placeholderTextColor="#999"
        value={categoria}
        onChangeText={setCategoria}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.background,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent:
            "space-between",

          marginBottom: 20,
        }}
      >

        <Text
          style={{
            color: theme.text,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Pago?
        </Text>

        <Switch
          value={pago}
          onValueChange={setPago}
        />

      </View>

      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          backgroundColor:
            "#dc2626",

          padding: 15,

          borderRadius: 10,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Salvar Alterações
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor:
            "#6b7280",

          padding: 15,

          borderRadius: 10,

          marginTop: 10,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Cancelar
        </Text>

      </TouchableOpacity>

    </View>

  </View>
);
}