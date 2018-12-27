import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios";
import Category from "../components/Category";
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import Icon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";

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
            headerLeft:
                <TouchableOpacity
                    onPress={()=>{
                        Alert.alert(
                            'Confirm exit Dine-in?',
                            'Cart and bill information will not be retained',
                            [
                                {text: 'Exit', onPress: () => navigation.navigate('ScanningPage')},
                                {text:'Cancel', style:'cancel'}
                            ]
                        )
                    }}
                >
                    <Icon name='cross' size={30}/>
                </TouchableOpacity>,
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
        let request = this.params.prefix + "menu/" + this.props.seatingInformation.menu.menuId + "/categories";
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
                navigatedPage='Subcategories'
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

const mapStateToProps = (state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps)(Categories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});