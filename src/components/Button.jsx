import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Button({
  title,
  onPress,
  loading = false,
  color = "#0ac914",
}) {

  return (
    <TouchableOpacity
      onPress={onPress}

      disabled={loading}

      activeOpacity={0.8}

      style={{
        backgroundColor: color,

        padding: 15,

        borderRadius: 12,

        alignItems: "center",

        justifyContent: "center",

        opacity: loading
          ? 0.7
          : 1,
      }}
    >

      {
        loading ? (

          <ActivityIndicator
            color="#fff"
          />

        ) : (

          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {title}
          </Text>
        )
      }

    </TouchableOpacity>
  );
}