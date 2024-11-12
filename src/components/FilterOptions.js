import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const FilterOptions = ({ filter, setFilter }) => {
  return (
    <View
      style={{ flexDirection: "row", flex: 1, justifyContent: "space-evenly" }}
    >
      <TouchableOpacity onPress={() => setFilter("all")}>
        <Text style={{ color: filter === "all" ? "blue" : "black" }}>
          Wszystko
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("today")}>
        <Text style={{ color: filter === "today" ? "blue" : "black" }}>
          Dzisiaj
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("thisWeek")}>
        <Text style={{ color: filter === "thisWeek" ? "blue" : "black" }}>
          Ten tydzień
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("thisMonth")}>
        <Text style={{ color: filter === "thisMonth" ? "blue" : "black" }}>
          Ten miesiąc
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterOptions;
