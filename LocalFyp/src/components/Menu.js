import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Category from './Category'
import axios from "axios";
import { Constainer, Headerab, Tab, Tabs, ScrollableTabe } from 'native-base';

class Menu extends React.Component{
    state = {
        prefix:'',
        qrCode:'',
        restaurantId:'',
        menuId:'',
        categories:[],
        mounted: false
    }


    constructor(props){
        super(props);
    }

    //get restaurantID based on seatingTable
    componentWillMount() {
        const request = this.props.prefix + "api/menu/" + this.props.menu.menuId + "/categories";
        console.log(request);
        axios.get(request)
            .then(response => this.setState({
                categories: response.data,
                prefix: this.props.prefix,
                qrCode: this.props.seatingTable.qrCode,
                restaurantId: this.props.restaurant.restaurantId,
                menuId: this.props.menu.menuId,
                mounted: true
            }))
            .catch(error => console.log(error));
    };

    renderCategories(){
        return this.state.categories.map(category =>
            <Category key={category.categoryId}
                      category={category}
                      menuId={this.state.menuId}
                      prefix={this.state.prefix}
            />);
    }

    render() {
        console.log("test3");
        if(this.state.mounted) {
            return (
                <Container>
                    <Header hasTabs/>
                    <Tabs renderTabBar={() => <ScrollableTab/>}>
                        {this.renderCategories()}
                    </Tabs>
                </Container>
            )
        }
        return(
            <Text>Loading...</Text>
        )
    }
}

export default Menu;