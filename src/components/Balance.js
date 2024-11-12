import React from "react";
import { Text, View } from "react-native";

const Balance = ({ coupons }) => {
  const totalBalance = coupons.reduce((sum, coupon) => {
    return (
      sum + (coupon.isWinning ? coupon.amountWon - coupon.stake : -coupon.stake)
    );
  }, 0);

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ fontSize: 18 }}>
        Bilans{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: totalBalance >= 0 ? "green" : "red",
          }}
        >
          {totalBalance.toFixed(2)} zł
        </Text>
      </Text>
    </View>
  );
};

export default Balance;
