import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Category from '../components/Category'
import FoodPrices from "../components/FoodPrices";
import QuantityCounter from "../components/QuantityCounter";
import Remarks from "../components/Remarks";
class FoodCustomisationPage extends React.Component{
    render(){
        return(
            <View>
                <Text> FoodCustomisation Page is here! </Text>
                <FoodPrices/>
                <QuantityCounter/>
                <Remarks/>
            </View>
        );
    }
}

export default FoodCustomisationPage;