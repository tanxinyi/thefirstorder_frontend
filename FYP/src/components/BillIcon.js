import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {Icon} from "react-native-elements";

const BillIcon = (props) => (
    <View style={styles.container}>
        <Icon
            name='payment'
            color='#517fa4'
        />

    </View>
);

export default BillIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})