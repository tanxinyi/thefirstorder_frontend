import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import { Header, Left, Body, Icon, Title} from 'native-base';
import OrderItem from "../components/OrderItem";
import axios from "axios";
import Menu from "../components/Menu";

class CartPage extends Component{

    constructor(props){
        super(props)
        this.state={
            orderId: this.props.navigation.state.params.orderId,
            orderSummaryId: this.props.navigation.state.params.orderSummaryId,
            cart: this.props.navigation.state.params.cart,
            bill: this.props.navigation.state.params.bill,
            prefix: this.props.navigation.state.params.prefix,
            qrCode: this.props.navigation.state.params.qrCode,
            restaurantId: this.props.navigation.state.params.restaurantId,
            menuId: this.props.navigation.state.params.menuId
        }
    }

    sendToKitchen(){
        console.log("Sending to kitchen");
        const request = this.state.prefix + "api/customerOrders";
        axios.post(request, this.state.cart)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    clearCart=()=>{
        console.log("Clearing cart");
        this.setState({cart:[]});
    }

    sendToBill=()=>{
        console.log("Adding to bill");
        console.log("Bill:" + JSON.stringify(this.state.bill));
        console.log("Cart:" + JSON.stringify(this.state.cart));
        console.log("Order ID: " + this.state.orderId);

        let bill = this.state.bill;
        bill.push(this.state.cart);
        this.setState({bill:bill});

        this.sendToKitchen();
        this.clearCart();
        this.createOrder();
        console.log("Added to bill");
        console.log("Bill:" + JSON.stringify(this.state.bill));
        console.log("Cart:" + JSON.stringify(this.state.cart));
        console.log("Order ID: " + this.state.orderId);
    }

    removeFromCart=(orderItem)=>{
        console.log("Removing from cart")
        console.log("Cart:" + JSON.stringify(this.state.cart));
        this.setState({cart: this.state.cart.filter(function(element){
                return JSON.stringify(element) != JSON.stringify(orderItem);
            })})
        console.log("Removed from cart");
        console.log("Cart:" + JSON.stringify(this.state.cart));
    }


    createOrder(){
        let request = this.state.prefix + "api/orders/new/orderSummary/" + this.state.orderSummaryId + "/seatingTable/" + this.state.qrCode;
        axios.get(request)
            .then(response => this.setState({
                orderId: response.data.orderId,
            }))
            .catch(error => console.log(error));
    }

    renderOrderItems(){
        console.log("Render Order Items")
        console.log(this.state.cart)
        return this.state.cart.map((orderItem, i) =>
            <OrderItem key={i}
                       orderItem={orderItem}
                       removeFromCart={this.removeFromCart.bind(this)}
                       removable={true}
            />)
    }
    render(){
        console.log("test15: CartPage");
        console.log(JSON.stringify(this.state.cart));
        if(this.state.cart == null){
            return(
                <View>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.goBack()} title='<'>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Cart</Title>
                        </Body>
                    </Header>
                    <Text>Cart is empty!</Text>
                </View>
            )
        }
        return(
            <View>
                <Header>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigation.navigate('Menu',{
                            prefix: this.state.prefix,
                            qrCode: this.state.qrCode,
                            restaurantId: this.state.restaurantId,
                            menuId: this.state.menuId,
                            orderSummaryId: this.state.orderSummaryId,
                            cart: this.state.cart,
                            bill: this.state.bill,
                            orderId: this.state.orderId,
                            navigation:this.props.navigation.state.params.navigation
                        })} title='<'>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cart</Title>
                    </Body>
                </Header>
                {this.renderOrderItems()}
                <Button onPress={() => {
                    this.sendToBill();
                    this.props.navigation.navigate('Menu',{
                        prefix: this.state.prefix,
                        qrCode: this.state.qrCode,
                        restaurantId: this.state.restaurantId,
                        menuId: this.state.menuId,
                        orderSummaryId: this.state.orderSummaryId,
                        cart: this.state.cart,
                        bill: this.state.bill,
                        orderId: this.state.orderId,
                        navigation:this.props.navigation.state.params.navigation
                    })
                    }} title='Send to kitchen'/>
            </View>
        )
    }
}

export default CartPage;