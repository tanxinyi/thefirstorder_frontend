import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import ExploreMainPage from "./src/pages/ExploreMainPage";
import ScanningPage from "./src/pages/ScanningPage";
import AccountMainPage from "./src/pages/AccountMainPage";
import Menu from "./src/components/Menu";
import FoodPrices from "./src/components/FoodPrices";
import CartPage from "./src/pages/CartPage";
import BillPage from "./src/pages/BillPage";
import FoodCustomisationPage from "./src/pages/FoodCustomisationPage";
import OrderMainPage from "./src/pages/OrderMainPage";
import HomeMainPage from "./src/pages/HomeMainPage";
import { Button, Icon, Footer, FooterTab} from "native-base";
import React, { Component } from "react";
import {ViewStyle_Internal as backgroundColor, Platform, StyleSheet, Text, View} from 'react-native';


export const ExploreStack = createStackNavigator({
    ExploreMainPage: ExploreMainPage
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
        gesturesEnabled: false,
        swipeEnabled: false,
        animationEnabled:false
    }
});

export const OrderStack = createStackNavigator({
    ScanningPage: ScanningPage,
    OrderMainPage: OrderMainPage,
    Menu: Menu,
    CartPage: CartPage,
    BillPage: BillPage,
    FoodPrices: FoodPrices,
    FoodCustomisationPage: FoodCustomisationPage,
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
        gesturesEnabled: false,
        swipeEnabled: false,
        animationEnabled:false
    }
});

export const AccountStack = createStackNavigator({
    AccountMainPage: AccountMainPage
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
        gesturesEnabled: false,
        swipeEnabled: false,
        animationEnabled: false
    }
});

export const HomeStack = createStackNavigator({

    HomeMainPage: HomeMainPage
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: true,
    }
});

export const RootTabNav = createBottomTabNavigator({

    Home:{
        screen: HomeStack,

    },
    Dine: {
        screen: OrderStack
    },
    Explore: {
        screen: ExploreStack
    },
    User:{
        screen: AccountStack
    },
}, {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
        return (
            <Footer>
                <FooterTab style={{backgroundColor: '#D8412F'}}>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("Home")}>
                        <Icon name="home"/>
                        <Text style={styles.text}>Home</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("Explore")}>
                        <Icon name="paper-plane"/>
                        <Text style={styles.text}>Explore</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("Dine")}>
                        <Icon name="pizza"/>
                        <Text style={styles.text}>Dine</Text>
                    </Button>
                    <Button
                        vertical
                        onPress={() => props.navigation.navigate("User")}>
                        <Icon name="person"/>
                        <Text style={styles.text}>User</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    },

    navigationOptions:{
        animationEnabled:false,
        swipeEnabled: false,
    }
});

const styles = {
    text: {
        fontFamily: 'Biko_Regular',
    },
};