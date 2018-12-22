import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import CartIcon from "../components/CartIcon";
import {connect} from 'react-redux';

class FoodCustomisationPage extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            quantity: 1,
            remarks: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Food Customisation Page',
            headerRight:
                <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                    <CartIcon />
                </TouchableOpacity>
        }
    }

    increaseCount(){
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseCount(){
        if(this.state.quantity == 1){return}
        this.setState({quantity: this.state.quantity -1})
    }

    render() {
        console.log('FoodCustomisationPage');
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text>Food Customisation Page</Text>
                <Text>Food Name = {this.params.foodPrice.food.name}</Text>
                <Text>Food Description = {this.params.foodPrice.food.description}</Text>
                <Text>Food Price = {this.params.foodPrice.price}</Text>
                <Text>{this.params.foodPrice.availability ? '' : 'Sold Out'}</Text>
                <View>
                    <Button title='+' onPress={()=>{this.increaseCount()}} />
                    <Text>{this.state.quantity}</Text>
                    <Button title='-' onPress={()=>{this.decreaseCount()}} />
                    <TextInput
                        onChangeText={(text)=> this.setState({remark:text})}
                        value={this.state.remark}
                    />
                </View>
                <Button
                    title='Add to Cart!'
                    onPress={()=>{
                        let cartItem = {
                            id: '' + this.params.foodPrice.food.foodId + this.state.quantity + this.state.remarks,
                            orderId:'',
                            foodId:this.params.foodPrice.food.foodId,
                            name:this.params.foodPrice.food.name,
                            quantity:this.state.quantity,
                            remarks: this.state.remarks
                        }
                        Alert.alert(
                            'Add to cart',
                            'Add (' + this.state.quantity + ') ' +
                            this.params.foodPrice.food.name + ' to cart?',
                            [
                                {text: 'Yes', onPress: () => {
                                        this.props.addItemToCart(cartItem)
                                        this.props.navigation.navigate('Categories', {
                                            prefix:this.params.prefix,
                                            seatingTable:this.params.seatingTable,
                                            restaurant:this.params.restaurant,
                                            menu:this.params.menu
                                        })
                                    }},
                                {text: 'No', style:'cancel'}
                            ]
                        )

                    }}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        addItemToCart:(product) => dispatch({
            type: 'ADD_TO_CART',
            payload: product
        }),
        foodPrice: ownProps.foodPrice,
        prefix: ownProps.prefix,
        menu:ownProps.menu,
        seatingTable:ownProps.seatingTable,
        restaurant:ownProps.restaurant,
        navigation:ownProps.navigation
    }
}

export default connect(null, mapDispatchToProps)(FoodCustomisationPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});