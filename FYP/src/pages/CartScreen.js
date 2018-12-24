import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import CartItems from "../components/CartItems";
import {connect} from 'react-redux';

class CartScreen extends Component {
    static navigationOption = ({navigation}) => {
        return {
            headerTitle:'Cart'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.cartItems.length > 0 ?
                        <CartItems
                            cartItems={this.props.cartItems}
                            onPress={this.props.removeItem}
                        />
                    :
                    <Text>No items in your cart</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        billItems: state.billItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeItem: (product) => dispatch ({
            type:'REMOVE_FROM_CART',
            payload: product
        }),
        clearItems: () => dispatch ({
            type: 'CLEAR_CART',
            payload: null
        }),
        addToBill: (order) => dispatch ({
            type: 'ADD_TO_BILL',
            payload: order
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});