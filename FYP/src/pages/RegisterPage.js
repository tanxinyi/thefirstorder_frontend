import {StyleSheet, View, ImageBackground, Text, TextInput, Image, TouchableHighlight} from "react-native";
import React from "react";
import {Header, Icon, Button} from 'react-native-elements';
import axios from "axios";

export default class RegisterPage extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        this.state={
            email: 'agogois480@gmail.com',
            firstName: 'ben',
            lastName: 'gan',
            password: 'password',
            phoneNum: '94804800',
        }
    }

    register = () =>{
        console.log('registering');
        let request = 'https://makanow.herokuapp.com/api/customers/add' + this.addParams();
        console.log(request);
        axios.post(request)
            .then(res =>{
                console.log(res.data);
                if(!res.hasOwnProperty('error')){
                    console.log("Error Found - here")
                    this.props.navigation.navigate('Home');
                }else{
                    console.log("NO error Found - here")
                    this.setState({loginStatus: 'Invalid email/password'})
                }
            }).catch(error =>{
            console.log(error);
        })
            .done();
    }

    addParams(){
        var output="?";
        output += "email=" + this.state.email;
        output += "&firstName=" + this.state.firstName;
        output += "&lastName=" + this.state.lastName;
        output += "&password=" + this.state.password;
        output += "&phoneNum=" + this.state.phoneNum;

        return output;
    }



    render() {
        console.log('Register Page');
        console.log("STATE:");
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        return (
            <ImageBackground source={require('../images/Background-Splash.jpg')}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.logo_container}>
                        <Image style={styles.logo} source={require('../images/makanow.jpg')}/>
                        <Text style={{marginBottom: "5%"}}> MakaNow </Text>
                        <Text>Sign Up!</Text>
                    </View>

                    <View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="First name"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(firstName) => this.setState({firstName})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Last name"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(lastName) => this.setState({lastName})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Email"
                                       keyboardType="email-address"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       secureTextEntry={true}
                                       placeholder="Password"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/mobile/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Mobile Number"
                                       keyboardType="number-pad"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(phoneNum) => this.setState({phoneNum})}/>
                        </View>

                        <View>
                            <TouchableHighlight style={[styles.buttonContainer, styles.signUpButton]}
                                                onPress={() => this.register()}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginLeft: "8%",
        marginRight: "8%",
        alignItems: "center",
    },
    logo_container: {
        alignItems: "center",
        justifyContent: "center",
        height: "25%",
        paddingTop: "30%",
        paddingBottom: "30%",
        marginBottom: 20,
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        justifyContent: "center",
    },

    welcome: {
        alignSelf: 'center',
        fontSize: 25,
        fontFamily: 'Biko_Regular',

    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        marginBottom: 20,
        borderRadius: 30,
    },
    signUpButton: {
        backgroundColor: "#F67075",
    },

});