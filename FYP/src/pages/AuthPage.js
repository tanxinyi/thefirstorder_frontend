import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    StatusBar,
    ActivityIndicator
} from "react-native";

class AuthPage extends Component {
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async() => {
        const user = await AsyncStorage.getItem('user');
        this.props.navigation.navigate(user ? 'Drawer' : 'SignIn');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
                <Text>MAKANOW</Text>
            </View>
        );
    }
}

export default AuthPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});