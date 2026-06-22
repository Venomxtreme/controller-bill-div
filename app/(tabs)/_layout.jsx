import {
  Tabs,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

import "react-native-reanimated";

export default function TabsLayout() {

  const { theme, darkMode } =
    useTheme();

  return (
    <Tabs
      screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",

            height: 75,

            paddingBottom: 10,

            paddingTop: 10,

            backgroundColor:
              theme.card,

            borderTopWidth: 0,

            elevation: 10,

            shadowColor: "#000",

            shadowOffset: {
              width: 0,
              height: -5,
            },

            shadowOpacity: 0.1,

            shadowRadius: 10,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },

          tabBarActiveTintColor:
            theme.primary,

          tabBarInactiveTintColor:
            darkMode
              ? "#777"
              : "#999",
        }}
      >

      <Tabs.Screen
        name="index"

        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="receitas"

        options={{
          title: "Receitas",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="wallet"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="despesas"

        options={{
          title: "Despesas",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="card"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="document-text"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"

        options={{
          title: "Perfil",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person-circle"
              size={size + 4}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}