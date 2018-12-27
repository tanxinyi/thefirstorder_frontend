import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import FoodPrice from "../components/FoodPrice";
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialIcons";
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import {connect} from "react-redux";
import Category from "../components/Category";

class FoodPrices extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            foodPrices:[],
            mounted:false,
            subCategories: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'FoodPrices',
            headerRight:
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                        <CartIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('Bill')}>
                        <BillIcon />
                    </TouchableOpacity>
                </View>,
        }
    }

    componentWillMount(){
        console.log(this.params);
        let request = this.params.prefix + "menu/" + this.props.seatingInformation.menu.menuId + "/category/" + this.params.categoryId;
        console.log('Request: ' + request);
        axios.get(request)
            .then(response=>{
                this.setState({
                    foodPrices: response.data,
                    mounted:true,
                    subCategories: typeof(response.data[0].foodCategoryId) != "undefined"
                })
            }).catch(error=>{
                console.log(error)
            });
    }

    renderFoodPrice(){
        console.log('Render Food Price');
        return this.state.foodPrices.map((foodPrice,i) =>
            <FoodPrice
                key={i}
                foodPrice={foodPrice}
                prefix={this.params.prefix}
                navigation={this.props.navigation}
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
                    <Text>Loading ...</Text>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        navigation: ownProps.navigation,
    }
}

export default connect(mapStateToProps)(FoodPrices);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});