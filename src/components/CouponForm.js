import React, { useState } from "react";
import { View, TextInput, Button, Switch, Text, Alert } from "react-native";

const CouponForm = ({ addCoupon }) => {
  const [stake, setStake] = useState("");
  const [isWinning, setIsWinning] = useState(false);
  const [amountWon, setAmountWon] = useState("");

  const handleAddCoupon = () => {
    const parsedStake = parseFloat(stake);
    const parsedAmountWon = parseFloat(amountWon);

    if (isNaN(parsedStake) || parsedStake <= 0) {
      Alert.alert("Błąd", "Wkład musi być większy niż 0.");
      return;
    }
    if (isWinning) {
      if (isNaN(parsedAmountWon) || parsedAmountWon <= 0) {
        Alert.alert("Błąd", "Wygrana musi być większa niż 0.");
        return;
      }
      if (parsedAmountWon <= parsedStake) {
        Alert.alert(
          "Błąd",
          "Wygrana musi być większa niż wkład, aby kupon został uznany za wygrany."
        );
        return;
      }
    }
    addCoupon({
      id: Date.now(),
      stake: parsedStake,
      isWinning,
      amountWon: isWinning ? parsedAmountWon : 0,
      dateAdded: new Date().toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setStake("");
    setAmountWon("");
    setIsWinning(false);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text>Stawka</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="(zł)"
        value={stake}
        onChangeText={setStake}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Wygrany</Text>
        <Switch value={isWinning} onValueChange={setIsWinning} />
      </View>
      {isWinning && (
        <TextInput
          placeholder="(zł)"
          keyboardType="numeric"
          value={amountWon}
          onChangeText={setAmountWon}
          style={{ borderBottomWidth: 1, marginVertical: 10 }}
        />
      )}
      <Button title="Dodaj Kupon" onPress={handleAddCoupon} />
    </View>
  );
};

export default CouponForm;
