import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Image,
    ouchableHighlight
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

class TransactionDetailPage extends Component{

    constructor(props){
        super(props)
        this.state={
            restaurant: this.props.restaurantName,
            display: [
                {
                    name: 'Pepperoni',
                    details: {
                        quantity: 1,
                        price: '$20.99',
                    }
                },
                {
                    name: 'Poke Bowl',
                    details: {
                        quantity: 2,
                        price: '$10.99',
                    }
                },
                {
                    name: 'Mud Pie',
                    details: {
                        quantity: 1,
                        price: '$5',
                    }
                }
            ]
        }
    }

    renderDetails(display){
        users.map((display, i) => {
            return (
                <View key={i} style={styles.card_detail}>
                    <View style={styles.restaurant}><Text>{display.name}</Text></View>
                    <View style={[styles.price]}><Text>x{display.details.quantity}</Text></View>
                    <View style={[styles.price]}><Text>{display.details.price}</Text></View>
                </View>

            );
        })
    }

    render(){
        console.log('TransactionsDetailsPage');
        console.log('STATE');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        return (
            <ImageBackground source={require('../images/Backgound_Splash.jpg')} style={{width: '100%', height: '100%'}}>
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
                        rightComponent={{  icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate("Home") }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.profileImg}>
                        <View style={[styles.name]}>
                            <Text style={{fontWeight:"bold"}}>Date of Visit: 18th Dec 2018</Text>
                            <Text>Points Earned: 82</Text>
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

export default TransactionDetailPage;

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

