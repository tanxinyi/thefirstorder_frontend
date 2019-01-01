import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import CartIcon from "../components/CartIcon";
import {connect} from 'react-redux';
import BillIcon from "../components/BillIcon";
import axios from "axios";

class FoodCustomisationPage extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            customisations: [],
            mounted: false,
            quantity: 1,
            remarks: '',
            selectedCustomisation: []
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

    componentWillMount(){
        let request = this.params.prefix + "customisation/menu/" + this.params.foodPrice.menuFoodCatId.menuId
            + "/food/" + this.params.foodPrice.menuFoodCatId.foodId
            + "/category/" + this.params.foodPrice.menuFoodCatId.foodCategoryId;
        console.log("REQUEST: " + request);
        axios.get(request)
            .then(response => {
                console.log(response);
                this.setState({
                    customisations : response.data,
                    mounted: true
                });
            }).catch(error => console.log(error))
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
                <ScrollView>
                    <Text>Food Name = {this.params.foodPrice.food.foodName}</Text>
                    <Text>Food Description = {this.params.foodPrice.food.foodDescription}</Text>
                    <Text>Food Price = ${this.params.foodPrice.foodPrice}</Text>
                    <Text>{this.params.foodPrice.availability ? '' : 'Sold Out'}</Text>
                    <Text> Any special remarks: </Text>
                    <TextInput
                        onChangeText={(text)=> this.setState({remark:text})}
                        value={this.state.remark}
                    />
                </ScrollView>
                <View style={styles.floatingContainer}>
                    <View style={{flexDirection: 'row', flex:1}}>
                        <Button title='+' onPress={()=>{this.increaseCount()}} />
                        <Text>{this.state.quantity}</Text>
                        <Button title='-' onPress={()=>{this.decreaseCount()}} />

                    </View>
                    <Button
                        title='Add to Cart!'
                        disabled={!this.params.foodPrice.availability}
                        onPress={()=>{
                            let cartItem = {
                                id: this.props.seatingInformation.orderId + date.getTime(),
                                orderId:this.props.seatingInformation.orderId,
                                foodId:this.params.foodPrice.food.foodId,
                                name:this.params.foodPrice.food.foodName,
                                price: this.params.foodPrice.foodPrice,
                                quantity:this.state.quantity,
                                remarks: this.state.remarks
                            }
                            Alert.alert(
                                'Add to cart',
                                'Add (' + this.state.quantity + ') ' +
                                this.params.foodPrice.food.foodName + ' to cart?',
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
    },
    floatingContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center'
    }
});