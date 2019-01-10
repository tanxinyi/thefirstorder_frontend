import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Image,
    TouchableHighlight
} from "react-native";
import React, {Component} from "react";
import {
    Header,
    Avatar,
    Card,
    Icon,
    Button,
    ListItem
} from 'react-native-elements';
import axios from 'axios';
import {connect} from 'react-redux';

class TransactionDetailPage extends Component{

    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            restaurant: this.params.restaurantName,
            orderSummary: this.params.orderSummary,
            display: []
        }
    }

    componentWillMount(){
        //get order
        let request = this.props.prefix + 'orderSummary/' + this.state.orderSummary.orderSummaryId;
        console.log('Request: ');
        console.log(request);
        axios.get(request)
            .then(response => {
                var orders = response.data.orders;
                for(var i = 0; i < orders.length; i++){
                    //get customer order
                    let request = this.props.prefix + 'orders/' + orders[i].orderId;
                    console.log('Request: ');
                    console.log(request);
                    axios.get(request)
                        .then(response => {
                            //get customisation selected
                            let customerOrders = response.data.customerOrders;
                            for(var j = 0; j < customerOrders.length; j++){
                                let request = this.props.prefix + 'customerOrder/' + customerOrders[j].customerOrderId;
                                console.log('Request: ');
                                console.log(request);
                                axios.get(request)
                                    .then(response =>{
                                        var customerOrder = response.data
                                        let request = this.props.prefix + 'foodItems/' + customerOrder.menuFoodCatId.foodId;
                                        console.log('Request: ');
                                        console.log(request);
                                        axios.get(request)
                                            .then(response => {
                                                var temp = {
                                                    foodName: response.data.foodName,
                                                    quantity: customerOrder.customerOrderQuantity,
                                                    price: customerOrder.customerOrderPrice,
                                                    customisations: customerOrder.customisationOptions
                                                }
                                                this.setState({display: [...this.state.display, temp]})
                                            })
                                    }).catch(error=> console.log(error));
                            }
                        }).catch(error=> console.log(error));
                }
            }).catch(error => console.log(error))
    }

    renderDetails(display){
        console.log('Rendering Details');
        console.log(display);
        return display.map((detail, i) => (
                <View key={i} style={styles.card_detail}>
                    <View style={styles.restaurant}><Text>{detail.foodName}</Text></View>
                    <View style={[styles.price]}><Text>x{detail.quantity}</Text></View>
                    <View style={[styles.price]}><Text>{detail.price}</Text></View>
                </View>

            )
        )
    }

    render(){
        console.log('TransactionsDetailsPage');
        console.log('STATE');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        return (
            <ImageBackground source={require('../images/Background-Splash.jpg')} style={{width: '100%', height: '100%'}}>
                <View>
                    <Header
                        containerStyle={{
                            backgroundColor: 'black',
                            height: 60,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: () => {this.state.restaurant}, style: { color: '#fff', fontSize: 20 } }}
                        rightComponent={{  icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate("EditProfile") }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.profileImg}>
                        <View style={[styles.name]}>
                            <Text style={{fontWeight:"bold"}}>Date of Visit: {this.state.orderSummary.orderSummaryDate}</Text>
                            <Text>Points Earned: {parseInt(this.state.orderSummary.totalAmount, 10)}</Text>
                        </View>
                    </View>

                    <View style={[styles.rewards_container,styles.box_shadow]}>
                        <Card style={styles.card_container}>
                            {this.renderDetails(this.state.display)}
                        </Card>
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps, null)(TransactionDetailPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginLeft: "8%",
        marginRight: "8%",
    },
    profileImg: {
        flexDirection: "row",
        alignItems: "center",
        height: "20%",
    },
    name:{
        marginLeft: "15%",
    },
    section_header:{
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    card_container:{
        flex: 1,
        width:"100%",
        flexDirection: "column",
    },
    card_detail:{
        // backgroundColor: "grey",
        flexDirection: "row",
        width: "100%",
        marginTop: "5%",
        marginBottom: "5%",
    },
    restaurant:{
        // backgroundColor: "pink",
    },
    price:{
        // backgroundColor: "powderblue",
        textAlign: 'right',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: "5%",
    },
    box_shadow:{
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
    },

});

