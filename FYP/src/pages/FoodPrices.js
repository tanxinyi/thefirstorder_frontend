import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,

} from "react-native";
import axios from 'axios';
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import {connect} from "react-redux";
import GridView from "react-native-super-grid";
import OrderHeader from "../components/OrderHeader";


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

    /* added this */


    _onPressItem = (item) => {
        this.props.navigation.navigate('FoodCustomisation', {
            prefix: this.props.navigation.state.params.prefix,
            foodPrice: item,

        })
    };

    onPress(){
        this.props.navigation.navigate(this.params.prevPage)
    }

    render() {
        console.log('FoodPrices');
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            /*
                    <OrderHeader
                        navigation={this.props.navigation}
                        title={this.props.seatingInformation.restaurant.restaurantName}
                        enableBack={true}
                        onPress={this.onPress.bind(this)}
                    />
             */
            return (
                <View style = {styles.backgroundContainer}>
                    <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >
                        <View style = {styles.overlay}>
                            <View style = {styles.promotion}>
                                <Text style = {styles.itemName}> {this.params.categoryName} </Text>
                            </View>
                            <GridView
                                itemDimension={130}
                                items={this.state.foodPrices}
                                style={styles.gridView}
                                renderItem={item => (
                                    <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
                                        <View style={styles.itemContainer}>
                                            <View style = {styles.imageContainer}>
                                                <Image source={require('../images/explore.jpg')} style={styles.image} />
                                            </View>
                                            <View style = {styles.captionContainer}>
                                                <Text style={styles.itemName}>{item.food.foodName}</Text>
                                                <Text style={styles.itemName}>{item.foodPrice}</Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </ImageBackground>
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
        height: 200,
        backgroundColor: 'rgba(246, 112, 117, 0.65))',
    },
    itemName: {
        fontSize: 16,
        color: 'black',
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

    imageContainer:{
        flex:2,
    },

    captionContainer: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },

    price: {
        fontSize: 14,
        color: 'black',
    }
});