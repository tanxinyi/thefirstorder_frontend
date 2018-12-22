import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import axios from "axios";
import Categories from "./Categories";

class OrderMainPage extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params;
        this.state={
            qrCode: this.params.qrCodeString,
            //qrCode: 'T001',
            prefix: 'https://makanow.herokuapp.com/api/',
            seatingTable: {},
            restaurant: {},
            menu:{},
            mounted: false
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

        const request = this.state.prefix + "seatingTables/" + qrCode;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response => {
                this.setState({
                    seatingTable: response.data,
                    restaurant: response.data.restaurant
                })
                let request = this.state.prefix + "restaurants/" + response.data.restaurant.restaurantId + "/menu";
                console.log('Request: ' + request);
                axios.get(request)
                    .then(response => {
                        this.setState({
                            menu: response.data,
                            mounted: true
                        })
                    }).catch(error => console.log(error))
            }).catch(error => {
            console.log(error);
            this.props.navigation.navigate('ScanningPage',
                {
                    error: error
                })
        });
    }

    render() {
        console.log("Order Main Page");
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            return(
                <View>
                    {this.props.navigation.navigate('Categories', {
                        prefix:this.state.prefix,
                        seatingTable:this.state.seatingTable,
                        restaurant:this.state.restaurant,
                        menu:this.state.menu
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

export default OrderMainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});