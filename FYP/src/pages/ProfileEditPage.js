import {StyleSheet, View, ImageBackground, Text, TextInput} from "react-native";
import React from "react";
import {Header, Avatar, Input, Icon, Button} from 'react-native-elements';
import axios from "axios";
import {connect} from 'react-redux';

class ProfileEditPage extends React.Component{

    state = {
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        creditCard: "",
    }

    render(){
        return (
            <ImageBackground
                source={require('../images/Background-Splash.jpg')}
                style={{width: '100%', height: '100%'}}>
                <View>
                    <Header
                        containerStyle={{
                            backgroundColor: 'black',
                            height: 60,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}
                        leftComponent={{
                            icon: 'menu',
                            color: '#fff',
                            onPress: ()=> this.props.navigation.openDrawer()
                        }}
                        centerComponent={{
                            text: 'EDIT PROFILE',
                            style: {
                                color: '#fff',
                                fontSize: 20
                            } }}
                        // rightComponent={{
                        // icon: 'settings',
                        // color: '#fff',
                        // onPress: () => this.props.navigation.navigate("") }}
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
                    </View>

                    <View style={[styles.edit_container,styles.box_shadow]}>

                        <Text h3 style={styles.labels}>First Name:</Text>
                        <TextInput
                            textContentType="name"
                            underlineColorAndroid='black'
                            value={this.state.firstName}
                        />
                        <Text h3 style={styles.labels}>Last Name:</Text>
                        <TextInput
                            textContentType="familyName"
                            underlineColorAndroid='black'
                            value={this.state.lastName}
                        />
                        {/*<Text h3 style={styles.labels}>Email:</Text>*/}
                        {/*<TextInput*/}
                            {/*textContentType="emailAddress"*/}
                            {/*underlineColorAndroid='black'*/}
                            {/*value={this.state.email}*/}
                            {/*keyboardType="email-address"*/}
                        {/*/>*/}
                        <Text h3 style={styles.labels}>Credit Card:</Text>
                        <TextInput
                            textContentType="creditCardNumber"
                            underlineColorAndroid='black'
                            value={this.state.creditCard}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View>
                        <Button
                            title="SAVE"
                            titleStyle={{
                                fontWeight: "500",
                                width: "100%"}}
                            buttonStyle={{
                                backgroundColor: "#f67075",
                                width: "100%",
                                height: 50,
                                borderRadius: 20,
                                // backgroundColor: '#f67075',
                                //borderRadius: 15
                            }}
                            containerStyle={{
                                marginTop: 20 ,
                                alignSelf: "center",
                            }}
                            raised={true}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps=(state, ownProps) => {
    return {
        user: state.user,
        navigation: ownProps.navigation,
        prefix: state.prefix
    }
}

export default connect(mapStateToProps, null)(ProfileEditPage);

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
        justifyContent: "center",
        height: "20%",
    },
    name:{
        marginLeft: "15%",
    },
    edit_container:{
        backgroundColor: "white",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        marginTop: "5%",
        marginBottom: "5%",
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
    labels:{
        marginTop: "3%",
    },

});