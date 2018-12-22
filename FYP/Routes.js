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
import CartIcon from "./src/components/CartIcon";
import CartScreen from "./src/pages/CartScreen";

export const OrderStackNav = createStackNavigator({
    ScanningPage: ScanningPage,
    OrderMain: OrderMainPage,
    Categories: Categories,
    FoodPrices: FoodPrices,
    FoodCustomisation: FoodCustomisationPage,
    Cart: CartScreen
},{
    navigationOptions:{
        headerTitle: 'Dine-in',
        headerRight: null
    }
})