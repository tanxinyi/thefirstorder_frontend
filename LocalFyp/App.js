/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createSwitchNavigator,} from 'react-navigation';
import LoginPage from "./src/pages/LoginPage";
import SignedInPage from "./src/pages/SignedInPage"
import {RootTabNav} from "./Routes";

export default RootNavigator = createSwitchNavigator({
    LoginPage: LoginPage,
    SignedInPage: SignedInPage,
});

