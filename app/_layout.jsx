import "react-native-reanimated";

import { useEffect } from "react";

import {
  Stack,
  router,
  useSegments,
} from "expo-router";

import Toast from "react-native-toast-message";

import {
  AuthProvider,
  useAuth,
} from "../src/contexts/AuthContext";

import {
  ThemeProvider,
} from "../src/contexts/ThemeContext";

function RootNavigator() {

  const { user } =
    useAuth();

  const segments =
    useSegments();

  useEffect(() => {

  const inAuthGroup =
    segments[0] === "(tabs)";

  const inReceita =
    segments[0] === "receita";

  const inDespesa =
    segments[0] === "despesa";

  if (
    !user &&
    (
      inAuthGroup ||
      inReceita ||
      inDespesa
    )
  ) {

    router.replace("/login");
  }

  if (
    user &&
    !inAuthGroup &&
    !inReceita &&
    !inDespesa
  ) {

    router.replace("/(tabs)");
  }

}, [user, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {

  return (
    <ThemeProvider>

      <AuthProvider>

        <RootNavigator />

        <Toast />

      </AuthProvider>

    </ThemeProvider>
  );
}