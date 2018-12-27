import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import FoodPrice from "../components/FoodPrice";
import axios from 'axios';
import Icon from "react-native-vector-icons";
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import {connect} from "react-redux";
import Category from "../components/Category";

class Subcategories extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            subCategories:[],
            mounted:false,
            hasSubCategories: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Sub Categories',
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
                    subCategories: response.data,
                    mounted:true,
                    hasSubCategories: typeof(response.data[0].foodCategoryId) != "undefined"
                })
            }).catch(error=>{
            console.log(error)
        });
    }

    renderSubCategories(){
        console.log('Render Sub Categories');
        return this.state.subCategories.map((subCategory,i) =>
            <Category
                key={i}
                category={subCategory}
                prefix={this.params.prefix}
                navigation={this.props.navigation}
                navigatedPage='FoodPrices'
            />
        )
    }

    render() {
        console.log('Subcategories');
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            if(!this.state.hasSubCategories){
                return (
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('FoodPrices',{
                                categoryId: this.params.categoryId,
                                prefix: this.params.prefix
                            })}>
                            <Text>Category Name = {this.params.categoryName}</Text>
                            <Text>Category ID = {this.params.categoryId}</Text>
                            <Text>Category Image = {this.params.categoryImg}</Text>
                        </TouchableOpacity>
                        {this.props.navigation.navigate('FoodPrices', {
                            categoryId: this.params.categoryId,
                            prefix: this.params.prefix
                        })}
                    </View>
                )

            }else{
                return (
                    <View style={styles.container}>
                        {this.renderSubCategories()}
                    </View>
                )
            }
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

export default connect(mapStateToProps)(Subcategories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});