import React, {Component} from 'react';
import {StyleSheet, Picker, View, Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';


type Props = {};
class OrderItem extends Component<Props> {
    static navigationOptions = {
        title: "OrderItem",
    };
    constructor(props){
        super(props);
        this.state={
            PickerValue:''
        }
        this.navigate = this.props.navigation.navigate;
    };
    clickme=()=>{
        var data = this.state.PickerValue;
        if(data==""){
            alert("Please select one quantity");
        } else {
            alert(data);

        }

    };
    render(){
        const { navigate } = this.props.navigation;

        /*
        this.navigate("Cart", {
            name: "Cart Screen",
            about:"This is Cart Screen Page"
        });
        */
        return (
            <View style={styles.container}>
                <Image
                    style={styles.menu} source= {('./image/steak.jpg')}
                />
                <Picker
                    style={{ width: '30%' }}
                    selectedValue={this.state.PickerValue}
                    onValueChange={(itemValue, itemIndex) => this.setState({PickerValue: itemValue})}>
                    <Picker.Item label = "Select quantity." value = ""/>
                    <Picker.Item label ="1" value = "1"/>
                    <Picker.Item label ="2" value = "2"/>
                </Picker>
                <Button
                    title = "Add to cart!"
                    onPress={() =>
                        navigate('Cart', {

                            quantity: this.state.PickerValue
                        })
                    }
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    menu: {
        width: '100%',
        height: '40%',

        alignItems: 'flex-start',
    },
});

export default OrderItem