import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, Dimensions, TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import BillItems from "../components/BillItems";
import RF from "react-native-responsive-fontsize/index";
import OrderHeader from "../components/OrderHeader";

class BillScreen extends Component {
    calculatePrice(items){
        let subTotal = 0.0;
        for(var i = 0; i < items.length; i++){
            subTotal += items[i].customerOrderPrice * items[i].customerOrderQuantity;
        }

        let serviceCharge = subTotal * 0.1;
        let gst_w_serviceCharge = (subTotal + serviceCharge) * 0.07;
        let gst = subTotal * 0.07;
        return {
            subTotal: this.round2DP(subTotal),
            serviceCharge: this.round2DP(serviceCharge),
            gst_w_serviceCharge: this.round2DP(gst_w_serviceCharge),
            gst: this.round2DP(gst),
            total_w_serviceCharge: this.round2DP(subTotal + serviceCharge + gst_w_serviceCharge),
            total: this.round2DP(subTotal + gst)
        }
    }

    round2DP(value){
        return Number(Math.round(value + 'e2') + 'e-2').toFixed(2)
    }

    render() {
        let prices = this.calculatePrice(this.props.billItems);
        return (
            <View style={styles.container}>
                <OrderHeader
                    navigation={this.props.navigation}
                    title='Bill'
                    enableBack={true}
                    onPress={this.props.navigation.goBack}
                />
                {this.props.billItems.length > 0 ?
                    <View>
                            <BillItems
                                billItems={this.props.billItems}
                                round2DP={this.round2DP}
                            />
                            <Text>Subtotal: $ {prices.subTotal}</Text>
                            <Text>Service Charge: $ {prices.serviceCharge}</Text>
                            <Text>GST: $ {prices.gst_w_serviceCharge}</Text>
                            <Text>Total: $ {prices.total_w_serviceCharge}</Text>

                        <TouchableOpacity
                            style={ styles.button}
                            onPress={()=> this.props.navigation.navigate('PaymentDetails', {
                                prices: prices,
                                prefix: this.props.prefix
                            })}
                        >
                            <Text style = {styles.text}>PAYMENT</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text>No items in your bill</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        billItems: state.billItems,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps)(BillScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button:{
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.40,
        borderRadius: 30,
        bottom: '0%',
        backgroundColor: "#F67075",
        alignSelf:'center',
    },
    text:{
        fontSize: RF(2.5),
        color: 'white',
    },
    totalContainer:{
        position:'absolute',
        right: '10%',
    }

});