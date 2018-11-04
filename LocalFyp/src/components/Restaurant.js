import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Menu from "./Menu";
import axios from "axios";

class Restaurant extends React.Component{
    state = {
        menu:{},
        mounted: false
    }


    constructor(props){
        super(props);
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        const request = this.props.prefix + "api/restaurants/" + this.props.restaurant.restaurantId + "/menu";
        console.log(request);
        axios.get(request)
            .then(response => this.setState({menu: response.data, mounted: true}))
            .catch(error => console.log(error));
    };

    render() {
        console.log("test2");
        if(this.state.mounted){
            return(
                <Menu
                    prefix ={this.props.prefix}
                    seatingTable = {this.props.seatingTable}
                    restaurant = {this.props.restaurant}
                    menu = {this.state.menu}
                />
            )
        }
        return(
            <Text>Loading...</Text>
    )
    }
}

export default Restaurant;