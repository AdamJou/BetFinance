import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClearDataButton = ({ onClearData }) => {
  const confirmClearAllData = () => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz usunąć wszystkie zapisane dane?",
      [
        {
          text: "Anuluj",
          style: "cancel",
        },
        {
          text: "Usuń",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            onClearData(); // Aktualizacja stanu w MainScreen
            Alert.alert("Sukces", "Wszystkie dane zostały usunięte.");
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={confirmClearAllData}
      style={{
        backgroundColor: "#ccc",
        borderRadius: 10,
        padding: 4,
      }}
    >
      <Icon name="delete" size={24} color="red" />
    </TouchableOpacity>
  );
};

export default ClearDataButton;
