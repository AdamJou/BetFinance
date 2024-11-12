import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PredefinedTabsSelector from "./PredefinedTabsSelector";
import CustomTabConfigurator from "./CustomTabConfigurator";

const TabNavigation = ({ tabs, addTab, selectedTab, setSelectedTab }) => {
  const [newTabName, setNewTabName] = useState("");
  const [newTabIcon, setNewTabIcon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  const predefinedTabs = [
    { name: "Fortuna", icon: require("../../assets/icons/fortuna.jpg") },
    { name: "Betclic", icon: require("../../assets/icons/betclic.png") },
    { name: "Superbet", icon: require("../../assets/icons/superbet.png") },
    { name: "Custom", icon: null },
  ];

  const handleAddTab = () => {
    if (newTabName && newTabIcon) {
      addTab({ name: newTabName, icon: newTabIcon });
      setNewTabName("");
      setNewTabIcon(null);
      setIsCustom(false);
      setModalVisible(false);
    }
  };

  const handleSelectTab = (item) => {
    if (item.name === "Custom") {
      setIsCustom(true);
      setNewTabIcon(null);
      setNewTabName("");
    } else {
      setNewTabName(item.name);
      setNewTabIcon(item.icon);
      setIsCustom(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Wybierz Zakładkę
            </Text>

            <PredefinedTabsSelector
              predefinedTabs={predefinedTabs}
              selectedTab={newTabName}
              onSelectTab={handleSelectTab}
            />

            {isCustom && (
              <CustomTabConfigurator
                newTabName={newTabName}
                setNewTabName={setNewTabName}
                newTabIcon={newTabIcon}
                setNewTabIcon={setNewTabIcon}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleAddTab}
                disabled={!newTabName || !newTabIcon}
                style={{
                  backgroundColor:
                    !newTabName || !newTabIcon ? "#ddd" : "#4CAF50",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Dodaj zakładkę
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "#f44336",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  flex: 1,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Anuluj
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
          >
            <View style={styles.iconAndTextContainer}>
              {tab.icon ? (
                typeof tab.icon === "string" ? (
                  <Icon
                    name={tab.icon}
                    size={24}
                    color={selectedTab === tab.id ? "blue" : "black"}
                    style={styles.tabIcon}
                  />
                ) : (
                  <Image
                    source={tab.icon}
                    style={[styles.tabIcon, { borderRadius: 12 }]}
                  />
                )
              ) : (
                <Icon
                  name="add-circle-outline"
                  size={24}
                  color={selectedTab === tab.id ? "blue" : "black"}
                  style={styles.tabIcon}
                />
              )}
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  tabsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingVertical: 5,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    minWidth: 80,
  },
  activeTab: {
    borderColor: "blue",
    backgroundColor: "#e0f0ff",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTabText: {
    color: "blue",
  },
};

export default TabNavigation;
