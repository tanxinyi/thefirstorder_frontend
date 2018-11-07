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
                        menuId : this.props.foodPrice.menuFoodId.menuId,
                        price : this.props.foodPrice.price,
                        addToCart : this.props.addToCart,
                        orderId: this.props.orderId,
                        navigation: this.props.navigation,
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