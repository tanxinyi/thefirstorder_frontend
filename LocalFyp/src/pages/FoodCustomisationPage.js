import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Category from '../components/Category'
import FoodPrices from "../components/FoodPrices";
import QuantityCounter from "../components/QuantityCounter";
import Remarks from "../components/Remarks";
import { Button } from 'native-base';
import MenuHeader from "../components/MenuHeader";

class FoodCustomisationPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            quantity:1,
            cart: this.props.navigation.state.params.cart,
            bill: this.props.navigation.state.params.bill,
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

    initializeCartAndBill=()=>{
        if(this.state.cart == undefined){
            this.setState({cart:[]});
        }
        if(this.state.bill == undefined){
            this.setState({bill:[]});
        }
    }


    render(){
        console.log("test14: Food Customisation Page");
        console.log(JSON.stringify(this.params));
        {this.initializeCartAndBill()}
        return(
            <View>
                <MenuHeader
                    navigation={this.props.navigation}
                    qrCode={this.params.qrCode}
                    orderId={this.params.orderId}
                    orderSummaryId={this.params.orderSummaryId}
                    cart={this.state.cart}
                    bill={this.params.bill}
                    prefix={this.params.prefix}
                    restaurantId={this.params.restaurantId}
                    menuId={this.params.menuId}
                    title={this.params.food.name}
                />
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
                    console.log(this.state.cart)
                    console.log(JSON.stringify(this.params))
                    this.state.cart.push({
                        quantity:this.state.quantity,
                        orderId: this.params.navigation.state.params.orderId,
                        foodId: this.params.food.foodId,
                        food: this.params.food,
                        remarks:this.state.text,
                        price: this.params.price
                    });
                    this.props.navigation.navigate('Menu',{
                        cart: this.state.cart,
                        bill: this.state.bill,
                        orderId: this.params.navigation.state.params.orderId,
                        orderSummaryId: this.params.navigation.state.params.orderSummaryId,
                        qrCode: this.params.navigation.state.params.qrCode,
                        restaurantId: this.params.navigation.state.params.restaurantId,
                        prefix: this.params.navigation.state.params.prefix,
                        navigate: this.params.navigation,
                        menuId: this.params.navigation.state.params.menuId,
                    })
                }}>
                    <Text>Add to Cart</Text>
                </Button>
            </View>
        );
    }
}

export default FoodCustomisationPage;