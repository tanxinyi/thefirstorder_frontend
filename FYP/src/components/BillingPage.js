import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    PressRetentionOffset as right,
    FlatList,
    TouchableOpacity
} from 'react-native';
import axios from "axios";
import { Header, Button } from 'react-native-elements';
import "react-native-vector-icons";
import BillComponent from "./BillComponent";

class BillingPage extends Component {

    render() {
        const { navigate } = this.props.navigation;

        return (

         <View>
             <Text> Billing page here</Text>
             <View>
             <BillComponent/>
             </View>
             <View>
                 <TouchableOpacity onPress ={() =>
                     navigate('Cart', {
                         quantity: this.state.PickerValue
                     })
                 } style = {styles.button}>
                     <Text style = {styles.textStyle}>
                         PAYMENT
                     </Text>

                 </TouchableOpacity >
             </View>

         </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    textStyle:{
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:15,
    },
    button: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgb(249, 225, 127)',
        height:50,
        width: '100%',
        alignItems: 'center',
        borderColor: 'rgb(166, 145, 63)',
        borderWidth: 2,

    },
});


export default BillingPage;