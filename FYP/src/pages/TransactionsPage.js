import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Image,
    TouchableHighlight} from "react-native";
import React, {Component} from "react";
import {
    Header,
    Avatar,
    Card,
    Icon,
    Button,
    ListItem
} from 'react-native-elements';
import axios from "axios";
import {connect} from 'react-redux';

class TransactionsPage extends Component{

    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            display:[],
            mounted: false,
        }
    }

    componentWillMount(){
        let request = this.props.prefix + 'customers/' + this.props.user.email;
        console.log('Request:');
        console.log(request);
        axios.get(request)
            .then(response => {
                this.setDisplay(response.data.orderSummaries);
            }).catch(error => console.log(error));
    }

    setDisplay(orderSummaries){
        var displaySummaries = orderSummaries.reverse();

        let request = this.props.prefix + "orderSummary/getRestaurantName";

        console.log("REQUEST");
        console.log(request);
        console.log(displaySummaries);
        axios.post(request, displaySummaries)
            .then(response=>{
                var newDisplay = [];
                for(var i = 0; i<response.data.length; i++) {
                    var temp = {
                        restaurantName: response.data[i],
                        totalAmount: displaySummaries[i].totalAmount,
                        orderSummary: displaySummaries[i]
                    };
                    newDisplay = [...newDisplay, temp];
                }
                console.log(newDisplay);
                this.setState({
                    display: newDisplay,
                    mounted:true
                });
            }).catch(error=>{
            console.log(error)
        })
    }

    renderTransactions(transactions){
        return transactions.map((details, i) => (
            <TouchableHighlight
                key={i}
                onPress={()=> this.props.navigation.navigate('TransactionDetails', {
                    restaurantName: details.restaurantName,
                    orderSummary: details.orderSummary,
                })}
            >
                <View>
                    <Text>{details.restaurantName}</Text>
                    <View style={styles.card_detail}>
                        <Text>${Number(Math.round(details.totalAmount + 'e2') + 'e-2').toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        ))
    }

    render(){
        console.log('TransactionsPage');
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
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                        centerComponent={{ text: 'TRANSACTIONS', style: { color: '#fff', fontSize: 20 } }}
                        rightComponent={{  icon: 'settings', color: '#fff', onPress: () => this.props.navigation.navigate("EditProfile") }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.profileImg}>
                        <View>
                            <Avatar
                                size="large"
                                rounded
                                icon={{name: 'user', type: 'font-awesome'}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                        </View>
                        <View style={[styles.name]}>
                            <Text style={{fontWeight:"bold"}}>{this.props.user.firstName} {this.props.user.lastName}</Text>
                            <Text>Gold Member</Text>
                        </View>
                    </View>

                    <View style={[styles.rewards_container,styles.box_shadow]}>
                        <View style={styles.section_header}>
                            <Icon name='dollar' containerStyle={{marginLeft:10, marginRight:10}}/>
                            <Text style={styles.section_header}>All Transactions</Text>
                        </View>

                        <Card style={styles.card_container}>
                            {this.renderTransactions(this.state.display)}
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

export default connect(mapStateToProps, null)(TransactionsPage);

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

