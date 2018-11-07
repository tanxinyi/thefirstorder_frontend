import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Categories from './Categories';
import axios from "axios";
import { MenuStack } from "../../Routes";
import { Container, Header, Tab, Tabs, ScrollableTab, Title, Body, Button, Icon, Right, Left } from 'native-base';

class Menu extends React.Component{
    state = {
        prefix:'',
        qrCode:'',
        restaurantId:'',
        menuId:'',
        mounted: false,
        cart : [],
        bill : [],
        orderId : '',
        orderSummaryId: '',
    }

    constructor(props){
        super(props);
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        console.log("componentWillMount Menu");
        if(this.state.orderId == ''){
            this.createOrder();
        }
    };

    createOrder(){
        let request = this.props.prefix + "api/orders/new/orderSummary/";
        if(this.state.mounted) {
            request += this.state.orderSummaryId;
        }else{
            request += this.props.orderSummary.orderSummaryId;
        }
        request += "/seatingTable/" + this.props.seatingTable.qrCode;
        axios.get(request)
            .then(response => this.setState({
                orderId: response.data.orderId,
                prefix: this.props.prefix,
                qrCode: this.props.seatingTable.qrCode,
                restaurantId: this.props.restaurant.restaurantId,
                menuId: this.props.menu.menuId,
                orderSummaryId: this.props.orderSummary.orderSummaryId,
                mounted: true
            }))
            .catch(error => console.log(error));
    }

    addToCart =(orderItem)=>{
        console.log("Adding to cart");
        console.log(JSON.stringify(this.state.cart));
        let cart = this.state.cart;
        cart.push(orderItem);
        this.setState({cart: cart});
        console.log("Added to cart");
        console.log(JSON.stringify(this.state.cart));
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

    sendToKitchen(){
        console.log("Sending to kitchen");
        const request = this.state.prefix + "api/customerOrders";
        axios.post(request, this.state.cart)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        if(this.state.mounted) {
            console.log("test4: Menu Mounted");
            const screenProps = {
                menuId: this.state.menuId,
                addToCart: this.addToCart.bind(this),
                prefix: this.props.prefix,
                orderId: this.state.orderId,
            };
            return (
                <Container>
                    <Header hasTabs>
                        <Left/>
                        <Body>
                        <Title>Menu</Title>
                        </Body>
                        <Right>
                            <Button onPress={()=>{
                                this.props.navigation.navigate('CartPage', {
                                    cart: this.state.cart,
                                    sendToBill: this.sendToBill.bind(this),
                                    removeFromCart: this.removeFromCart.bind(this),
                                    navigate: this.props.navigation
                                })
                            }}>
                                <Icon name="cart"/>
                            </Button>
                            <Button onPress={()=>{
                                this.props.navigation.navigate('BillPage', {
                                    bill: this.state.bill,
                                    navigate: this.props.navigation
                                })
                            }}>
                                <Icon name="paper"/>
                            </Button>
                        </Right>
                    </Header>
                    <MenuStack
                        screenProps={screenProps}
                        initialScreen={{name:'Categories'}}
                        style={{ width: Dimensions.get('window').width }}/>
                </Container>
            )
        }
        console.log("test3: Menu Unmounted");
        return(
            <Text>Loading Menu...</Text>
        )
    }
}

export default Menu;