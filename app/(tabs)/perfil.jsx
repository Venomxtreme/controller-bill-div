import {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import Toast from "react-native-toast-message";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import Button from "../../src/components/Button";

import Input from "../../src/components/Input";

import ConfirmModal from "../../src/components/ConfirmModal";

import {
  useAuth,
} from "../../src/contexts/AuthContext";

import {
  useTheme,
} from "../../src/contexts/ThemeContext";

import {
  db,
} from "../../src/firebase/config";

import {
  loadMeta,
} from "../../src/services/metaService";

export default function Perfil() {

  const { user, logout } =
    useAuth();

  const {
    darkMode,
    toggleTheme,
    theme,
  } = useTheme();

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);

  const [userData, setUserData] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState("");

  const [cpf, setCpf] =
    useState("");

  const [meta, setMeta] =
  useState(0);

  const initials =
  userData?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "U";

  useEffect(() => {

  if (user?.uid) {

    loadUserData();

  }

}, [user]);

  async function loadUserData() {

  try {

    const docRef = doc(
      db,
      "users",
      user.uid
    );

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {

      const data =
        docSnap.data();

      setUserData(data);

      setName(data.name);

      setCpf(data.cpf);

      const metaAtual =
        await loadMeta(
          user.uid
        );

      setMeta(metaAtual);
    }

  } catch (error) {

    console.log(error);
  }
}

  async function handleUpdateProfile() {

    try {

      await updateDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {
          name,
          cpf,
        }
      );

      setUserData({
        ...userData,
        name,
        cpf,
      });

      setEditing(false);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2:
          "Perfil atualizado",
      });

    } catch (error) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2:
          error.message,
      });
    }
  }

  async function handleLogout() {

    try {

      await logout();

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2:
          "Logout realizado",
      });

      router.replace("/login");

    } catch (error) {

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.message,
      });
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
      paddingBottom: 120,
    }}

    showsVerticalScrollIndicator={
      false
    }
  >

      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor:
            theme.card,

          alignSelf: "center",

          justifyContent:
            "center",

          alignItems:
            "center",

          marginBottom: 20,

          borderWidth: 2,

          borderColor:
            theme.primary,
        }}
      >
        <Text
          style={{
            fontSize: 50,
            color: theme.text,
            fontWeight: "bold",
          }}
        >
          {initials}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.text,
          textAlign: "center",
        }}
      >
        Perfil
      </Text>

      <View
          style={{
            backgroundColor: theme.card,

            padding: 24,

            borderRadius: 24,

            borderWidth: 1,

            borderColor: theme.border,

            marginBottom: 30,

            shadowColor: "#000",

            shadowOffset: {
              width: 0,
              height: 8,
            },

            shadowOpacity: 0.25,

            shadowRadius: 12,

            elevation: 8,
          }}
        >

        {editing ? (

          <>

            <Input
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

            <Input
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
            />

            <Button
              title="Salvar Alterações"
              onPress={
                handleUpdateProfile
              }
            />

          </>

        ) : (

          <>

            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {userData?.name}
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              {userData?.email}
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              CPF: {userData?.cpf}
            </Text>

            <Text
              style={{
                color: theme.text,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              🎯 Meta:
              R$ {meta?.toFixed(2)}
            </Text>

            <Button
              title="Editar Perfil"

              onPress={() =>
                setEditing(true)
              }
            />

          </>
        )}

      </View>

      <Button
        title={
          darkMode
            ? "Desativar Dark Mode"
            : "Ativar Dark Mode"
        }

        onPress={toggleTheme}
      />

      <View
        style={{
          marginTop: 20,
        }}
      >

        <Button
          title="Sair"

          color="#dc2626"

          onPress={() =>
            setShowLogoutModal(true)
          }
        />

      </View>

      <ConfirmModal
        visible={showLogoutModal}

        title="Sair"

        message="Deseja realmente sair da conta?"

        onCancel={() =>
          setShowLogoutModal(false)
        }

        onConfirm={() => {

          setShowLogoutModal(false);

          handleLogout();
        }}
      />

      <Text
        style={{
          textAlign: "center",
          color:
            theme.secondaryText,

          marginTop: 30,
        }}
      >
        Controller Bill Div
        v1.0
      </Text>
    </ScrollView>
  );
}