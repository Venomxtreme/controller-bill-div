import {
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

import * as Print from "expo-print";

import * as Sharing from "expo-sharing";

import {
  useAuth,
} from "../../src/contexts/AuthContext";

import {
  useReceitas,
} from "../../src/hooks/useReceitas";

import {
  useDespesas,
} from "../../src/hooks/useDespesas";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

import TransactionItem from "../../src/components/TransactionItem";

import Button from "../../src/components/Button";

export default function Historico() {

  const { theme } =
    useTheme();

  const { user } =
    useAuth();

  const { receitas } =
    useReceitas(user?.uid);

  const { despesas } =
    useDespesas(user?.uid);

  const [search, setSearch] =
    useState("");

  const [loadingPdf, setLoadingPdf] =
    useState(false)

  const transacoes = [

    ...receitas.map(
      (item) => ({
        ...item,
        type: "receita",
      })
    ),

    ...despesas.map(
      (item) => ({
        ...item,
        type: "despesa",
      })
    ),
  ];

  const filtradas =
    transacoes.filter(
      (item) =>

        item.titulo
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  async function generatePDF() {

  if (loadingPdf) return;

  try {

    setLoadingPdf(true);

    const html = `
      <html>
        <body>

          <h1>
            Relatório Financeiro
          </h1>

          <h2>
            Receitas
          </h2>

          <ul>
            ${receitas.map((item) => `
              <li>
                ${item.titulo}
                - R$ ${item.valor}
              </li>
            `).join("")}
          </ul>

          <h2>
            Despesas
          </h2>

          <ul>
            ${despesas.map((item) => `
              <li>
                ${item.titulo}
                - R$ ${item.valor}
              </li>
            `).join("")}
          </ul>

        </body>
      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
      });

    await Sharing.shareAsync(uri);

  } catch (error) {

    console.log(error);

  } finally {

    setLoadingPdf(false);
  }
}

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          theme.background,
      }}

      contentContainerStyle={{
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.text,
        }}
      >
        Histórico
      </Text>

      <Button
        title={
          loadingPdf
            ? "Gerando PDF..."
            : "Gerar PDF"
        }

        loading={loadingPdf}

        onPress={generatePDF}
      />

      <View
        style={{
          height: 20,
        }}
      />

      <TextInput
        placeholder=
          "Pesquisar"

        placeholderTextColor="#999"

        value={search}

        onChangeText={setSearch}

        style={{
          backgroundColor:
            theme.card,

          color: theme.text,

          padding: 15,

          borderRadius: 12,

          marginBottom: 20,
        }}
      />

      {filtradas.map((item) => (

        <TransactionItem
          key={item.id}
          item={item}
          type={item.type}
        />
      ))}

    </ScrollView>
  );
}