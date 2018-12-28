import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import React from "react";
import OrderMainPage from "./src/pages/OrderMainPage";
import Categories from "./src/pages/Categories";
import FoodPrices from "./src/pages/FoodPrices";
import ScanningPage from "./src/pages/ScanningPage";
import FoodCustomisationPage from "./src/pages/FoodCustomisationPage";
import CartScreen from "./src/pages/CartScreen";
import BillScreen from "./src/pages/BillScreen";
import HomePage from "./src/pages/HomePage";
import Subcategories from "./src/components/Subcategories";

export const OrderStackNav = createStackNavigator({
    HomePage: HomePage,
    ScanningPage: ScanningPage,
    OrderMain: OrderMainPage,
    Categories: Categories,
    Subcategories: Subcategories,
    FoodPrices: FoodPrices,
    FoodCustomisation: FoodCustomisationPage,
    Cart: CartScreen,
    Bill: BillScreen
},{
    navigationOptions:{
        headerTitle: 'Dine-in',
        headerRight: null,
        headerMode: 'none'
    }
})