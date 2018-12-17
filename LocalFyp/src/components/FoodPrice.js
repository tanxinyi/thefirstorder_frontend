import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

class FoodPrice extends Component{

    testAvailability(){
        if(!this.props.foodPrice.availability){
            return(
                <Text>Sold Out!</Text>
            )
        }
    }
    render(){
        console.log("test13: FoodPrice");
        console.log(JSON.stringify(this.props.foodPrice));
        return(
            <View>
            <View style = {styles.innerContainer}>
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('FoodCustomisationPage',
                        {
                            food : this.props.foodPrice.food,
                            price : this.props.foodPrice.price,
                            cart: this.props.cart,
                            bill: this.props.bill,
                            orderId: this.props.orderId,
                            orderSummaryId: this.props.orderSummaryId,
                            qrCode: this.props.qrCode,
                            restaurantId: this.props.restaurantId,
                            prefix: this.props.prefix,
                            menuId: this.props.menuId,
                            navigation: this.props.navigation
                        })}>
                    <Image style={styles.image}
                           source={require('../images/MakaNowLogo.png')}/>
                    <View style = {styles.rightContainer}>
                        <Text style = {styles.caption}> {this.props.foodPrice.food.name}</Text>
                        <Text>{this.props.foodPrice.food.description}</Text>
                        <Text style = {styles.price}>{this.props.foodPrice.price}</Text>
                        <Text style = {styles.caption2}> {this.testAvailability()} </Text>
                    </View>
                    {this.testAvailability()}
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = {
    innerContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        height: '23%',
        zIndex: -1,
        paddingBottom: '25%',

    },
    image: {
        height: '100%',
        width: '35%',
        padding: '10%',
        top: 10,
    },
    rightContainer: {
        width: '65%',
        height: 100,
        position: 'absolute',
        right: 0,
        padding: '5%',
        alignItems: 'center',
        backgroundColor: '#D8412F',


    },
    categoryName: {
        align: 'center',
        fontFamily: 'Biko_Regular',
        fontSize: 30,
        top:10,

    },

    caption:{
        fontWeight: 'bold',
        fontSize: 15,
        fontStyle:'italic',
        fontFamily: 'Biko_Regular',

    },
    caption2:{
        fontWeight: 'bold',
        fontSize: 15,
        fontStyle:'italic',
        fontFamily: 'Biko_Regular',
        color: 'white',

    },

    price: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontFamily: 'Biko_Regular',

    },

    availability: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        color: 'white',
        fontFamily: 'Biko_Regular',

    }
};


export default FoodPrice;