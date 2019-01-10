import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator
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
import Subcategories from "./src/pages/Subcategories";
import PaymentDetailsScreen from "./src/pages/PaymentDetailsScreen";
import PaymentConfirmationScreen from "./src/pages/PaymentConfirmationScreen";
import ExploreScreen from "./src/pages/ExploreScreen";
import DrawerComponent from "./src/components/DrawerComponent";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import AuthPage from "./src/pages/AuthPage";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProfilePage from "./src/pages/ProfilePage";
import ProfileEditPage from "./src/pages/ProfileEditPage";
import TransactionsPage from "./src/pages/TransactionsPage";
import TransactionDetailPage from "./src/pages/TransactionsDetailPage";

export const OrderStackNav = createStackNavigator({
    ScanningPage: ScanningPage,
    OrderMain: OrderMainPage,
    Categories: Categories,
    Subcategories: Subcategories,
    FoodPrices: FoodPrices,
    FoodCustomisation: FoodCustomisationPage,
    Cart: CartScreen,
    Bill: BillScreen,
    PaymentDetails: PaymentDetailsScreen,
    Confirmation: PaymentConfirmationScreen
},{
    headerMode: 'none',
})

export const ExploreStackNav = createStackNavigator({
    Explore: ExploreScreen
},{
    headerMode: 'none',
})

export const ProfileStackNav = createStackNavigator({
    Profile: ProfilePage,
    EditProfile: ProfileEditPage,
    Transactions: TransactionsPage,
    TransactionDetails: TransactionDetailPage
},{
    headerMode: 'none',
})


export const SignedInNav = createStackNavigator({
    LogIn: LoginPage,
    Register: RegisterPage
},{
    headerMode: 'none',
})


export const DrawerNav = createDrawerNavigator({
    "Home": {
        screen: HomePage,
        navigationOptions:{
            drawerIcon:({tintColor})=>(
                <Icon name='home'
                      style={{fontSize:24, color:tintColor}}/>
            )
        }
    },
    "Dine-in": {
        screen: OrderStackNav,
        navigationOptions:{
            drawerIcon:({tintColor})=>(
                <Icon name='local-dining'
                      style={{fontSize:24, color:tintColor}}/>
            )
        }
    },
    "Explore": {
        screen: ExploreStackNav,
        navigationOptions:{
            drawerIcon: ({tintColor}) => (
                <Icon name='search'
                      style={{fontSize:24, color:tintColor}}/>
            )
        }
    },
    "My Account": {
        screen: ProfileStackNav,
        navigationOptions:{
            drawerIcon: ({tintColor}) => (
                <Icon name="account-circle"
                      style={{fontSize:24, color:tintColor}}/>
            )
        }
    },
},{
    contentComponent: DrawerComponent,
    contentOptions:{
        activeTintColor: 'orange'
    }
})

export const RootSwitchNav = createSwitchNavigator({
    Auth: AuthPage,
    Drawer: DrawerNav,
    SignIn: SignedInNav,
})
