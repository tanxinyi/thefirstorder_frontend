import React, {Component} from 'react';
import {Card} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import FoodPrice from './FoodPrice';

class FoodPrices extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mounted: false,
            foodPrices: [],
        }
        this.params = this.props.navigation.state.params
    }

    componentWillMount(){
        const request = this.params.prefix + "api/menu/" + this.params.menuId + "/category/" + this.params.categoryId;
        console.log(request);
        axios.get(request)
            .then(response=> this.setState({foodPrice:response.data, mounted:true}))
            .catch(error=> console.log(error));
    }

    renderFoodPrices(){
        console.log("test7");
        return this.state.foodPrices.map(
            (foodPrice,i) => <FoodPrice key={i}
                                        foodPrice={foodPrice}
                                        addToCart={this.props.addToCart}
                                        orderId={this.props.orderId}
                                        navigation={this.props.navigation}
            />);
    }

    render(){
        console.log("test8");
        if(this.state.mounted) {
            console.log("test9");
            return (
                <View>
                    {this.renderFoodPrices()}
                </View>
            );
        }
        return(
            <Text>Loading...</Text>

        )
    }

};

export default FoodPrices;