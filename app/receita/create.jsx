import { useState } from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  useAuth,
} from "../../src/contexts/AuthContext";

import {
  createReceita,
} from "../../src/services/receitasService";

import Toast from "react-native-toast-message";

import {
  formatDate,
} from "../../src/utils/date";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

export default function CreateReceita() {

  const { theme } =
    useTheme();

  const { user } =
    useAuth();

  const [titulo, setTitulo] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [
    dataRecebimento,
    setDataRecebimento,
  ] = useState(new Date());

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  async function handleCreate() {

    if (
      !titulo ||
      !valor ||
      !categoria
    ) {

      return Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "Preencha todos os campos",
      });
    }

    try {

      await createReceita({

        titulo,

        valor: Number(
          valor.replace(",", ".")
        ),

        categoria,

        dataRecebimento:
          dataRecebimento.toISOString(),

        userId: user?.uid,

        createdAt:
          new Date().toISOString(),
      });

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2:
          "Receita criada",
      });

      router.back();

    } catch (error) {

      console.log(error);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          error?.message ||
          "Erro ao criar receita",
      });
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

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.text,
        }}
      >
        Nova Receita
      </Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}

        style={{
          backgroundColor:
            theme.card,

          color: theme.text,

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
          backgroundColor:
            theme.card,

          color: theme.text,

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
          backgroundColor:
            theme.card,

          color: theme.text,

          padding: 15,

          borderRadius: 10,

          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={() =>
          setShowDatePicker(true)
        }

        style={{
          backgroundColor:
            theme.card,

          padding: 15,

          borderRadius: 10,

          marginBottom: 20,
        }}
      >

        <Text
          style={{
            color: theme.text,
          }}
        >
          Recebimento:{" "}
          {formatDate(
            dataRecebimento
          )}
        </Text>

      </TouchableOpacity>

      {showDatePicker && (

        <DateTimePicker
          value={dataRecebimento}
          mode="date"
          display="default"

          onChange={(
            event,
            selectedDate
          ) => {

            setShowDatePicker(false);

            if (selectedDate) {

              setDataRecebimento(
                selectedDate
              );
            }
          }}
        />
      )}

      <TouchableOpacity
        onPress={handleCreate}

        style={{
          backgroundColor:
            "#16a34a",

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
          Salvar Receita
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}

        style={{
          backgroundColor: "#6b7280",

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
  );
}