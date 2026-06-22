import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import "react-native-reanimated";

import { useAuth } from "../../src/contexts/AuthContext";

import { useReceitas } from "../../src/hooks/useReceitas";

import { useDespesas } from "../../src/hooks/useDespesas";

import {
  premiumCard,
} from "../../src/styles/cardStyle";

import BalanceCard from "../../src/components/BalanceCard";

import SummaryCard from "../../src/components/SummaryCard";

import TransactionItem from "../../src/components/TransactionItem";

import FinanceChart from "../../src/components/FinanceChart";

import CategoryChart from "../../src/components/CategoryChart";

import MonthlySummary from "../../src/components/MonthlySummary";

import PremiumCard from "../../src/components/PremiumCard";

import { useTheme } from "../../src/contexts/ThemeContext";

import {
  getCategoryTotals,
  getFinanceChartData,
} from "../../src/utils/charts";

import {
  calculateSaldo,
  calculateTotalDespesas,
  calculateTotalReceitas,
} from "../../src/utils/finance";

import {
  loadMeta,
  saveMeta,
} from "../../src/services/metaService";

import {
  getContasVencendo,
} from "../../src/utils/notifications";

export default function Home() {

  const { theme } =
    useTheme();

  const { user } =
    useAuth();

  const { receitas } =
    useReceitas(user?.uid);

  const { despesas } =
    useDespesas(user?.uid);

  const [refreshing, setRefreshing] =
    useState(false);


  const [meta, setMeta] =
    useState(2000);

    useEffect(() => {

      if (!user?.uid) return;

      loadUserMeta();

    }, [user]);

  const contasVencendo =
  getContasVencendo(
    despesas
  );

    async function loadUserMeta() {

      try {

        const valor =
          await loadMeta(
            user.uid
          );

        setMeta(valor);

      } catch (error) {

        console.log(error);
      }
    }

    async function handleMetaChange(
      text
    ) {

      const valor =
        Number(
          text.replace(",", ".")
        ) || 0;

      setMeta(valor);

      try {

        await saveMeta(
          user.uid,
          valor
        );

      } catch (error) {

        console.log(error);
      }
    }

  const totalReceitas =
  calculateTotalReceitas(
    receitas
  );

const totalDespesas =
  calculateTotalDespesas(
    despesas
  );

const saldo =
  calculateSaldo(
    receitas,
    despesas
  );

  const progressoMeta =
    meta > 0
      ? Math.min(
          (saldo / meta) * 100,
          100
        )
      : 0;

  const ultimasReceitas =
    receitas
      .slice(0, 3);

  const proximasDespesas =
    despesas
      .filter(
        (item) => !item.pago
      )
      .slice(0, 3);

  const despesasPendentes =
    despesas.filter(
      (item) => !item.pago
    );

  const financeChartData =
    getFinanceChartData(
      receitas,
      despesas
    );

  const categoryData =
    getCategoryTotals(
      despesas
    ) || [];

  const categoriaMaisCara =
    Array.isArray(categoryData)
      ? [...categoryData].sort(
          (a, b) =>
            b.total - a.total
        )[0]
      : null;

  async function onRefresh() {

    setRefreshing(true);

    setTimeout(() => {

      setRefreshing(false);

    }, 1000);
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
        paddingBottom: 120,
      }}

      showsVerticalScrollIndicator={
        false
      }

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 5,
          color: theme.text,
        }}
      >
        Olá, {user?.email?.split("@")[0]} 👋
      </Text>

      <Text
        style={{
          fontSize: 18,

          color:
            theme.secondaryText,

          marginBottom: 25,
        }}
      >
        Controller Bill Div
      </Text>

      <PremiumCard delay={100}>

        <BalanceCard
          saldo={saldo}
        />

        {
          contasVencendo.length > 0 && (

            <View
              style={{
                ...premiumCard,

                backgroundColor:
                  "#fb923c",

                borderColor:
                  "#fb923c",

                marginTop: 20,
              }}
            >

              <Text
                style={{
                  color: "#fff",

                  fontWeight: "bold",

                  fontSize: 16,
                }}
              >
                ⚠️ Você possui{" "}
                {contasVencendo.length}
                {" "}contas vencendo nos próximos 3 dias
              </Text>

            </View>
          )
        }

      </PremiumCard>

      {despesasPendentes.length > 0 && (

        <View
          style={{
            ...premiumCard,

            backgroundColor:
              "#facc15",

            borderColor:
              "#facc15",

            marginBottom: 20,
          }}
        >

          <Text
            style={{
              fontWeight: "bold",

              fontSize: 16,
            }}
          >
            Você possui{" "}

            {
              despesasPendentes.length
            }

            {" "}despesas pendentes
          </Text>

        </View>
      )}

      <MonthlySummary
        receitas={receitas}
        despesas={despesas}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 10,
        }}
      >

        <PremiumCard 
          delay={200}
          style={{ flex: 1 }}
        >

          <SummaryCard
            title="Receitas"
            value={totalReceitas}
            color="#22c55e"
          />

        </PremiumCard>

        <PremiumCard 
          delay={250}
          style={{ flex: 1 }}
        >

          <SummaryCard
            title="Despesas"
            value={totalDespesas}
            color="#ef4444"
          />

        </PremiumCard>

      </View>

      <FinanceChart
        data={financeChartData}
      />

      <CategoryChart
        data={categoryData}
      />

      {categoriaMaisCara && (

        <PremiumCard delay={300}>

          <View
            style={{
              ...premiumCard,

              backgroundColor:
                theme.card,

              borderColor:
                theme.border,

              marginTop: 20,
            }}
          >

            <Text
              style={{
                fontSize: 22,

                fontWeight: "bold",

                color: theme.text,

                marginBottom: 12,
              }}
            >
              IA Financeira 🤖
            </Text>

            <Text
              style={{
                color:
                  theme.secondaryText,

                lineHeight: 24,

                fontSize: 15,
              }}
            >
              Você gastou mais com{" "}

              <Text
                style={{
                  color:
                    theme.primary,

                  fontWeight: "bold",
                }}
              >
                {
                  categoriaMaisCara.categoria
                }
              </Text>

              {" "}este período.

              Considere reduzir
              gastos nessa categoria.
            </Text>

          </View>

        </PremiumCard>
      )}

      

      <PremiumCard delay={400}>

        <View
          style={{
            ...premiumCard,

            backgroundColor:
              theme.card,

            borderColor:
              theme.border,

            marginTop: 20,
          }}
        >

          <Text
            style={{
              fontSize: 22,

              fontWeight: "bold",

              color: theme.text,

              marginBottom: 15,
            }}
          >
            Meta Financeira 🎯
          </Text>

          <Text
            style={{
              fontSize: 18,

              fontWeight: "bold",

              color: theme.text,

              marginBottom: 15,
            }}
          >
            Sua Meta Financeira
          </Text>

          <TextInput
            placeholder="Defina sua meta financeira"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={String(meta)}
            onChangeText={
              handleMetaChange
            }
            style={{
              backgroundColor:
                theme.card,

              color:
                theme.text,

              borderWidth: 1,

              borderColor:
                theme.border,

              padding: 15,

              borderRadius: 14,

              marginTop: 20,

              marginBottom: 20,
            }}
          />

          <Text
            style={{
              color:
                theme.secondaryText,

              marginBottom: 15,
            }}
          >
            Meta definida:
            R$ {meta.toFixed(2)}
          </Text>

          <View
            style={{
              height: 20,

              backgroundColor:
                theme.border,

              borderRadius: 999,

              overflow: "hidden",
            }}
          >

            <View
              style={{
                width:
                  `${progressoMeta}%`,

                height: "100%",

                backgroundColor:
                  theme.success,
              }}
            />

          </View>

          <Text
            style={{
              color: theme.text,

              marginTop: 12,

              fontWeight: "bold",
            }}
          >
            {progressoMeta.toFixed(0)}%
            concluído
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              marginTop: 8,
            }}
          >
            Saldo atual: R$ {saldo.toFixed(2)}
          </Text>

        </View>

      </PremiumCard>

      <Text
        style={{
          fontSize: 22,

          fontWeight: "bold",

          marginTop: 30,

          marginBottom: 15,

          color: theme.text,
        }}
      >
        Últimas Receitas
      </Text>

      {ultimasReceitas.map(
        (item) => (

          <TransactionItem
            key={item.id}
            item={item}
            type="receita"
          />
        )
      )}

      {ultimasReceitas.length === 0 && (

        <Text
          style={{
            color: theme.secondaryText,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Nenhuma receita encontrada
        </Text>

      )}

      <Text
        style={{
          fontSize: 22,

          fontWeight: "bold",

          marginTop: 30,

          marginBottom: 15,

          color: theme.text,
        }}
      >
        Próximas Despesas
      </Text>

      {proximasDespesas.map(
        (item) => (

          <TransactionItem
            key={item.id}
            item={item}
            type="despesa"
          />
        )
      )}

      {proximasDespesas.length === 0 && (

        <Text
          style={{
            color: theme.secondaryText,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Nenhuma despesa pendente
        </Text>

      )}

    </ScrollView>
  );
}