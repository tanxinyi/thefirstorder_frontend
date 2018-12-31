import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ImageBackground, Image
} from "react-native";
import axios from 'axios';
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import {connect} from "react-redux";
import GridView from "react-native-super-grid";
import OrderHeader from "./OrderHeader";

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

    /* added this */
    _onPressItem = (item) => {
        console.log(item)
        this.props.navigation.navigate('FoodPrices', {
            prefix: this.props.navigation.state.params.prefix,
            categoryId: item.foodCategoryId,
            categoryName: item.foodCategoryName,
            prevPage: 'Subcategories'
        })
    };

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
                <View style = {styles.itemContainer}>
                    <Text> {item.categoryName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

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
                                categoryName: this.params.categoryName,
                                prefix: this.params.prefix,
                                prevPage: 'Categories'
                            })}>
                            <Text>Category Name = {this.params.categoryName}</Text>
                            <Text>Category ID = {this.params.categoryId}</Text>
                            <Text>Category Image = {this.params.categoryImg}</Text>
                        </TouchableOpacity>
                        {this.props.navigation.navigate('FoodPrices', {
                            categoryId: this.params.categoryId,
                            categoryName: this.params.categoryName,
                            prefix: this.params.prefix,
                            prevPage: 'Categories'
                        })}
                    </View>
                )

            }else{
                return (
                    <View style = {styles.backgroundContainer}>
                        <OrderHeader
                            navigation={this.props.navigation}
                            title={this.props.seatingInformation.restaurant.restaurantName}
                            enableBack={true}
                            onPress={this.props.navigation.goBack}
                        />
                        <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >
                            <View style = {styles.overlay}>
                                <View style = {styles.promotion}>
                                    <Text style = {styles.itemName}> {this.params.categoryName} </Text>
                                </View>
                                <GridView
                                    itemDimension={130}
                                    items={this.state.subCategories}
                                    style={styles.gridView}
                                    renderItem={item => (
                                        <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
                                            <View style={styles.itemContainer}>
                                                <Image source={require('../images/explore.jpg')} style={styles.image} />
                                                <View style = {styles.overlayInner}>
                                                    <Text style={styles.itemName}>{item.foodCategoryName}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </ImageBackground>
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
        flex:1,
        marginVertical: 20,

    },

    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 5,
        height: 150,
        backgroundColor: 'rgba(246, 112, 117, 0.65))',
    },
    itemName: {
        fontSize: 23,
        color: '#fff',
        fontWeight: '600',
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },

    overlayInner: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(38, 12, 12, 0.32)',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        marginBottom: '25%',
        marginTop: '25%',

    },
    backgroundImage: {
        flex:1,
        width: null,
        height: null,

    },

    overlay: {
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        flex:1,
    },

    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    promotion: {
        height: 140,
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        borderRadius: 5,
        shadowRadius: 10,
        elevation: 100,
    },

});