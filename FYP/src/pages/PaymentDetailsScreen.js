import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
} from "react-native";
import OrderHeader from "../components/OrderHeader";

class PaymentDetailsScreen extends Component {
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        this.state={
            pkToken: 'sk_test_MvX8jEh7TbvLfYk6VqJzVEDM',
            cardNumber: '4242424242424242',
            cardExpMth: '12',
            cardExpYr: '2019',
            cardCVC: '123'
        }
    }

    render() {
        return (
            <View>
                <OrderHeader
                    enableBack={true}
                    title="PAYMENT"
                    onPress={this.props.navigation.navigate.goBack}
                    navigation={this.props.navigation}
                />
                <Text>Enter your card details</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text>Card Number: </Text>
                    <TextInput
                        style={styles.textbox}
                        onChangeText={(text) => this.setState({cardNumber: text})}
                        value={this.state.cardNumber}
                    />
                </View>
                <View style={{flexDirection: 'row' }}>
                    <Text>Expiry Date: </Text>
                    <TextInput
                        style={styles.textbox}
                        onChangeText={(text1) => this.setState({cardExpMth: text1})}
                        value={this.state.cardExpMth}
                    />
                    <Text> / </Text>
                    <TextInput
                        style={styles.textbox}
                        onChangeText={(text2) => this.setState({cardExpYr: text2})}
                        value={this.state.cardExpYr}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>CVC: </Text>
                    <TextInput
                        style={styles.textbox}
                        onChangeText={(text) => this.setState({cardCVC: text})}
                        value={this.state.cardCVC}
                    />
                </View>
                <Button
                    title='Submit'
                    onPress={()=>{
                        this.props.navigation.navigate('Confirmation', {
                            amount: this.params.prices.total_w_serviceCharge,
                            cardNumber: this.state.cardNumber,
                            cardExpMth: this.state.cardExpMth,
                            cardExpYr: this.state.cardExpYr,
                            cardCVC: this.state.cardCVC,
                            pkToken: this.state.pkToken,
                        })
                    }}
                />
            </View>
        );
    }
}

export default PaymentDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 3
    }
});