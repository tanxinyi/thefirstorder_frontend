import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Image, PressRetentionOffset as right} from 'react-native';
import axios from "axios";
import { Header, Button } from 'react-native-elements';
import "react-native-vector-icons";

class MenuList extends Component {
    state = {
        table: []
    }

    static navigationOptions = {
        title: "Component",
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        axios.get('http://localhost:8080/api/table/registerTable', {
           params: {
            qrCode: this.params.qrCode}
        })
            .then(response => this.setState({table: response.data}))
            .catch(response => console.log('error' + response));
    }

    renderTable() {}


    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', onPress: () => console.log('pressed') }}
                    centerComponent={{ text: 'MENU' }}
                    rightComponent={{icon: 'home'}}
                />



                <Text> This is where the different categories will be at. Can click into differnt categories to go into individual catgory.  </Text>
                <Text>{this.state.table}</Text>

                <Button
                    title = "See more inside this category!!"
                    onPress={() =>
                        navigate('Menu'
                        )
                    }
                />

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

import Icon from 'react-native-vector-icons/FontAwesome';


const customTextButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
    </Icon.Button>
)

export default MenuList;