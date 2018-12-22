import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import FoodPrice from "../components/FoodPrice";
import axios from 'axios';
import CartIcon from "../components/CartIcon";

class FoodPrices extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            foodPrices:[],
            mounted:false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Food Prices',
            headerRight:
                <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                    <CartIcon />
                </TouchableOpacity>
        }
    }

    componentWillMount(){
        console.log(this.params);
        let request = this.params.prefix + "menu/" + this.params.menu.menuId + "/category/" + this.params.categoryId;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response=>{
                this.setState({
                    foodPrices: response.data,
                    mounted:true
                })
            }).catch(error=>{
                console.log(error)
            });
    }

    renderFoodPrice(){
        return this.state.foodPrices.map((foodPrice,i) =>
            <FoodPrice
                key={i}
                foodPrice={foodPrice}
                prefix={this.params.prefix}
                navigation={this.props.navigation}
                seatingTable={this.params.seatingTable}
                restaurant={this.params.restaurant}
                menu={this.params.menu}
            />
        )
    }

    render() {
        console.log('FoodPrices');
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            return (
                <View style={styles.container}>
                    {this.renderFoodPrice()}
                </View>
            )
        }else {
            return (
                <View style={styles.container}>
                    <Text>Loading Food Prices ...</Text>
                </View>
            );
        }
    }
}

export default FoodPrices;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});