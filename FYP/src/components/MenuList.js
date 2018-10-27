import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Image, PressRetentionOffset as right, FlatList} from 'react-native';
import axios from "axios";
import { Header, Button } from 'react-native-elements';
import "react-native-vector-icons";
import Category from './Category';

class MenuList extends Component {
    state = {
        //seatingTable: {},
        //menuOverview: {},

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

        menu: {
            menuId:'',
            dateOfCreation: ''
        },
        categories: [],
        foodPrice: [],

    }

    /*
    static navigationOptions = {
        title: "MenuList",
    };
    */

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
        const prefix = 'http://' + ip + ':8080/api'

        const request = prefix + '/seatingTables/' + this.params.qrCodeString + '/'
        //const request = 'https://fjchng-menuitems.herokuapp.com/api/getMenuItems'
        axios.get(request)
            .then(response => {
                //console.log(request);
                this.setState({seatingTable: response.data});


                const restaurantId = response.data.restaurant.restaurantId;
                const request = prefix + '/restaurants/' + restaurantId + '/menu'
                axios.get(request)
                    .then(response => {
                        //set menu based on restaurantID
                        //response as below for R002
                        /*
                        {
                            "menuId": "M002",
                            "dateOfCreation": "2018-01-01"
                        }
                         */
                        this.setState({menu: response.data});

                        //extract menuID
                        const menuId = response.data.menuId;
                        console.log(menuId);
                        const request = prefix + '/menu/'+ menuId +'/categories'
                        axios.get(request)
                            .then(response =>{
                                this.setState({categories: response.data})
                                console.log(this.state.categories);
                            }).catch(response => console.log('request link: ' + request + '              error: ' + response));
                    }).catch(response => console.log('request link: ' + request + '              error: ' + response));
            }).catch(response => console.log('request link: ' + request + '              error: ' + response));
    };

    renderCategories() {
        return this.state.categories.map(cat => <Category key={cat.categoryId} category={cat} />);
    }
    render() {
        const { navigate } = this.props.navigation;
        let console = {
            log: function(msg){
                alert(msg);
            }
        }

        return (

            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', onPress: () => console.log('pressed') }}
                    //centerComponent={{ text: 'MENU' }}
                    centerComponent = {{ text: <Text> Menu </Text> }}
                    rightComponent={{icon: 'shopping-cart'}}
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
                {this.renderCategories()}
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

export default MenuList;