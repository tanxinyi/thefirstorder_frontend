import React, {Component} from 'react';
import {StyleSheet, Picker, View, Image, Button, Text, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {CheckBox} from "react-native-elements";


type Props = {};
class OrderItem extends Component<Props> {
    static navigationOptions = {
        title: "OrderItem",
    };
    constructor(props){
        super(props);
        this.state={
            PickerValue:''
        }
        this.navigate = this.props.navigation.navigate;
    };
    clickme=()=>{
        var data = this.state.PickerValue;
        if(data==""){
            alert("Please select one quantity");
        } else {
            alert(data);

        }

    };

    render(){
        const { navigate } = this.props.navigation;

        return (
            <View style = {styles.outerContainer}>
                <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                       style={styles.image} />

                <Text style = {styles.caption}> Creamy Chocolate Pie</Text>
                <Text style = {styles.description}> This creamy chocolate pie just looks super delicious. Mouth watering, delicious,yummy.</Text>

                <Picker style={styles.pickerStyle}
                    selectedValue={this.state.PickerValue}
                    onValueChange={(itemValue, itemIndex) => this.setState({PickerValue: itemValue})}>
                    <Picker.Item label = "Select quantity." value = ""/>

                    <Picker.Item label ="1" value = "1"/>
                    <Picker.Item label ="2" value = "2"/>
                </Picker>
                <View style = {styles.bottomContainer}>
                    <Text style = {{textAlign: 'left'}}> Customisation Options </Text>
                    <CheckBox
                        center
                        title='More chocolate'
                        checked={this.state.checked}
                    />

                </View>

                <TouchableOpacity onPress ={() =>
                    navigate('Cart', {
                        quantity: this.state.PickerValue
                    })
                } style = {styles.button}>
                    <Text style = {styles.textStyle}>
                        ADD TO CART
                    </Text>

                </TouchableOpacity >
            </View>
        );
    };
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },

    caption:{
        fontSize: 20,
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:15,
        fontWeight: 'bold',

    },

    image: {
        height: '40%',
        width: '100%',
    },

    button: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgb(249, 225, 127)',
        height:50,
        width: '100%',
        alignItems: 'center',
        borderColor: 'rgb(166, 145, 63)',
        borderWidth: 2,

    },

    description: {
        fontSize: 12,
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:20,
        paddingHorizontal: '10%',

    },

    textStyle:{
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:15,
    },

    pickerStyle:{
        width: '50%',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:15,

    },
    bottomContainer: {
        color: 'black',
        height: '100%',
        flex: 1,
    }

});

export default OrderItem