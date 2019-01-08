import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {
    Header,
    Left,
    Right,
    Body,
    Title
} from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import CartIcon from "./CartIcon";
import BillIcon from "./BillIcon";
import MenuIcon from "./MenuIcon";

const OrderHeader = (props) => (
    <Header style={styles.container}>
        <Left>
            <View style={{flexDirection: 'row'}}>
                {props.enableBack ?
                    <TouchableOpacity onPress={()=> props.onPress()}>
                        <Icon name='arrow-back' size={30} color='white'/>
                    </TouchableOpacity>
                    : <Text></Text>
                }
                <MenuIcon onPress={props.navigation.openDrawer}/>
            </View>
        </Left>
        <Body style={styles.headerTitle}>
            <Title>
                {props.title}
            </Title>
        </Body>
        <Right>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Cart')}>
                <CartIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Bill')}>
                <BillIcon />
            </TouchableOpacity>
        </Right>
    </Header>
);

export default OrderHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    headerTitle:{
        textAlign: 'center',
        flex:1,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})