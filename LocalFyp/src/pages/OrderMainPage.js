import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Restaurant from '../components/Restaurant';
import axios from "axios";


class OrderMainPage extends React.Component{
    state = {
        prefix:'https://makanow.herokuapp.com/',
        seatingTable:{},
        restaurant:{},
        email:'',
        mounted: false,
        menu:{},
    }


    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        console.log("QRCODE: " + this.params.qrCodeString);
        if(this.params.qrCodeString == ''){
            this.props.navigation.navigate('ScanningPage',
                {
                    error: 'No QR Code detected'
                })
        }
        const request = this.state.prefix + "api/seatingTables/" + this.params.qrCodeString;
        console.log(request);
        axios.get(request)
            .then(response =>
                this.setState({
                    seatingTable: response.data,
                    restaurant: response.data.restaurant,
                    email: this.params.email,
                    mounted: true
                })
            ).catch(error => {
                console.log(error);
                this.props.navigation.navigate('ScanningPage',
                    {
                        error: error
                    })
            });
    };

    render() {
        console.log("Order Main Page");
        console.log(JSON.stringify(this.state));
        if(this.state.mounted){
            return(
                <Restaurant
                    prefix={this.state.prefix}
                    seatingTable = {this.state.seatingTable}
                    restaurant = {this.state.restaurant}
                    email = {this.state.email}
                    navigation = {this.props.navigation}
                />
            )
        }
        return(
            <Text>Loading...</Text>
        )
    }
}

export default OrderMainPage;