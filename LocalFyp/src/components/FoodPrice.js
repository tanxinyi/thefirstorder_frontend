import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class FoodPrice extends Component{

    testAvailability(){
        if(!this.props.foodPrice.availability){
            return(
                <Text>Sold Out!</Text>
            )
        }
    }
    render(){
        console.log("test13: FoodPrice");
        console.log(JSON.stringify(this.props.foodPrice));
        return(
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('FoodCustomisationPage',
                    {
                        food : this.props.foodPrice.food,
                        price : this.props.foodPrice.price,
                        cart: this.props.cart,
                        bill: this.props.bill,
                        orderId: this.props.orderId,
                        orderSummaryId: this.props.orderSummaryId,
                        qrCode: this.props.qrCode,
                        restaurantId: this.props.restaurantId,
                        prefix: this.props.prefix,
                        menuId: this.props.menuId,
                        navigation: this.props.navigation
                    })}>
                <Text>Food Name: {this.props.foodPrice.food.name}</Text>
                <Text>Description: {this.props.foodPrice.food.description}</Text>
                <Text>Image: {this.props.foodPrice.food.img_Path}</Text>
                <Text>Price: {this.props.foodPrice.price}</Text>
                {this.testAvailability()}
            </TouchableOpacity>
        )
    }
}

export default FoodPrice;