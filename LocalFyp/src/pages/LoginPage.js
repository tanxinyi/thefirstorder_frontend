import React, {Component} from 'react';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';


class LoginPage extends Component {

    static navigationOptions = {
        title: "Login",
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: 'CUS004@makanow.com',
            loginStatus:'',
            password: 'talldude'
        }
    }

    componentDidMount() {
        this._loadInitialState()
    }

    _loadInitialState = () => {
        if (this.state.email !== "") {
            this.props.navigation.navigate("Home");
        }
    }


    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    authenticateUser = () =>{
        const request = 'https://makanow.herokuapp.com/api/authenticate?email='+this.state.email+'&password='+this.state.password
        console.log("Logging In with: " + this.state.email + " + " + this.state.password);
        axios.get(request)
            .then(response=>{
                this.props.navigation.navigate('SignedInPage', {
                    email: response.data.email
                })
            }).catch(error=>{
                console.log(error);
                this.setState({loginStatus: 'Invalid email/password'});
        })
    }



    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../images/MakaNowLogo.png')} style={styles.image}/>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <Text style={styles.error_msg}>{this.state.loginStatus}</Text>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.authenticateUser()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                                    onPress={() => this.onClickListener('Forgot Password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('Register')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
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
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    image: {
        height: '35%',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '85%',
    },
    error_msg:{
        color: 'red',
    }
});

export default LoginPage;