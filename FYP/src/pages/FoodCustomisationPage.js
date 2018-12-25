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
import BillIcon from "../components/BillIcon";

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
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                        <CartIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('Bill')}>
                        <BillIcon />
                    </TouchableOpacity>
                </View>
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
        var date = new Date();
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
                            id: this.props.seatingInformation.orderId + date.getTime(),
                            orderId:this.props.seatingInformation.orderId,
                            foodId:this.params.foodPrice.food.foodId,
                            name:this.params.foodPrice.food.name,
                            price: this.params.foodPrice.price,
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
                                        this.props.navigation.goBack()
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

const mapStateToProps =(state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        navigation: ownProps.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        addItemToCart:(product) => dispatch({
            type: 'ADD_TO_CART',
            payload: product
        }),
        navigation:ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCustomisationPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});