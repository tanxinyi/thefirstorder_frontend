import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class ScanningPage extends Component {
    render() {
        console.log('Scanning Page');
        return (
            <View style={styles.container}>
                <Button
                    title='Enter Order Main Page'
                    onPress={()=>this.props.navigation.navigate('OrderMain', {
                        qrCodeString:'T001'
                    })}
                />
            </View>
        );
    }
}

export default ScanningPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});