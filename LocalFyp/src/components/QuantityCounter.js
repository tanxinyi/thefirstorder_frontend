import React, {Component} from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Text, View} from 'react-native';

class QuantityCounter extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <View>
                <Text> Quantity counter </Text>
            </View>
        )
    }
};

export default QuantityCounter;