import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Restaurant from '../components/Restaurant'
import axios from "axios";


class OrderMainPage extends React.Component{
    state = {
        prefix:'http://29d8b376.ngrok.io/',
        seatingTable:{},
        restaurant:{},
        mounted: false,
        menu:{},
    }


    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        const request = this.state.prefix + "api/seatingTables/" + this.params.qrCodeString;
        console.log(request);
        axios.get(request)
            .then(response =>
                this.setState({
                    seatingTable: response.data,
                    restaurant: response.data.restaurant,
                    mounted: true
                })
            )
            .catch(error => console.log(error));
    };

    render() {
        if(this.state.mounted){
            return(
                <View>
                    <Text>{JSON.stringify(this.state.menu)}</Text>
                    <Restaurant
                        prefix={this.state.prefix}
                        seatingTable = {this.state.seatingTable}
                        restaurant = {this.state.restaurant}
                    />
                </View>
            )
        }
        return(
            <Text>Loading...</Text>
        )
    }
}

export default OrderMainPage;