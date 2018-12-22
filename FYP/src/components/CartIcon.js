import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const CartIcon = (props) => (
    <View style={{padding:5}}>
        <View style={styles.container}>
            <Text style={styles.counter}>
                0
            </Text>
        </View>
        <Icon name='ios-cart' size={30}/>
    </View>
);

export default CartIcon;

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(95,197,123,0.8)',
        right: 15,
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
    },
    counter:{
        color: 'white',
        fontWeight: 'bold'
    }
})