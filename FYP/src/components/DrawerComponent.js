import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from "react-native";
import {DrawerItems} from "react-navigation";
import MenuIcon from "./MenuIcon";

const DrawerComponent = (props) => (
    <SafeAreaView>
        <View style={styles.header}>
            <Text>
                MAKANOW
            </Text>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
);

export default DrawerComponent;

const styles = StyleSheet.create({
    header: {
        height:150,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})