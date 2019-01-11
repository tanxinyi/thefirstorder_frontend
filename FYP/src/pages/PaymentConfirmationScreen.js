import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import axios from 'axios';
import {connect} from 'react-redux';
import OrderMainPage from "./OrderMainPage";
import OrderHeader from "../components/OrderHeader";

class PaymentConfirmationScreen extends Component {
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        this.state={
            rejected: false,
            accepted: false,
            pressed: false,
            config: {
                        headers: { 'Authorization': "bearer " + this.params.pkToken }
                    }
        }
    }

    stripeTokenCall(){
        let request = "https://api.stripe.com/v1/" + "tokens?" + this.addTokenParams();
        console.log('REQUEST:');
        console.log(request);

        axios.post(request, {}, this.state.config)
            .then(response => {
                console.log(response)
                this.stripeChargeCall(response.data.id)
            }).catch(error => {
                console.log("Token Call Failed");
                console.log(error);
                this.setState({
                    rejected: true
                })
            })
    }

    stripeChargeCall(token){
        let request = "https://api.stripe.com/v1/" + "charges?" + this.addChargesParams(token);
        console.log('REQUEST:');
        console.log(request);

        axios.post(request, {}, this.state.config)
            .then(response=>{
                console.log(response)
                this.updatePaymentStatus()
            }).catch(error => {
                console.log("Charges Call Failed");
                console.log(error);
                this.setState({
                    rejected: true
                })
            })
    }

    updatePaymentStatus(){
        //To update db status with order summary id
        let request = this.props.prefix + "/orderSummary/" + this.props.seatingInformation.orderSummaryId + this.addUpdatePaymentParams();
        console.log('REQUEST:');
        console.log(request);
        axios.put(request)
            .then(response=> this.setState({accepted: true}))
            .catch(error=> {
                console.log("Update Payment failed");
                console.log(error)
            })

    }

    addUpdatePaymentParams(){
        let output = '?';
        output += 'status=' + "Paid";
        output += '&amount=' + parseInt(this.params.amount*100, 10);

        return output;
    }

    addTokenParams(){
        let output = '';
        output += 'card[number]=' + this.params.cardNumber;
        output += '&card[exp_month]=' + this.params.cardExpMth;
        output += '&card[exp_year]=' + this.params.cardExpYr;
        output += '&card[cvc]=' + this.params.cardCVC;

        return output;
    }

    addChargesParams(token){
        let output = '';
        output += 'amount=' + parseInt(this.params.amount*100, 10);
        output += '&currency=' + 'sgd';
        output += '&source=' + token;
        output += '&description=' + '';

        return output;
    }



    render() {
        return (
            <View>
                <OrderHeader
                    enableBack={false}
                    title="PAYMENT"
                    navigation={this.props.navigation}
                />
                <Text>Payment details are as follows</Text>
                <Text> </Text>
                <Text>Amount Payable: $ {this.params.amount}</Text>
                <Text>Card Number: XXXX-XXXX-XXXX-{this.params.cardNumber.substring(12)}</Text>
                <Text>Card Expiry: {this.params.cardExpMth}/{this.params.cardExpYr} </Text>
                {!this.state.pressed ?
                    <Button
                        title='Confirm'
                        onPress={()=> {
                            this.setState({pressed: true})
                            this.stripeTokenCall()
                        }}
                    />
                    :
                    <View>
                        {this.state.accepted ?
                            <View>
                                <Text>Payment is successful</Text>
                                <Text>Thank you for dining with us! </Text>
                                <Button
                                    title='Home'
                                    onPress={() => this.props.navigation.navigate('Home')}
                                />
                            </View>
                            :
                            this.state.rejected ?
                                <View>
                                    <Text>Payment is unsuccessful</Text>
                                    <Button
                                        title='Try Again'
                                        onPress={() => this.props.navigation.navigate('PaymentDetails')}
                                    />
                                </View>
                                :
                                <Text>Please wait...</Text>
                        }
                    </View>
                }

            </View>
        );
    }
}

const mapStateToProps =(state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps)(PaymentConfirmationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});