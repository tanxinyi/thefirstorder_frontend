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

export const RootTabNav = createBottomTabNavigator({
    Dine: {
        screen: OrderStack
    },
    Explore: {
        screen: ExploreStack
    },
    User:{
        screen: AccountStack
    },
},{
    navigationOptions:{
        animationEnabled:false,
        swipeEnabled: false,
    }
});