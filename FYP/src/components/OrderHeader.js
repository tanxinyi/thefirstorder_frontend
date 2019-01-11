import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Dimensions,
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
        <Left style={{flex: 1}}>
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
        <Right style={{flex:1}}>
            <TouchableOpacity style = {styles.cart} onPress={()=> props.navigation.navigate('Cart')}>
                <CartIcon />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.bill}onPress={()=> props.navigation.navigate('Bill')}>
                <BillIcon />
            </TouchableOpacity>
        </Right>
    </Header>
);

export default OrderHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: (Dimensions.get('window').width)
    },
    headerTitle:{
        /*
        textAlign: 'center',
        flex:1,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        */
        flex:1,
        marginRight: '25%',
        marginLeft: '25%',
    },
    bill:{
        marginRight: '3%',
        marginTop: '8%',
    },
    cart:{
        marginRight: '6%',
        marginBottom: '8%',
    }
})