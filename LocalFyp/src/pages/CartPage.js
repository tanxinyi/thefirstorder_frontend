import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import { Header, Left, Body, Icon, Title} from 'native-base';
import OrderItem from "../components/OrderItem";

class CartPage extends Component{

    renderOrderItems(){
        this.props.cart.map((orderItem, i) =>
            <OrderItem key={i}
                       orderItem={orderItem}
                       removeFromCart={this.props.removeFromCart}
                       removable={true}
            />)
    }
    render(){
        console.log("test15: CartPage");
        console.log(JSON.stringify(this.props.cart));
        if(this.props.cart == null){
            return(
                <View>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.goBack()} title='Back'>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Cart</Title>
                        </Body>
                    </Header>
                    <Text>Cart is empty!</Text>
                </View>
            )
        }
        return(
            <View>
                <Header>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} title='Back'>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cart</Title>
                    </Body>
                </Header>
                {this.renderOrderItems()}
                <Button onPress={() => {
                    this.props.sendToBill();
                    this.props.reRender();
                    this.props.navigation.navigate('Menu')
                    }}>
                    <Text>Send to kitchen</Text>
                </Button>
            </View>
        )
    }
}

export default CartPage;