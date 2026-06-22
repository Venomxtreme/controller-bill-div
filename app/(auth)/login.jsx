import { zodResolver } from "@hookform/resolvers/zod";

import { Link, router } from "expo-router";

import { useState } from "react";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  Text,
  View,
} from "react-native";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Toast from "react-native-toast-message";

import Button from "../../src/components/Button";

import Input from "../../src/components/Input";

import {
  useAuth,
} from "../../src/contexts/AuthContext";

import {
  db,
} from "../../src/firebase/config";

import {
  loginSchema,
} from "../../src/validations/authValidation";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

export default function Login() {

  const { login } =
    useAuth();

  const { theme } =
  useTheme();

  const [loading, setLoading] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({

    resolver:
      zodResolver(loginSchema),

    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  async function handleLogin(data) {

  try {

    setLoading(true);

    const q = query(
      collection(db, "users"),

      where(
        "cpf",
        "==",
        data.cpf
      )
    );

    const querySnapshot =
      await getDocs(q);

    if (querySnapshot.empty) {

      return Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "CPF não encontrado",
      });
    }

    const userData =
      querySnapshot.docs[0].data();

    await login(
      userData.email,
      data.password
    );

    router.replace("/(tabs)");

  } catch (error) {

    console.log(error);

    const errorCode =
      error?.code;

    if (
      errorCode ===
      "auth/invalid-credential"
    ) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "Senha incorreta",
      });

    } else {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          error?.message,
      });
    }

  } finally {

    setLoading(false);
  }
}

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor:
          theme.background,
      }}
    >

      <Text
        style={{
          fontSize: 70,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        💰
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.text,
          textAlign: "center",
        }}
      >
        Login
      </Text>

      <Text
        style={{
          textAlign: "center",
          color:
            theme.secondaryText,
          marginBottom: 30,
        }}
      >
        Controle suas finanças com facilidade
      </Text>

      <Controller
        control={control}
        name="cpf"

        render={({

          field: {
            onChange,
            value,
          },

        }) => (

          <Input
            placeholder="CPF"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.cpf && (

        <Text
          style={{
            color: theme.danger,
            marginBottom: 10,
          }}
        >
          {errors.cpf.message}
        </Text>
      )}

      <Controller
        control={control}
        name="password"

        render={({

          field: {
            onChange,
            value,
          },

        }) => (

          <Input
            placeholder="Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.password && (

        <Text
          style={{
            color: "red",
            marginBottom: 10,
          }}
        >
          {errors.password.message}
        </Text>
      )}

      <Button
        title="Entrar"
        loading={loading}
        onPress={
          handleSubmit(
            handleLogin
          )
        }
      />

      <Link
        href="/register"

        style={{
          marginTop: 20,
          textAlign: "center",
          color: theme.primary,
        }}
      >
        Não tem conta? Criar conta
      </Link>

    </View>
  );
}