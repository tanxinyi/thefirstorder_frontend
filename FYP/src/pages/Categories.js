import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import axios from "axios";
import Category from "../components/Category";
import CartIcon from "../components/CartIcon";

class Categories extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            categories:[],
            mounted: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Categories',
            headerRight:
                <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                    <CartIcon />
                </TouchableOpacity>
        }
    }

    componentWillMount(){
        let request = this.params.prefix + "menu/" + this.params.menu.menuId + "/categories";
        console.log('Request: ' + request);
        axios.get(request)
            .then(response => {
                this.setState({
                    categories:response.data,
                    mounted:true
                })
            }).catch(error => {
                console.log(error);
            })
    }

    renderCategory(){
        return this.state.categories.map(category =>
            <Category
                key={category.categoryId}
                category={category}
                navigation={this.props.navigation}
                prefix={this.params.prefix}
                menu={this.params.menu}
                restaurant={this.params.restaurant}
                seatingTable={this.params.seatingTable}
            />
        );
    }

    render() {
        console.log("Categories");
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            return (
                <View style={styles.container}>
                    {this.renderCategory()}
                </View>
            )
        }else {
            return (
                <View style={styles.container}>
                    <Text>Loading Categories Screen</Text>
                </View>
            );
        }
    }
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});