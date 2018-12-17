import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import axios from "axios";
import MenuHeader from "./MenuHeader";
import { MenuStack } from "../../Routes";
import { Container, Header, Tab, Tabs, ScrollableTab, Title, Body, Button, Icon, Right, Left } from 'native-base';
import Category from "./Category";

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
        categories: [],
    }

    constructor(props){
        super(props);
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        console.log(JSON.stringify(this.state))
        console.log("componentWillMount Menu");
        if(this.props.menuId == undefined){
            this.props = this.props.navigation.state.params
        }
        console.log(JSON.stringify(this.props));
        const request = this.props.prefix + "api/menu/" + this.props.menuId + "/categories";
        console.log(request);
        axios.get(request)
            .then(response => {
                console.log(JSON.stringify(response.data));
                this.setState({
                    categories: response.data,
                    prefix: this.props.prefix,
                    qrCode: this.props.qrCode,
                    restaurantId: this.props.restaurantId,
                    menuId: this.props.menuId,
                    orderSummaryId: this.props.orderSummaryId,
                    cart: this.props.cart,
                    bill: this.props.bill,
                    orderId: this.props.orderId,
                    mounted: true
                })
            })
            .catch(error => console.log(error));
    }



    renderCategories(){
        console.log("test7: Categories renderCategories");
        return this.state.categories.map(category =>
            <Category key={category.categoryId}
                      category={category}
                      qrCode={this.state.qrCode}
                      orderId={this.state.orderId}
                      orderSummaryId={this.state.orderSummaryId}
                      cart={this.state.cart}
                      bill={this.state.bill}
                      prefix={this.state.prefix}
                      restaurantId={this.state.restaurantId}
                      menuId={this.state.menuId}
                      navigation={this.props.navigation}
                      title="Menu"
            />);
    }

    render() {
        if(this.state.mounted) {
            console.log("test4: Menu Mounted");
            return (
                <Container>
                    <MenuHeader
                        navigation={this.props.navigation}
                        qrCode={this.state.qrCode}
                        orderId={this.state.orderId}
                        orderSummaryId={this.state.orderSummaryId}
                        cart={this.state.cart}
                        bill={this.state.bill}
                        prefix={this.state.prefix}
                        restaurantId={this.state.restaurantId}
                        menuId={this.state.menuId}
                    />
                    {this.renderCategories()}
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