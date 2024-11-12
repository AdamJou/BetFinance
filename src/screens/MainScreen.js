import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import TabNavigation from "../components/TabNavigation";
import Balance from "../components/Balance";
import CouponList from "../components/CouponList";
import CouponForm from "../components/CouponForm";
import FilterOptions from "../components/FilterOptions";
import ClearDataButton from "../components/ClearDataButton";

const MainScreen = () => {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [filter, setFilter] = useState("all");

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
    const tabExists = tabs.some((existingTab) => existingTab.name === tab.name);

    if (tabExists) {
      Alert.alert("Błąd", `Zakładka o nazwie "${tab.name}" już istnieje.`);
      return;
    }

    const newTab = { id: Date.now(), ...tab };
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab.id);
  };

  const addCoupon = (coupon) => {
    setCoupons([...coupons, coupon]);
  };

  const filterCouponsByDate = (coupons, filter) => {
    const now = dayjs();

    return coupons.filter((coupon) => {
      const couponDate = dayjs(coupon.dateAdded, "YYYY-MM-DD HH:mm");

      switch (filter) {
        case "today":
          return couponDate.isSame(now, "day");
        case "thisWeek":
          return couponDate.isSame(now, "week");
        case "thisMonth":
          return couponDate.isSame(now, "month");
        default:
          return true;
      }
    });
  };

  const filteredCoupons = filterCouponsByDate(
    coupons.filter((c) => c.tabId === selectedTab),
    filter
  );

  const handleClearData = () => {
    setTabs([]);
    setCoupons([]);
    setSelectedTab(null);
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <FilterOptions filter={filter} setFilter={setFilter} />
            <ClearDataButton onClearData={handleClearData} />
          </View>
          <Balance coupons={filteredCoupons} />
          <CouponList coupons={filteredCoupons} />
          <CouponForm
            addCoupon={(coupon) =>
              addCoupon({
                ...coupon,
                tabId: selectedTab,
              })
            }
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
