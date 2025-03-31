import { router } from "expo-router";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  return (
    <View
      style={{
        paddingVertical: 30,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 25, textAlign: "center" }}>
            O
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center" }}>
            Biblioteca
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/origins")}
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 25, textAlign: "center" }}>
            O
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center" }}>
            Origens
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/others")}
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 25, textAlign: "center" }}>
            O
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center" }}>
            Outros
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
