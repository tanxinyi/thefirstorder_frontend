import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Category from './Category'
import axios from "axios";
import { Container, Header, Tab, Tabs, ScrollableTab, Title, Body, Button, Icon, Right, Left } from 'native-base';

class Menu extends React.Component{
    state = {
        prefix:'',
        qrCode:'',
        restaurantId:'',
        menuId:'',
        categories:[],
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
        if(this.state.categories.length == 0){
            this.getCategories();
            this.createOrder();
        }
    };

    getCategories(){
        const request = this.props.prefix + "api/menu/" + this.props.menu.menuId + "/categories";
        console.log(request);
        axios.get(request)
            .then(response => this.setState({
                categories: response.data,
                prefix: this.props.prefix,
                qrCode: this.props.seatingTable.qrCode,
                restaurantId: this.props.restaurant.restaurantId,
                menuId: this.props.menu.menuId,
                orderSummaryId: this.props.orderSummary.orderSummaryId,
                mounted: true
            }))
            .catch(error => console.log(error));
    }

    createOrder(){
        let request = this.state.prefix + "api/orders/new/orderSummary/";
        if(this.state.mounted) {
            request += this.state.orderSummaryId;
        }else{
            request += this.props.orderSummary.orderSummaryId;
        }
        axios.get(request)
            .then(response => this.setState({
                orderId : response.data.orderId,
            }))
            .catch(error => console.log(error));
    }

    addToCart =(orderItem)=>{
        this.state.cart.push(orderItem);
    }

    clearCart=()=>{
        this.setState({cart:[]});
    }

    sendToBill=()=>{
        this.state.bill.push(this.state.cart);
        this.sendToKitchen();
        this.clearCart();
        this.createOrder();
    }

    removeFromCart=(orderItem)=>{
        this.setState({cart: this.state.cart.filter(function(element){
            return JSON.stringify(element) != JSON.stringify(orderItem);
        })})
    }

    sendToKitchen(){
        const request = this.state.prefix + "api/customerOrders";
        axios.post(request, this.state.cart)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    renderCategories(){
        console.log("test4.1");
        return this.state.categories.map(category =>
            <Category key={category.categoryId}
                     category={category}
                     menuId={this.state.menuId}
                     prefix={this.state.prefix}
                      orderId={this.state.orderId}
                     addToCart={this.addToCart}
            />);
    }

    render() {
        console.log("test3");
        if(this.state.mounted) {
            console.log("test4");
            return (
                <View>
                    <Header hasTabs>
                        <Left/>
                        <Body>
                            <Title>Menu</Title>
                        </Body>
                        <Right>
                            <Button onPress={()=>{
                                this.props.navigate('CartPage', {
                                    cart: this.state.cart,
                                    sendToBill: this.sendToBill,
                                    removeFromCart: this.removeFromCart,
                                    navigate: this.props.navigation
                                })
                            }}>
                                <Icon name="cart"/>
                            </Button>
                            <Button onPress={()=>{
                                this.props.navigate('BillPage', {
                                    bill: this.state.bill,
                                    sendToBill: this.sendToBill,
                                    removeFromCart: this.removeFromCart,
                                    navigate: this.props.navigation
                                })
                            }}>
                                <Icon name="alarm"/>
                            </Button>
                        </Right>
                    </Header>
                    {this.renderCategories()}
                </View>
            )
        }
        return(
            <Text>Loading...</Text>
        )
    }
}

export default Menu;