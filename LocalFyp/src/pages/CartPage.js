import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import OrderItem from "../components/OrderItem";

class CartPage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    renderOrderItems(){
        this.props.cart.map((orderItem, i) =>
            <OrderItem key={i}
                       orderItem={orderItem}
                       removeFromCart={this.props.removeFromCart}
                       removable={true}
            />)
    }
    render(){
        return(
            <View>
                {this.renderOrderItems()}
                <Button onPress={() => {
                    this.props.sendToBill();
                    this.props.navigation.navigate('Menu')
                    }}>
                    <Text>Send to kitchen</Text>
                </Button>
            </View>
        )
    }
}

export default CartPage;