import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground, Dimensions,

} from "react-native";
import axios from 'axios';
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import {connect} from "react-redux";
import GridView from "react-native-super-grid";
import OrderHeader from "../components/OrderHeader";
import RF from "react-native-responsive-fontsize/index";
import * as Animatable from "react-native-animatable";


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

    componentWillMount(){
        console.log(this.params);
        let request = this.props.prefix + "foodPrices/menu/" + this.props.seatingInformation.menu.menuId + "/category/" + this.params.categoryId;
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
                    <OrderHeader
                        navigation={this.props.navigation}
                        title='MENU'
                        enableBack={true}
                        onPress={this.onPress.bind(this)}
                    />
                    <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >
                        <View style = {styles.overlay}>
                            <View style = {styles.topContainer}>
                                <ImageBackground source = {require('../images/dineIn.jpg')} style = {styles.image}>
                                    <View style = {styles.overlayInner2}>
                                        <Animatable.Text animation="bounceInDown" style = {styles.caption}> {this.params.categoryName} </Animatable.Text>
                                    </View>
                                </ImageBackground>
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
                                                <Animatable.Text animation="bounceInDown" style={styles.itemName}>{item.food.foodName}</Animatable.Text>
                                                <Animatable.Text animation="bounceInDown" style={styles.itemName}>${item.foodPrice}</Animatable.Text>

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
        prefix: state.prefix,
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
    },

    caption: {
        fontSize: RF(7),
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '600',
    },


    overlayInner2: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(38, 12, 12, 0.32)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    topContainer: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)*0.20,

    },

});