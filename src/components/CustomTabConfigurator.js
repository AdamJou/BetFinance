import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomTabConfigurator = ({
  newTabName,
  setNewTabName,
  newTabIcon,
  setNewTabIcon,
}) => (
  <>
    <TextInput
      placeholder="Nazwa zakładki"
      value={newTabName}
      onChangeText={setNewTabName}
      style={{ borderBottomWidth: 1, marginVertical: 10 }}
    />
    <Text style={{ marginBottom: 10 }}>Wybierz Ikonę</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {["star", "favorite", "home", "work"].map((iconName) => (
        <TouchableOpacity
          key={iconName}
          onPress={() => setNewTabIcon(iconName)}
        >
          <Icon
            name={iconName}
            size={30}
            color={newTabIcon === iconName ? "blue" : "gray"}
          />
        </TouchableOpacity>
      ))}
    </View>
  </>
);

export default CustomTabConfigurator;
