import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PredefinedTabsSelector = ({
  predefinedTabs,
  selectedTab,
  onSelectTab,
}) => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {predefinedTabs.map((item) => (
      <TouchableOpacity
        key={item.name}
        onPress={() => onSelectTab(item)}
        style={{
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {item.icon ? (
          <Image
            source={item.icon}
            style={{
              width: 50,
              height: 50,
              opacity: selectedTab === item.name ? 1 : 0.5,
              borderWidth: selectedTab === item.name ? 2 : 0,
              borderColor: "blue",
              borderRadius: 5,
            }}
          />
        ) : (
          <Icon
            name="add-circle-outline"
            size={30}
            color={selectedTab === item.name ? "blue" : "gray"}
          />
        )}
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default PredefinedTabsSelector;
