import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {OrderStackNav} from "./Routes";
import {Provider} from 'react-redux';
import orderStore from './src/store/index';


export default class App extends Component {
    render() {
        return (
            <Provider store={orderStore}>
                <OrderStackNav />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
