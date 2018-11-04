import React, {Component} from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Text, View} from 'react-native';

class Category extends React.Component{

    constructor(props){
        super(props);
        this.state={
            foodPrice: [],
            mounted: false,
        }
    }

    componentWillMount(){
        const request = this.props.prefix + "api/menu/" + this.props.menuId + this.props.category.categorgyId
        axios.get(request)
            .then(response=> this.setState({foodPrice:response.data}))
    }

    render(){
        return (
            <Tab heading={props.category.categoryId}>
            </Tab>
        );
    }

    /*
    <View>
        <Text>Test</Text>
        <Text>CategoryID: {props.category.categoryId}</Text>
        <Text>CategoryName: {props.category.categoryName}</Text>
        <Text>CatImg: {props.category.catImg}</Text>
        <Text>MenuID: {props.menuId}</Text>
    </View>
     */
};

export default Category;