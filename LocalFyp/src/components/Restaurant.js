import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Menu from "./Menu";
import axios from "axios";

class Restaurant extends React.Component{
    state = {
        menuId:'',
        orderSummaryId:"",
        orderId: '',
        mounted: false
    }


    constructor(props){
        super(props);
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        let request = this.props.prefix + "api/restaurants/" + this.props.restaurant.restaurantId + "/menu";
        console.log(request);
        axios.get(request)
            .then(response => this.setState({menuId: response.data.menuId}))
            .catch(error => console.log(error));
        request = this.props.prefix + "api/orderSummary/new/customer/" + this.props.email;
        console.log(request);
        axios.get(request)
            .then(response => {
                this.setState({orderSummaryId: response.data.orderSummaryId});
                request = this.props.prefix + "api/orders/new/orderSummary/" + response.data.orderSummaryId + "/seatingTable/" + this.props.seatingTable.qrCode;
                axios.get(request)
                    .then(response => this.setState({
                        orderId: response.data.orderId,
                        mounted: true
                    }))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    render() {
        console.log("test1: Restaurant Unmounted");
        if(this.state.mounted){
            console.log("test2: Restaurant Mounted")
            console.log("PROPS:" + JSON.stringify(this.props))
            console.log("STATE:" + JSON.stringify(this.state))
            return(
                <Menu
                    prefix ={this.props.prefix}
                    qrCode = {this.props.seatingTable.qrCode}
                    restaurantId = {this.props.restaurant.restaurantId}
                    menuId = {this.state.menuId}
                    orderSummaryId = {this.state.orderSummaryId}
                    orderId = {this.state.orderId}
                    navigation = {this.props.navigation}
                    cart={[]}
                    bill={[]}
                />
            )
        }
        return(
            <Text>Loading...</Text>
    )
    }
}

export default Restaurant;