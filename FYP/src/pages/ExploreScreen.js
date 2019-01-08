import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class ExploreScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Explore Screen</Text>
                <Text>This page is still under maintenance</Text>
            </View>
        );
    }
}

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});