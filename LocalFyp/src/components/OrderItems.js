import React, { Component } from 'react';
import { View, Text} from 'react-native';
import OrderItem from "./OrderItem";

class OrderItems extends Component{

    renderOrderItems(){
        this.props.orderItems.map((orderItem, i) =>
            <OrderItem key={i}
                       orderItem={orderItem}
                       removable={false}
            />)
    }

    render(){
        return(
            <View>
                <Text>{this.props.orderItems[0].orderId}</Text>
                {this.renderOrderItems()}
            </View>
        )
    }
}

export default OrderItems;