import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import CartItem from "./CartItem";

class CartItems extends Component {
    renderCartItem(items){
        console.log('Render cart items');
        console.log(items);
        return items.map((cartItem, i) => (
                <CartItem
                    key={i}
                    onPress={this.props.onPress}
                    cartItem={cartItem}
                />
            )
        )
    }
    render() {
        console.log('CartItems');
        console.log('PROPS');
        console.log(this.props);
        return (
            <View style={styles.container}>
                {this.renderCartItem(this.props.cartItems)}
            </View>
        );
    }
}

export default CartItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});