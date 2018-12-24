import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const BillIcon = (props) => (
    <View style={styles.container}>
        <Text>BillIcon</Text>
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