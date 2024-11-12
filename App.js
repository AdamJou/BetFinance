import React from "react";
import { SafeAreaView } from "react-native";
import MainScreen from "./src/screens/MainScreen.js";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScreen />
    </SafeAreaView>
  );
}
