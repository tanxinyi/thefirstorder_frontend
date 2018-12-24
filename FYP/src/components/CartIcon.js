import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

const CartIcon = (props) => (
    <View style={{padding:5}}>
        <View style={styles.container}>
            <Text style={styles.counter}>
                {props.cartItems.length}
            </Text>
        </View>
        <Icon name='ios-cart' size={30}/>
    </View>
);

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(CartIcon);

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