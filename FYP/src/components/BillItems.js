import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import BillItem from "./BillItem";

class BillItems extends Component {
    renderBillItem(items){
        console.log('Render bill items');
        console.log(items);
        return items.map((cartItem, i) => (
                <BillItem
                    key={i}
                    billItem={cartItem}
                    round2DP={this.round2DP}
                />
            )
        )
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

    //Need to test if service charge is applicable
    render() {
        console.log('BillItems');
        console.log('PROPS');
        console.log(this.props);
        let prices = this.calculatePrice(this.props.billItems);
        return (
            <View style={styles.container}>
                {this.renderBillItem(this.props.billItems)}
                <Text>Subtotal: $ {prices.subTotal}</Text>
                <Text>Service Charge: $ {prices.serviceCharge}</Text>
                <Text>GST: $ {prices.gst_w_serviceCharge}</Text>
                <Text>Total: $ {prices.total_w_serviceCharge}</Text>
            </View>
        );
    }
}

export default BillItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});