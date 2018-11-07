import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import ExploreMainPage from "./src/pages/ExploreMainPage";
import ScanningPage from "./src/pages/ScanningPage";
import AccountMainPage from "./src/pages/AccountMainPage";
import Menu from "./src/components/Menu";
import Category from "./src/components/Category";
import Categories from "./src/components/Categories";
import FoodPrice from "./src/components/FoodPrice";
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
export const MenuStack = createStackNavigator({
    Categories: Categories,
    FoodPrices: FoodPrices,
    FoodCustomisationPage: FoodCustomisationPage,
},{
    headerMode: 'none',
    navigationOptions:{
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