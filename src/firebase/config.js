import { initializeApp } from "firebase/app";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCc5Ml0LOwo-ObzYqsGK_oU9IHCjYfWfk",
  authDomain: "controle-bill-div.firebaseapp.com",
  projectId: "controle-bill-div",
  storageBucket: "controle-bill-div.firebasestorage.app",
  messagingSenderId: "705897357403",
  appId: "1:705897357403:web:8879439dacfecda4c05f7e",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app,
  {
    persistence:
      getReactNativePersistence(
        AsyncStorage
      ),
  }
);

export const db =
  getFirestore(app);