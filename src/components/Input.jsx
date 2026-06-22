import {
    TextInput,
    View,
} from "react-native";

export default function Input(props) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
      }}
    >
      <TextInput
        placeholderTextColor="#999"
        style={{
          height: 55,
        }}
        {...props}
      />
    </View>
  );
}