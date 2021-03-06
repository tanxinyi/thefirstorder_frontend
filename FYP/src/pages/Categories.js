import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground
} from "react-native";
import * as Animatable from 'react-native-animatable';


import GridView from 'react-native-super-grid';
import axios from "axios";
import CartIcon from "../components/CartIcon";
import BillIcon from "../components/BillIcon";
import Icon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import OrderHeader from "../components/OrderHeader";

class Categories extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            categories:[],
            mounted: false
        }
    }

    componentWillMount(){
        let request = this.props.prefix + "menu/" + this.props.seatingInformation.menu.menuId + "/categories";
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


    /* added this */
    _onPressItem = (item) => {
        console.log(item)
        this.props.navigation.navigate('Subcategories', {
            categoryId: item.foodCategoryId,
            categoryName: item.foodCategoryName,
        })
    };

    render() {
        console.log("Categories");
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        if(this.state.mounted){
            /*
                    <OrderHeader
                        navigation={this.props.navigation}
                        title={this.props.seatingInformation.restaurant.restaurantName}
                        enableBack={false}
                    />
             */
            return (
                <View style = {styles.backgroundContainer}>
                    <OrderHeader
                        navigation={this.props.navigation}
                        title='MENU'
                        enableBack={false}
                    />
                    <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >
                        <View style = {styles.overlay}>
                            <View style = {styles.promotion}>
                                <Text style = {styles.itemName}> PROMOTIONS </Text>
                            </View>
                            <GridView
                                itemDimension={130}
                                items={this.state.categories}
                                style={styles.gridView}
                                renderItem={item => (
                                    <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
                                        <View style={styles.itemContainer}>
                                            <Image source={require('../images/explore.jpg')} style={styles.image} />
                                            <View style = {styles.overlayInner}>
                                                <Animatable.Text animation="bounceInDown"  style={styles.itemName}>{item.foodCategoryName}</Animatable.Text>
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
                <View>
                    <Text> Loading </Text>
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps)(Categories);

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