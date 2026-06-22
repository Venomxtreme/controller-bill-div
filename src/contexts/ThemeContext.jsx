import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext({});

export function ThemeProvider({
  children,
}) {

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    loadTheme();

  }, []);

  async function loadTheme() {

    try {

      const storedTheme =
        await AsyncStorage.getItem(
          "@darkMode"
        );

      if (storedTheme !== null) {

        setDarkMode(
          JSON.parse(storedTheme)
        );
      }

    } catch (error) {

      console.log(error);
    }
  }

  async function toggleTheme() {

    try {

      const newTheme =
        !darkMode;

      setDarkMode(newTheme);

      await AsyncStorage.setItem(
        "@darkMode",

        JSON.stringify(newTheme)
      );

    } catch (error) {

      console.log(error);
    }
  }

  const lightTheme = {

    background:
      "#f4f4f5",

    card:
      "#ffffff",

    text:
      "#111827",

    secondaryText:
      "#6b7280",

    border:
      "#e5e7eb",

    primary:
      "#61f65c",

    primary2:
      "rgb(233, 8, 8)",

    success:
      "#22c55e",

    danger:
      "#ef4444",

    warning:
      "#facc15",

    input:
      "#ffffff",

    tabBar:
      "#ffffff",

    shadow:
      "#000",
  };

  const darkTheme = {

    background:
      "#09090b",

    card:
      "#18181b",

    text:
      "#fafafa",

    secondaryText:
      "#a1a1aa",

    border:
      "#27272a",

    primary:
      "#61f65c",

    primary2:
      "rgb(233, 8, 8)",

    success:
      "#22c55e",

    danger:
      "#ef4444",

    warning:
      "#facc15",

    input:
      "#1f1f23",

    tabBar:
      "#111113",

    shadow:
      "#000",
  };

  const theme =
    darkMode
      ? darkTheme
      : lightTheme;

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        theme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export function useTheme() {

  return useContext(
    ThemeContext
  );
}