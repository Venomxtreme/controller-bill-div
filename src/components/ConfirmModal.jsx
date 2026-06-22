import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    useTheme,
} from "../hooks/useTheme";

export default function ConfirmModal({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
}) {

  const { theme } =
    useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >

      <View
        style={{
          flex: 1,

          backgroundColor:
            "rgba(0,0,0,0.5)",

          justifyContent: "center",

          padding: 20,
        }}
      >

        <View
          style={{
            backgroundColor:
              theme.card,

            borderRadius: 20,

            padding: 20,
          }}
        >

          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: theme.text,
            }}
          >
            {message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent:
                "flex-end",

              marginTop: 20,
            }}
          >

            <TouchableOpacity
              onPress={onCancel}

              style={{
                marginRight: 10,
              }}
            >

              <Text
                style={{
                  color: "#666",
                  fontSize: 16,
                }}
              >
                Cancelar
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}

              style={{
                backgroundColor:
                  "#dc2626",

                paddingHorizontal: 20,

                paddingVertical: 10,

                borderRadius: 10,
              }}
            >

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Sair
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
}