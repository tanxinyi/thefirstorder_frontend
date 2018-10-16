import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Image, PressRetentionOffset as right, FlatList} from 'react-native';
import axios from "axios";
import { Header, Button } from 'react-native-elements';
import "react-native-vector-icons";
import SeatingTable from './SeatingTable'
import MenuOverview from './MenuOverview'
import FoodPrices from './FoodPrices'
import FoodDetails from './FoodDetails'

class MenuList extends Component {
    state = {
        //table: [],
        seatingTable: {
            qrCode:'',
            restaurant:{
                restaurantId: '',
                name:'',
                description:'',
                contactNumber:'',
                street:'',
                postalCode:'',
                cuisine:''
            },
            capacity:''
        },


        menuOverview: {
            menuId:'',
            restaurant: {
                restaurantId: '',
                name:'',
                description:'',
                contactNumber:'',
                street:'',
                postalCode:'',
                cuisine:''
            },
            dateOfCreation: '',
            foodPrices: [
               {
                    price: '',
                    availability: '',
                    foodCustomisations: [],
                    food: {
                        foodId: '',
                        name: '',
                        description: '',
                        category: '',
                        tags: [
                            {
                                foodTagId: '',
                                description: ''
                            }
                        ]
                    }
                },
            ]


        }

    }

    static navigationOptions = {
        title: "MenuList",
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        let console = {
            log: function(msg){
                alert(msg);
            }
        }
        const ip = '10.0.2.2'; //leave this here
        //const ip = '10.168.1.20'

        const request = 'http://' + ip + ':8080/' + 'api/seatingTables/' + this.params.qrCodeString + '/'
        //const request = 'https://fjchng-menuitems.herokuapp.com/api/getMenuItems'
        axios.get(request)
            .then(response => {
                //console.log(response.data);
                this.setState({seatingTable: response.data});
                //this.setState({restaurant: this.state.seatingTable.restaurant});
            }).catch(response => console.log('request link: ' + request + '              error: ' + response));

// here we need to make restuarnt id dyamic
        const request2 = 'http://' + ip + ':8080/' + 'api/restaurants/R002/menu/'
       // const request2 = 'http://10.168.1.20:8080/api/restaurants/R002/menu'
        axios.get(request2)
            .then(response => {
                this.setState({menuOverview: response.data});
            }).catch(response => console.log('request link: ' + request2 + '              error: ' + response));

    };
//THIS STATEMENT GOT PROBLEM, if we remove .food, it is ok. but no items render
/*
    renderItems() {
        console.log('hello');
        return this.state.menuOverview.foodPrices.map(item => <FoodPrices key={item.foodId} foodPrices={item}/>);
    }
*/
    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', onPress: () => console.log('pressed') }}
                    //centerComponent={{ text: 'MENU' }}
                    centerComponent = {{ text: <Text> {this.state.seatingTable.restaurant.name} </Text> }}
                    rightComponent={{icon: 'home'}}
                />
                <Text>{this.params.qrCodeString}</Text>
                <Button
                    title = "See more inside this category!! Changed?"
                    onPress={() =>
                        navigate('Menu'
                        )
                    }
                />
                <Text>{this.state.seatingTable.restaurant.restaurantId}</Text>
                <Text>Is there anything here</Text>

                <Text> Display trying json stuff </Text>
                <FlatList
                    foodPrices = {this.state.foodPrices}
                    renderItem ={({item}) =>
                        <Text> {item.price} </Text>
                    }
                />


                <Text>{this.state.menuOverview.dateOfCreation}</Text>
                <Text>{this.state.menuOverview.foodPrices[0].price}</Text>
                <Text>{this.state.menuOverview.foodPrices[0].food.foodId}</Text>
                <Text>{this.state.menuOverview.foodPrices[0].food.name}</Text>
                <Text>{this.state.menuOverview.foodPrices[0].food.tags[0].description}</Text>




            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});

/*

import Icon from 'react-native-vector-icons/FontAwesome';
import MenuItem from "./MenuItem";
import FoodDetails from "./FoodDetails";


const customTextButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
    </Icon.Button>
)
*/

export default MenuList;