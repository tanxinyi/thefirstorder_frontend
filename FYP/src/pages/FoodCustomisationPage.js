import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity
} from "react-native";
import CartIcon from "../components/CartIcon";

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
                        alert('Item added to cart!')
                        let cartItem = {
                            orderId:'',
                            foodId:this.params.foodPrice.food.foodId,
                            quantity:this.state.quantity
                        }
                        console.log(cartItem)
                        this.props.navigation.navigate('Categories', {
                            prefix:this.params.prefix,
                            seatingTable:this.params.seatingTable,
                            restaurant:this.params.restaurant,
                            menu:this.params.menu
                        })
                    }}
                />
            </View>
        );
    }
}

export default FoodCustomisationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});