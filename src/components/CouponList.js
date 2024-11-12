import React from "react";
import { FlatList, Text, View } from "react-native";

const CouponList = ({ coupons }) => {
  return (
    <FlatList
      data={coupons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            borderRadius: 10,
            padding: 10,
            backgroundColor: item.isWinning ? "green" : "red",
            marginVertical: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 12, marginTop: 5 }}>
            Dodano: {item.dateAdded}
          </Text>
          <Text style={{ color: "white" }}>Stawka: {item.stake} zł</Text>
          {item.isWinning && (
            <Text style={{ color: "white" }}>Wygrana: {item.amountWon} zł</Text>
          )}
        </View>
      )}
    />
  );
};

export default CouponList;
