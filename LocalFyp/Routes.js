import {createStackNavigator} from 'react-navigation';
import ExploreMainPage from "./src/pages/ExploreMainPage";
import ScanningPage from "./src/pages/ScanningPage";
import OrderMainPage from "./src/pages/OrderMainPage";
import AccountMainPage from "./src/pages/AccountMainPage"

export const ExploreStack = createStackNavigator({
    ExploreMainPage: ExploreMainPage
},{
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
    }
});

export const OrderStack = createStackNavigator({
    ScanningPage: ScanningPage,
    OrderMainPage: OrderMainPage
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