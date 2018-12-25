import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {connect} from "react-redux";
import BillItems from "../components/BillItems";

class BillScreen extends Component {
    static navigationOption = ({navigation}) => {
        return {
            headerTitle: 'Bill'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.billItems.length > 0 ?
                    <BillItems
                        billItems={this.props.billItems}
                    />
                    :
                    <Text>No items in your bill</Text>
                }
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