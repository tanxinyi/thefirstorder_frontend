import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {connect} from "react-redux";

class BillScreen extends Component {
    static navigationOption = ({navigation}) => {
        return {
            headerTitle: 'Bill'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Bill Screen</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        billItems: state.billItems
    }
}

export default connect(mapStateToProps)(BillScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});