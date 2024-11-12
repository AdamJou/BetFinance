import React, { useState } from "react";
import { View, TextInput, Button, Switch, Text } from "react-native";

const CouponForm = ({ addCoupon }) => {
  const [stake, setStake] = useState("");
  const [isWinning, setIsWinning] = useState(false);
  const [amountWon, setAmountWon] = useState("");

  const handleAddCoupon = () => {
    if (stake) {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      addCoupon({
        id: Date.now(),
        stake: parseFloat(stake),
        isWinning,
        amountWon: isWinning ? parseFloat(amountWon) : 0,
        dateAdded: formattedDate,
      });
      setStake("");
      setAmountWon("");
      setIsWinning(false);
    }
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
