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
                    round2DP={this.props.round2DP}
                />
            )
        )
    }

    //Need to test if service charge is applicable
    render() {
        console.log('BillItems');
        console.log('PROPS');
        console.log(this.props);
        return (
            <View style={styles.container}>
                {this.renderBillItem(this.props.billItems)}
            </View>
        );
    }
}

export default BillItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    }
});