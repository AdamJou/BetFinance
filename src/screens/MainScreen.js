import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNavigation from "../components/TabNavigation";
import Balance from "../components/Balance";
import CouponList from "../components/CouponList";
import CouponForm from "../components/CouponForm";

const MainScreen = () => {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const loadStoredData = async () => {
    try {
      const storedTabs = await AsyncStorage.getItem("tabs");
      const storedCoupons = await AsyncStorage.getItem("coupons");

      if (storedTabs) setTabs(JSON.parse(storedTabs));
      if (storedCoupons) setCoupons(JSON.parse(storedCoupons));
    } catch (error) {
      console.log("An error ocurred while loading data:", error);
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("tabs", JSON.stringify(tabs));
      await AsyncStorage.setItem("coupons", JSON.stringify(coupons));
    } catch (error) {
      console.log("An error ocurred while saving data:", error);
    }
  };
  useEffect(() => {
    storeData();
  }, [tabs, coupons]);

  const addTab = (tab) => {
    const newTab = { id: Date.now(), ...tab };
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab.id);
  };

  const addCoupon = (coupon) => {
    setCoupons([...coupons, coupon]);
  };

  return (
    <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 10 }}>
      <TabNavigation
        tabs={tabs}
        addTab={addTab}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab ? (
        <>
          <Balance coupons={coupons.filter((c) => c.tabId === selectedTab)} />
          <CouponList
            coupons={coupons.filter((c) => c.tabId === selectedTab)}
          />
          <CouponForm
            addCoupon={(coupon) => addCoupon({ ...coupon, tabId: selectedTab })}
          />
        </>
      ) : (
        <Text style={{ marginTop: 20, fontSize: 16, textAlign: "center" }}>
          Dodaj nową zakładkę, aby dodać kupony
        </Text>
      )}
    </View>
  );
};

export default MainScreen;
