import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../../src/contexts/AuthContext";

import {
  useTheme,
} from "../../src/hooks/useTheme";

import {
  useDespesas,
} from "../../src/hooks/useDespesas";

import DespesaCard from "../../src/components/DespesaCard";

import {
  deleteDespesa,
  updateDespesa,
} from "../../src/services/despesasService";

import { useState } from "react";

import Input from "../../src/components/Input";

import EmptyState from "../../src/components/EmptyState";



export default function Despesas() {

  const { theme } = useTheme();

  const [search, setSearch] =
  useState("");

  const { user } = useAuth();

  const { despesas } =
    useDespesas(user?.uid);

  const filteredDespesas =
  despesas.filter((item) =>
    item.titulo
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const [refreshing, setRefreshing] = useState(false);

  async function handleDelete(id) {

    Alert.alert(
      "Excluir",
      "Deseja excluir esta despesa?",

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

              await deleteDespesa(id);

              Alert.alert(
                "Sucesso",
                "Despesa removida"
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

  async function handleTogglePaid(
    id,
    pago
  ) {

    try {

      await updateDespesa(id, {
        pago,
      });

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );
    }
  }

  async function onRefresh() {
    setRefreshing(true);

    setTimeout(() => {

      setRefreshing(false);

    }, 1000);
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor:
          theme.background,
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
        Despesas
      </Text>

      <Input
        placeholder="Buscar despesa..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredDespesas}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (
          <DespesaCard
            item={item}
            onDelete={handleDelete}
            onTogglePaid={handleTogglePaid}
            onEdit={(item) =>
              router.push({
                pathname: "/despesa/[id]",
                params: {
                  id: item.id,
                  titulo: item.titulo,
                  valor: String(item.valor),
                  categoria: item.categoria,
                  pago: String(item.pago),
                },
              })
            }
          />
        )}

        ListEmptyComponent={
          <EmptyState
            message="Nenhuma despesa encontrada"
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
            "/despesa/create"
          )
        }

        style={{

          position: "absolute",

          right: 20,

          bottom: 85,

          backgroundColor:
            theme.primary2,

          width: 70,

          height: 70,

          borderRadius: 35,

          justifyContent: "center",

          alignItems: "center",

          shadowColor:
            theme.primary2,

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