import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import { Header } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";
import CartIcon from "./CartIcon";
import BillIcon from "./BillIcon";

const OrderHeader = (props) => (
    <Header>
        <View>
            {props.enableBack ?
                <TouchableOpacity onPress={()=> props.onPress()}>
                    <Icon name='arrow-back' size={30}/>
                </TouchableOpacity>
                : <Container></Container>
            }

            <TouchableOpacity onPress={()=> {
                Alert.alert(
                    'Side Menu pressed',
                    'Function is still work-in-progress',
                    [{ text:'Ok', style: 'cancel' }]
                )
            }}>
                <Icon name='menu' size={30} />
            </TouchableOpacity>

        </View>
        <Text>
            {props.title}
        </Text>
        <View styles={{flexDirection:'row', flex:2}}>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Cart')}>
                <CartIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Bill')}>
                <BillIcon />
            </TouchableOpacity>
        </View>
    </Header>
);

export default OrderHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})