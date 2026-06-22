import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../../src/contexts/AuthContext";

import { useReceitas } from "../../src/hooks/useReceitas";

import ReceitaCard from "../../src/components/ReceitaCard";

import { removeReceita } from "../../src/services/receitasService";

import { useState } from "react";

import Input from "../../src/components/Input";

import EmptyState from "../../src/components/EmptyState";

import {
  useTheme,
} from "../../src/hooks/useTheme";

import {
  RefreshControl,
} from "react-native";

export default function Receitas() {

  const { theme } = useTheme();

  const [search, setSearch] = useState("");

  const { user } = useAuth();

  const { receitas } = useReceitas(user?.uid);

  const [refreshing, setRefreshing] = useState(false);

  const [categoriaFiltro, setCategoriaFiltro] =
  useState("");

  const [sortBy, setSortBy] =
  useState("recentes");

  async function handleDelete(id) {

  Alert.alert(
    "Excluir",
    "Deseja excluir esta receita?",

    [
      {
        text: "Cancelar",
        style: "cancel",
      },

      {
        text: "Excluir",

        style: "destructive",

        onPress: async () => {

          try {

            await removeReceita(id);

            Alert.alert(
              "Sucesso",
              "Receita removida"
            );

          } catch (error) {

            Alert.alert(
              "Erro",
              error.message
            );
          }
        },
      },
    ]
  );
}

  function handleEdit(item) {

  router.push({

    pathname: "/receita/[id]",

    params: {
      id: item.id,
      titulo: item.titulo,
      valor: String(item.valor),
      categoria: item.categoria,
    },
  });
}


  async function onRefresh() {
    setRefreshing(true);

    setTimeout(() => {

      setRefreshing(false);

    }, 1000);
  }

  const filteredReceitas =
  receitas
    .filter((item) => {

      const matchesSearch =
        item.titulo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategoria =

        categoriaFiltro === ""
          ? true
          : item.categoria ===
            categoriaFiltro;

      return (
        matchesSearch &&
        matchesCategoria
      );
    })

    .sort((a, b) => {

      if (
        sortBy === "maior"
      ) {

        return (
          Number(b.valor) -
          Number(a.valor)
        );
      }

      if (
        sortBy === "menor"
      ) {

        return (
          Number(a.valor) -
          Number(b.valor)
        );
      }

      if (
        sortBy === "antigas"
      ) {

        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );
      }

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    });

  return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme.background,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
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
          Receitas
        </Text>

        <Input
          placeholder="Buscar receita..."
          value={search}
          onChangeText={setSearch}
        />

        <Input
          placeholder="Filtrar categoria..."
          value={categoriaFiltro}
          onChangeText={setCategoriaFiltro}
        />

        <Input
          placeholder="Ordenar: recentes | antigas | maior | menor"
          value={sortBy}
          onChangeText={setSortBy}
        />

        <FlatList
          data={filteredReceitas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReceitaCard
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}

          ListEmptyComponent={
            <EmptyState
              message="Nenhuma receita encontrada"
            />
          }

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />

        <TouchableOpacity

          activeOpacity={0.8}

          onPress={() =>
            router.push(
              "/receita/create"
            )
          }

          style={{

            position: "absolute",

            right: 20,

            bottom: 85,

            backgroundColor:
              theme.primary,

            width: 70,

            height: 70,

            borderRadius: 35,

            justifyContent: "center",

            alignItems: "center",

            shadowColor:
              theme.primary,

            shadowOpacity: 0.5,

            shadowRadius: 12,

            elevation: 12,
          }}
        >

          <Text
            style={{
              color: "#fff",

              fontSize: 34,

              fontWeight: "bold",
            }}
          >
            +
          </Text>

        </TouchableOpacity>
      </View>
  );
}