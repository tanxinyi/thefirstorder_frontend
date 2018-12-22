import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {OrderStackNav} from "./Routes";

export default class App extends Component {
    render() {
        return (
            <OrderStackNav />
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
