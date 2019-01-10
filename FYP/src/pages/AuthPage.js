import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    StatusBar,
    ActivityIndicator
} from "react-native";
import axios from 'axios';
import {connect} from 'react-redux';

class AuthPage extends Component {
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async() => {
        const user = await AsyncStorage.getItem('user');
        console.log(user);
        if(user !== null){
            console.log(user);
            this.getUser(user);
        } else {
            this.props.navigation.navigate('SignIn');
        }
    };

    getUser(user){
        let request = this.props.prefix + 'customers/' + user;
        console.log('Request:');
        console.log(request);
        axios.get(request)
            .then(response => {
                this.props.logIn(response.data);
                this.props.navigation.navigate('Drawer');
            }).catch(error => console.log(error));
    }

    render() {
        console.log('AuthPage');
        console.log('PROPS');
        console.log(this.props);
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
                <Text>MAKANOW</Text>
            </View>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        prefix: state.prefix
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logIn: (customer) => dispatch({
            type: 'LOG_IN',
            payload: customer
        }),
        navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});