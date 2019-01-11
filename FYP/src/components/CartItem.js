import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert, Image,
    Dimensions,
} from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import RF from "react-native-responsive-fontsize/index";
import {connect} from 'react-redux';

class CartItem extends Component {
    constructor(props){
        super(props)
        this.state={
            cartItem: this.props.cartItem
        }
    }

    render(){
        return (
            <Card containerStyle={{width: Dimensions.get('window').width}}>
                <View style = {styles.container}>
                    <View style = {styles.imageContainer}>
                        <Image source = {require('../images/explore.jpg')} style = {styles.logo}/>
                    </View>
                    <View style = {styles.itemDetailsContainer}>
                        <Text style = {styles.itemName}>{this.props.cartItem.name}</Text>
                        {this.props.cartItem.customisationOptions.map((option) => (
                            <Text style = {styles.itemCustomisation}key={option.customisationOptionId}>{option.name}</Text>
                        ))}
                    </View>
                    <View style = {styles.itemCountContainer}>
                        <Icon name='chevron-up' type='font-awesome' onPress={()=>{
                            this.props.increaseCount(this.props.cartItem);
                            this.setState({cartItem: this.state.cartItem});
                            console.log('Increase Count');
                        }} />
                        <Text style = {styles.itemName}>{this.state.cartItem.customerOrderQuantity}</Text>
                        <Icon name='chevron-down' type='font-awesome' onPress={()=>{
                            this.props.decreaseCount(this.props.cartItem);
                            this.setState({cartItem: this.state.cartItem});
                            console.log('Decrease Count')
                        }} />
                    </View>
                    <View style = {styles.itemPriceContainer}>
                        <Text style = {styles.price}> ${this.props.cartItem.customerOrderPrice} </Text>
                    </View>
                    <View style = {styles.icon}>
                        <Icon
                            style = {styles.delete}
                            name='delete'
                            type='AntDesign'
                            raised={false}
                            onPress={()=> {
                                Alert.alert(
                                    'Remove Item',
                                    'Remove ' + this.props.cartItem.name + ' from cart?',
                                    [
                                        {text: 'Yes', onPress: () => this.props.onPress(this.props.cartItem)},
                                        {text: 'No', style:'cancel'}
                                    ]
                                )
                            }}
                        />
                    </View>
                </View>

            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        cartItem: ownProps.cartItem,
        onPress: ownProps.onPress,
        increaseCount: (cartItem) => dispatch({
            type: 'INCREASE_QUANTITY',
            payload: cartItem
        }),
        decreaseCount: (cartItem) => dispatch({
            type: 'DECREASE_QUANTITY',
            payload: cartItem
        })
    }
}

export default connect(null, mapDispatchToProps)(CartItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    imageContainer:{
        flex: 1,
        height: 70,
        width: 140,
        backgroundColor: 'red',
    },

    itemDetailsContainer:{
        flex:1.8,
        alignItems:'center',
        justifyContent: 'center',

    },

    itemCountContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },

    itemPriceContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },

    logo:{
        flex:1 ,
        width: undefined,
        height: undefined
    },
    itemName: {
        fontSize: RF(2.5),
        color: 'black',
        textAlign: 'center',
    },

    itemCustomisation: {
        fontSize: RF(2),
        textAlign: 'center',
    },

    delete:{
        alignSelf: 'flex-end',
        marginTop: -5,
    },
    price: {
        fontSize: RF(2.5),
        color: 'black',
        textAlign: 'center',
    },
    icon:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },

})