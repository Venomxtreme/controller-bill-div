import {
  Alert,
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
  updateReceita,
} from "../../src/services/receitasService";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

export default function EditReceita() {

  const { theme } =
  useTheme();

  const params =
    useLocalSearchParams();

  const [titulo, setTitulo] =
    useState(
      String(params.titulo || "")
    );

  const [valor, setValor] =
    useState(
      String(params.valor || "")
    );

  const [categoria, setCategoria] =
    useState(
      String(params.categoria || "")
    );

  async function handleUpdate() {

    try {

      await updateReceita(
        String(params.id),

        {
          titulo,

          valor: Number(
            valor.replace(",", ".")
          ),

          categoria,
        }
      );

      Alert.alert(
        "Sucesso",
        "Receita atualizada"
      );

      router.back();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        error?.message ||
        "Erro ao atualizar"
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
        Editar Receita
      </Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor={
          theme.secondaryText
        }
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.card,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Valor"
        placeholderTextColor={
          theme.secondaryText
        }
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.card,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Categoria"
        placeholderTextColor={
          theme.secondaryText
        }
        value={categoria}
        onChangeText={setCategoria}
        style={{
          borderWidth: 1,
          borderColor:
            theme.border,

          backgroundColor:
            theme.card,

          color:
            theme.text,

          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          backgroundColor:
            "#2ee915",

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
)};