import {createStackNavigator} from 'react-navigation';
import ExploreMainPage from "./src/pages/ExploreMainPage";
import ScanningPage from "./src/pages/ScanningPage";
import OrderMainPage from "./src/pages/OrderMainPage";
import AccountMainPage from "./src/pages/AccountMainPage";
import Menu from "./src/components/Menu";
import FoodPrice from "./src/components/FoodPrice";
import FoodPrices from "./src/components/FoodPrices";
import CartPage from "./src/pages/CartPage";
import BillPage from "./src/pages/BillPage";

export const ExploreStack = createStackNavigator({
    ExploreMainPage: ExploreMainPage
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
    }
});
export const MenuStack = createStackNavigator({
    Menu: Menu,
    FoodPrices: FoodPrices,
    FoodPrice: FoodPrice
});

export const OrderStack = createStackNavigator({
    //ScanningPage: ScanningPage,
    OrderMainPage: OrderMainPage,
    Menu: {
        screen: MenuStack
    },
    CartPage: CartPage,
    BillPage: BillPage,
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
    }
});

export const AccountStack = createStackNavigator({
    AccountMainPage: AccountMainPage
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
    }
});