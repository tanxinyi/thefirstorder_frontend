import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert, Dimensions, TouchableOpacity
} from "react-native";
import CartItems from "../components/CartItems";
import {connect} from 'react-redux';
import axios from "axios";
import RF from "react-native-responsive-fontsize/index";
import OrderHeader from "../components/OrderHeader";

class CartScreen extends Component {
    static navigationOption = ({navigation}) => {
        return {
            headerTitle:'Cart'
        }
    }

    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state ={
            mounted1: false,
            mounted2: false
        }
    }

    sendToBill(){
        console.log('Adding current items to bill');
        console.log('BEFORE:');
        console.log(this.props.billItems);

        this.props.addToBill(this.props.cartItems);

        console.log('AFTER: ');
        console.log(this.props.billItems);
    }

    clearCart(){
        console.log('Clearing current cart items');
        console.log('BEFORE:');
        console.log(this.props.cartItems);

        this.props.clearItems();

        console.log('AFTER: ');
        console.log(this.props.cartItems);
    }

    getNewOrderId(){
        console.log('Get New Order Id');
        let request = this.props.prefix + "/orders/new/orderSummary/" + this.props.seatingInformation.orderSummaryId;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response=> {
                this.props.updateOrderId(response.data.orderId)
                this.setState({
                    mounted1:true
                })
            }).catch(error=> console.log(error));
    }

    sendToBackEnd(orders){
        console.log('Sending orders to backend');
        let request = this.props.prefix + "/customerOrders";
        console.log('Request: ' + request);
        console.log('Body:');
        console.log(orders);

        axios.post(request, orders)
            .then(response => {
                console.log('Response (send order): ');
                console.log(response.data);
                this.setState({
                    mounted2: true
                })
            }).catch(error => console.log(error))
    }

    render() {
        console.log('Cart Screen');
        console.log('OrderID: ' + this.props.seatingInformation.orderId);
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted1 && this.state.mounted2){
            Alert.alert(
                'Sent!',
                'Orders have been sent to kitchen!',
                [{
                    text:'Ok', onPress: ()=> {
                        this.props.navigation.goBack()
                    }
                }]
            )
        }
        return (
            <View style={styles.container}>
                <OrderHeader
                    navigation={this.props.navigation}
                    title='Cart'
                    enableBack={true}
                    onPress={this.props.navigation.goBack}
                />
                {this.props.cartItems.length > 0 ?
                    <View>
                        <CartItems
                            cartItems={this.props.cartItems}
                            onPress={this.props.removeItem}
                        />
                        <View style = {styles.bottomContainer}>
                            <TouchableOpacity style = {styles.clearCartContainer}>
                                <Text style = {styles.clearCartText}>CLEAR CART</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.button}
                                              onPress={()=> {
                                                  Alert.alert(
                                                      'Sent orders to kitchen?',
                                                      'Action cannot be reversed',
                                                      [
                                                          {text: 'Yes', onPress: () => {
                                                                  this.getNewOrderId();
                                                                  this.sendToBill();
                                                                  this.sendToBackEnd(this.props.cartItems);
                                                                  this.clearCart();
                                                              }},
                                                          {text: 'No', style:'cancel'}
                                                      ]
                                                  )
                                              }}
                            >
                                <Text>CONFIRM ORDER</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                    :
                    <Text>No items in your cart</Text>
                }

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cartItems: state.cartItems,
        billItems: state.billItems,
        seatingInformation: state.seatingInformation,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        removeItem: (product) => dispatch ({
            type:'REMOVE_FROM_CART',
            payload: product
        }),
        clearItems: () => dispatch ({
            type: 'CLEAR_CART',
            payload: null
        }),
        addToBill: (orders) => dispatch ({
            type: 'ADD_TO_BILL',
            payload: orders
        }),
        updateOrderId: (orderId) => dispatch ({
            type: 'UPDATE_ORDER_ID',
            payload: orderId
        }),
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.40,
        borderRadius: 30,
        bottom: '0%',
        backgroundColor: "#F67075",
    },
    clearCartContainer:{
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: 'white',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.40,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    clearCartText:{
        fontSize: RF(2.5),
        color: 'grey',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1,
    }

});