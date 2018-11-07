import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Category from '../components/Category'
import FoodPrices from "../components/FoodPrices";
import QuantityCounter from "../components/QuantityCounter";
import Remarks from "../components/Remarks";
import { Button } from 'native-base';

class FoodCustomisationPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            quantity:1,
        }
        this.params = this.props.navigation.state.params;
    }

    increaseCount(){
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseCount(){
        if(this.state.quantity == 1){return}
        this.setState({quantity: this.state.quantity -1})
    }

    render(){
        console.log("test14: Food Customisation Page");
        console.log(JSON.stringify(this.params));
        return(
            <View>
                <Text> FoodCustomisation Page is here! </Text>
                <Text> Food Image: {this.params.food.img_Path}</Text>
                <Text> Food Name: {this.params.food.name}</Text>
                <Text> Description: {this.params.food.description}</Text>
                <Button onPress={()=>{this.increaseCount()}}>
                    <Text>Increase Quantity</Text>
                </Button>
                <Text>{this.state.quantity}</Text>
                <Button onPress={()=>{this.decreaseCount()}}>
                    <Text>Decrease Quantity</Text>
                </Button>
                <TextInput
                    onChangeText={(text)=> this.setState({text:text})}
                    value={this.state.text}
                />
                <Button onPress={()=>{
                    this.params.addToCart({
                        quantity:this.state.quantity,
                        orderId: this.params.orderId,
                        foodId: this.params.food.foodId,
                        food: this.params.food,
                        remarks:this.state.text,
                        price: this.params.price
                    });
                    this.props.navigation.navigate('Categories',{
                        navigation: this.params.navigation
                    })
                }}>
                    <Text>Add to Cart</Text>
                </Button>
            </View>
        );
    }
}

export default FoodCustomisationPage;