// Import libraries for making a component
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';

// Make a component
const BillComponent = (props) => {
    return (
        <View >
            <Card style = {styles.container}>
                <View style = {styles.ruler}>
                <Text style = {styles.order}> Order ID: O0010011802041634 </Text>
                </View>
                <View style = {styles.innerContainer}>
                    <Text> Nasi Lemak  </Text>
                    <Text> x3  </Text>
                    <Text> $12.00  </Text>
                </View>
                <View style = {styles.innerContainer}>
                    <Text> Chocolate Cake   </Text>
                    <Text> x1 </Text>
                    <Text> $4.00  </Text>
                </View>
                <View style = {styles.innerContainer}>
                    <Text> Green Tea   </Text>
                    <Text> x1 </Text>
                    <Text> $1.50  </Text>
                </View>
            </Card>
            <Card style = {styles.container}>
                <View style = {styles.ruler}>
                    <Text style = {styles.order}> Order ID: O0010011802041635 </Text>
                </View>
                <View style = {styles.innerContainer}>
                    <Text> Nasi Lemak  </Text>
                    <Text> x3  </Text>
                    <Text> $12.00  </Text>
                </View>
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    },
    innerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 10,
    },
    order:{

        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgb(20, 24, 25)',
    },

    ruler: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },


});

// Make component available to other parts of the app
export default BillComponent;

