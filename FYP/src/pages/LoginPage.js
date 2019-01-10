import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    AsyncStorage
} from "react-native";
import React, {Component} from "react";
import {connect} from 'react-redux';
import axios from "axios";

class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state={
            email: 'CUS001@makanow.com',
            password: 'ilovef0od',
            loginStatus: ''
        }
    }

    authenticateUser = () =>{
        let request = this.props.prefix + 'authenticate' + this.addParams();
        console.log('REQUEST');
        console.log(request);
        axios.get(request)
            .then(response =>{
                console.log(response.data)
                this.props.logIn(response.data);
                this._signInAsync();
            }).catch(error=> {
                this.setState({loginStatus: 'Invalid email/password'})
            });
    }

    addParams(){
        var output = "?";
        output += 'email=' + this.state.email;
        output += '&password=' + this.state.password;
        return output
    }

    _signInAsync = async() => {
        await AsyncStorage.setItem('user', this.state.email);
        this.props.navigation.navigate('Drawer');
    }

    render() {
        console.log('LogIn Page');
        console.log('STATE');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        return (
            <ImageBackground source={require('../images/Background-Splash.jpg')}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.logo_container}>
                        <Image style={styles.logo} source={require('../images/makanow.jpg')}/>
                        <Text> MakaNow </Text>
                    </View>
                    <View>
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
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password})}/>
                        </View>

                        <Text style={styles.errorMsg}>{this.state.loginStatus}</Text>

                        <TouchableHighlight style={[styles.buttonContainer, styles.signUpButton]}
                                            onPress={() => this.authenticateUser()}>
                            <Text style={styles.signUpText}>Login</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.buttonContainer}
                                            onPress={() => {
                                                console.log("Sign Up");
                                                this.props.navigation.navigate('Register', {
                                                    _signInAsync: this._signInAsync.bind(this)
                                                })
                                            }}>
                            <Text>Don't Have An Account? Sign up</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prefix: state.prefix,
        navigation: ownProps.navigation,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        logIn: (customer) => dispatch({
            type: 'LOG_IN',
            payload: customer
        }),
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

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
        paddingTop: "50%",
        paddingBottom: "20%",
        marginBottom: 20,
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        justifyContent: "center",
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',

    },

    welcome: {
        alignSelf: 'center',
        fontSize: 25,
        fontFamily: 'Biko_Regular',
        bottom: '21%',

    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
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
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
    },
    signUpButton: {
        backgroundColor: "#F67075",
    },
    signUpText: {
        color: 'white',
    },
    errorMsg:{
        color: 'red',
        alignSelf: "center",
        marginBottom: 10,
    }

});

