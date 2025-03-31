import Menu from "@/components/menu";
import Added from "@/components/origins/added";
import NewOrigin from "@/components/origins/newOrigin";
import Tab from "@/components/tab";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  const [tab, setTab] = React.useState("0");

  return (
    <View
      style={{
        backgroundColor: "#212121",
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 25 }}>Origens</Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 15,
          gap: 25,
          width: "100%",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Tab
            text="Adicionadas"
            id="0"
            selectedId={tab}
            setSelectedId={setTab}
          />

          <Tab
            text="Novas fontes"
            id="1"
            selectedId={tab}
            setSelectedId={setTab}
          />
        </View>

        {tab === "0" && <Added />}
        {tab === "1" && <NewOrigin />}
      </View>

      <Menu />
    </View>
  );
}
