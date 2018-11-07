/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {OrderStack, ExploreStack, AccountStack} from "./Routes";


export default createBottomTabNavigator({
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

