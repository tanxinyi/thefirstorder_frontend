import {
    StyleSheet,
    View,
    ImageBackground,
    Text
} from "react-native";
import React, {Component} from "react";
import {
    Header,
    Avatar,
    Card,
    Icon,
    Button
 } from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';

class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state={
            display:[],
            mounted: false
        }
    }

    componentWillMount(){
        var displaySummaries = this.props.user.orderSummaries.reverse().slice(0,3)

        let request = this.props.prefix + "orderSummary/getRestaurantName";

        var content = []
        for(var i = 0; i < displaySummaries.length; i++){
            content= [...content, displaySummaries[i].orderSummaryId]
        }

        console.log("REQUEST");
        console.log(request);
        axios.get(request, content)
            .then(response=>{
                var newDisplay = [];
                for(var i = 0; i<response.data.length; i++) {
                    var temp = {restaurantName: response.data[i], totalAmount: displaySummaries[i].totalAmount};
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

    renderTransactions(displayTransactions){
        return displayTransactions.map((details, i) => (
            <View
                key={i}
                style={styles.section_details}>
                <Text>{details.restaurantName}</Text>
                <View style={styles.rightContainer}>
                    <Text>${Number(Math.round(details.totalAmount + 'e2') + 'e-2').toFixed(2)}</Text>
                </View>
            </View>
        ))
    }
    render(){
        console.log('ProfilePage');
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
                        leftComponent={{ icon: 'menu', color: '#fff', onPress:() => this.props.navigation.openDrawer() }}
                        centerComponent={{ text: 'PROFILE', style: { color: '#fff', fontSize: 20 } }}
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
                            <Text>{this.props.user.loyaltyPoint} points available</Text>
                        </View>
                    </View>

                    <View style={[styles.rewards_container,styles.box_shadow]}>
                        <View style={styles.section_header}>
                            <Icon name='star' containerStyle={{marginLeft:10, marginRight:10}}/>
                            <Text style={styles.section_header}>My Rewards</Text>
                        </View>
                        <View style={styles.section_details}>
                            <Text>$5 off next purchase</Text>
                            <View style={styles.rightContainer}>
                                <Text>Available</Text>
                            </View>
                        </View>
                        <View style={styles.section_details}>
                            <Text>$5 off next purchase</Text>
                            <View style={styles.rightContainer}>
                                <Text>Redeemed</Text>
                            </View>
                        </View>
                        <View style={styles.section_details}>
                            <View>
                                <Text>$5 off next purchase</Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text>Available</Text>
                            </View>
                        </View>
                        <View>
                            <Button
                                icon={
                                    <Icon
                                        name='arrow-forward'
                                        size={15}
                                        color='black'
                                    />
                                }
                                iconRight
                                clear
                                title='All Rewards'
                                titleStyle={{color:"black"}}
                                containerStyle={{alignSelf:"flex-end", paddingRight: "5%"}}
                            />
                        </View>
                    </View>

                    <View style={[styles.transaction_container,styles.box_shadow]}>
                        <View style={styles.section_header}>
                            <Icon name='check' containerStyle={{marginLeft:10, rginRight:10}}/>
                            <Text style={styles.section_header}>My Transactions</Text>
                        </View>
                        {this.state.mounted ? this.renderTransactions(this.state.display):<View></View>}
                        <View>
                            <Button
                                icon={
                                    <Icon
                                        name='arrow-forward'
                                        size={15}
                                        color='black'
                                    />
                                }
                                iconRight
                                clear
                                title='All Transactions'
                                titleStyle={{color:"black"}}
                                containerStyle={{alignSelf:"flex-end", paddingRight: "5%"}}
                                onPress={()=> this.props.navigation.navigate("Transactions")}
                            />
                        </View>
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
        navigation: ownProps.navigation,
    }
}

const mapDispatchToProps = (state, ownProps) => {
    return {
        changeUser: (customer) => dispatch({
            type: 'LOG_IN',
            payload: customer
        }),
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

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
    rewards_container:{
        backgroundColor: "white",
        paddingTop: "5%",
        paddingBottom: "5%",
        marginTop: "5%",
        marginBottom: "5%",
    },
    section_header:{
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    section_details:{
        flexDirection: "row",
        paddingLeft: "5%",
        marginTop: "2%",
        fontSize: 15,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: "5%",
    },
    transaction_container: {
        backgroundColor: "white",
        paddingTop: "5%",
        paddingBottom: "5%",
        marginBottom: "5%",
        padding: 10,
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

