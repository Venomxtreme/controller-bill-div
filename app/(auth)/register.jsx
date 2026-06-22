import { router } from "expo-router";

import { useState } from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import Button from "../../src/components/Button";

import Input from "../../src/components/Input";

import {
  useAuth,
} from "../../src/contexts/AuthContext";

import {
  db,
} from "../../src/firebase/config";

import Toast from "react-native-toast-message";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

import { Link } from "expo-router";

export default function Register() {

  const {
    register,
    logout,
  } = useAuth();

  const { theme } =
  useTheme();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [cpf, setCpf] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
  useState(false);

async function handleRegister() {

  if (cpf.length < 11) {

    return Toast.show({
      type: "error",
      text1: "Erro",
      text2: "CPF inválido",
    });
  }

  if (
    password !==
    confirmPassword
  ) {

    return Toast.show({
      type: "error",
      text1: "Erro",
      text2: "As senhas não coincidem",
    });
  }

  try {

    setLoading(true);

    const userCredential =
      await register(
        email,
        password
      );

    await setDoc(
      doc(
        db,
        "users",
        userCredential.user.uid
      ),
      {
        name,
        email,
        cpf,
      }
    );

    await logout();

    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Conta criada com sucesso",
    });

    router.replace("/login");

  } catch (error) {

    console.log(error);

    const errorCode =
      error?.code;

    if (
      errorCode ===
      "auth/email-already-in-use"
    ) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "Esse email já está em uso",
      });

    } else if (
      errorCode ===
      "auth/invalid-email"
    ) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "Email inválido",
      });

    } else if (
      errorCode ===
      "auth/weak-password"
    ) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          "Senha deve ter pelo menos 6 caracteres",
      });

    } else {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          error?.message ||
          "Erro ao criar conta",
      });
    }

  } finally {

    setLoading(false);

  }
}

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor:
            theme.background,
        }}
      >

        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor:
              theme.card,

            alignSelf: "center",

            justifyContent:
              "center",

            alignItems:
              "center",

            marginBottom: 20,

            borderWidth: 1,

            borderColor:
              theme.border,
          }}
        >
          <Text
            style={{
              fontSize: 40,
            }}
          >
            📝
          </Text>
        </View>

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 10,
            color: theme.text,
            textAlign: "center",
          }}
        >
          Criar Conta
        </Text>

        <Text
          style={{
            color:
              theme.secondaryText,
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Preencha os dados para começar
        </Text>

        <View
          style={{
            backgroundColor:
              theme.card,

            padding: 20,

            borderRadius: 20,

            borderWidth: 1,

            borderColor:
              theme.border,
          }}
        >

          <Input
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
          />

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />

          <Input
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Input
            placeholder="Confirmar senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
          />

          <View
            style={{
              marginTop: 20,
            }}
          >

            <Button
              title="Criar conta"
              loading={loading}
              onPress={
                handleRegister
              }
            />

          </View>

          <Link
            href="/login"
            style={{
              textAlign: "center",
              marginTop: 20,
              color: theme.primary,
              fontWeight: "bold",
            }}
          >
            Já possui uma conta? Entrar
          </Link>

        </View>

        <Text
          style={{
            textAlign: "center",
            color:
              theme.secondaryText,
            marginTop: 30,
          }}
        >
          Controller Bill Div v1.0
        </Text>

      </View>
  </ScrollView>
)};