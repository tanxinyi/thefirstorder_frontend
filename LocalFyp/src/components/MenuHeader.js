import React, {Component} from 'react';
import {Header, Body, Button, Icon, Left, Right, Title} from "native-base";
import {Text} from 'react-native';

class MenuHeader extends Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log("MenuHeader")
        console.log(JSON.stringify(this.props))
        return(
            <Header>
                <Left>
                    <Button transparent onPress={()=> this.props.navigation.goBack()}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                <Title>Menu</Title>
                </Body>
                <Right>
                    <Button onPress={()=>{
                        this.props.navigation.navigate('CartPage', {
                            cart: this.props.cart,
                            bill: this.props.bill,
                            orderId: this.props.orderId,
                            orderSummaryId: this.props.orderSummaryId,
                            qrCode: this.props.qrCode,
                            restaurantId: this.props.restaurantId,
                            prefix: this.props.prefix,
                            navigate: this.props.navigation,
                            menuId: this.props.menuId
                        })
                    }}>
                        <Icon name="cart"/>
                    </Button>
                    <Button onPress={()=>{
                        this.props.navigation.navigate('BillPage', {
                            bill: this.props.bill,
                            navigate: this.props.navigation
                        })
                    }}>
                        <Icon name="paper"/>
                    </Button>
                </Right>
            </Header>
        );
    }

}

export default MenuHeader;