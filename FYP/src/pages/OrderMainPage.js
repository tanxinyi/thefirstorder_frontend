import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import axios from "axios";
import Categories from "./Categories";
import {connect} from "react-redux";

class OrderMainPage extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            email: 'CUS001@makanow.com',
            prefix: 'https://ad140f21.ngrok.io/api/',
            seatingTable: {},
            restaurant: {},
            menu:{},
            orderSummary:{},
            order:{},
            mounted1: false,
            mounted2: false
        }
    }

    componentWillMount(){
        let qrCode = this.params.qrCodeString;
        //let qrCode = this.state.qrCode;
        if(qrCode == ''){
            this.props.navigation.navigate('ScanningPage',
                {
                    error: 'No QR Code detected'
                })
        }

        let request = this.state.prefix + "seatingTables/" + qrCode;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response => {
                this.setState({
                    seatingTable: response.data,
                    restaurant: response.data.restaurant
                })

                // Get Menu
                let request = this.state.prefix + "restaurants/" + response.data.restaurant.restaurantId + "/menu";
                console.log('Request: ' + request);
                axios.get(request)
                    .then(response => {
                        this.setState({
                            menu: response.data,
                            mounted1: true
                        })
                    }).catch(error => console.log(error))


            }).catch(error => {
            console.log(error);
            this.props.navigation.navigate('ScanningPage',
                {
                    error: error
                })
        });

        //Get OrderID and OrderSummary
        request = this.state.prefix + "orderSummary/new/customer/" + this.state.email;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response => {
                this.setState({
                    orderSummary: response.data
                });

                //Get Order
                let request = this.state.prefix + "orders/new/orderSummary/" + response.data.orderSummaryId + "/seatingTable/" + qrCode;
                console.log('Request: ' + request);
                axios.get(request)
                    .then(response => {
                        this.setState({
                            order: response.data,
                            mounted2: true
                        })
                    })
            }).catch(error => console.log(error))
    }

    updateReducers(){
        this.props.updateSeatingTable(this.state.seatingTable);
        this.props.updateRestaurant(this.state.restaurant);
        this.props.updateMenu(this.state.menu);
        this.props.updateOrderId(this.state.order.orderId);
        this.props.updateOrderSummaryId(this.state.orderSummary.orderSummaryId);
    }

    render() {
        console.log("Order Main Page");
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted1 && this.state.mounted2){
            this.updateReducers()
            return(
                <View>
                    {this.props.navigation.navigate('Categories', {
                        prefix:this.state.prefix
                    })}
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        navigation: ownProps.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateSeatingTable: (seatingTable) => dispatch({
            type: 'UPDATE_SEATING_TABLE',
            payload: seatingTable
        }),
        updateRestaurant: (restaurant) => dispatch({
            type: 'UPDATE_RESTAURANT',
            payload: restaurant
        }),
        updateMenu: (menu) => dispatch({
            type: 'UPDATE_MENU',
            payload: menu
        }),
        updateOrderId: (orderId) => dispatch({
            type: 'UPDATE_ORDER_ID',
            payload: orderId
        }),
        updateOrderSummaryId: (orderSummaryId) => dispatch({
            type: 'UPDATE_ORDER_SUMMARY_ID',
            payload: orderSummaryId
        }),
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMainPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});