import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import {connect} from "react-redux";
import BillItems from "../components/BillItems";

class BillScreen extends Component {
    static navigationOption = ({navigation}) => {
        return {
            headerTitle: 'Bill'
        }
    }

    calculatePrice(items){
        let subTotal = 0.0;
        for(var i = 0; i < items.length; i++){
            subTotal += items[i].price * items[i].quantity;
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
                        <Button
                            title='Pay'
                            onPress={()=> this.props.navigation.navigate('PaymentDetails', {
                                prices: prices
                            })}
                        />
                    </View>
                    :
                    <Text>No items in your bill</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        billItems: state.billItems
    }
}

export default connect(mapStateToProps)(BillScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});