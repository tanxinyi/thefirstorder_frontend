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
        this.params = this.props.navigation.state.params;
    }

    componentWillMount(){
        const request = this.params.prefix + "api/menu/" + this.params.menuId + "/category/" + this.params.category.categoryId;
        console.log(request);
        axios.get(request)
            .then(response=> this.setState({foodPrices:response.data, mounted:true}))
            .catch(error=> console.log(error));
    }

    renderFoodPrices(){
        console.log("test12: FoodPrices renderFoodPrices");
        console.log(JSON.stringify(this.state.foodPrices));
        return this.state.foodPrices.map(
            (foodPrice,i) => <FoodPrice key={i}
                                        foodPrice={foodPrice}
                                        addToCart={this.params.addToCart}
                                        orderId={this.params.orderId}
                                        navigation={this.props.navigation}
            />);
    }

    render(){

        if(this.state.mounted) {
            console.log("test10: FoodPrices Mounted");
            return (
                <View>
                    {this.renderFoodPrices()}
                </View>
            );
        }
        console.log("test11: FoodPrices Unmounted");
        return(
            <View>
                <Text>Loading FoodPrices...</Text>
            </View>
        )
    }

};

export default FoodPrices;