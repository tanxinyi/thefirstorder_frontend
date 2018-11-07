import React, {Component} from 'react';
import {Card, Container} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import Category from './Category';

class Categories extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mounted: false,
            categories: [],
        }
    }

    componentWillMount(){
        console.log(JSON.stringify(this.props.screenProps));
        const request = this.props.screenProps.prefix + "api/menu/" + this.props.screenProps.menuId + "/categories";
        console.log(request);
        axios.get(request)
            .then(response => this.setState({
                categories: response.data,
                mounted: true
            }))
            .catch(error => console.log(error));
    }

    renderCategories(){
        console.log("test7: Categories renderCategories");
        return this.state.categories.map(category =>
            <Category key={category.categoryId}
                      category={category}
                      menuId={this.props.screenProps.menuId}
                      prefix={this.props.screenProps.prefix}
                      orderId={this.props.screenProps.orderId}
                      addToCart={this.props.screenProps.addToCart}
            />);
    }

    render(){
        if(this.state.mounted) {
            console.log("test5: Categories Mounted");
            console.log(JSON.stringify(this.state.categories))
            return (
                <Card>
                    {this.renderCategories()}
                </Card>
            );
        }
        console.log("test6: Categories Unmounted");
        return(
            <View>
                <Text>Loading Categories...</Text>
            </View>
        )
    }

};

export default Categories;