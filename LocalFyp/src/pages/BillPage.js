import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import OrderItems from "../components/OrderItems";
import {Body, Header, Icon, Left, Title} from "native-base";

class BillPage extends Component{
    constructor(props){
        super(props);
        this.state={
            total: 0.0
        }
    }

    calculateTotal(){
        let total = 0.0;
        for(var i = 0; i < this.props.bill.length; i++ ){
            var orderItems = this.props.bill[i];
            for(var j = 0; i < orderItems.length; j++){
                var orderItem = orderItems[j];
                total += orderItem.quantity * orderItem.price;
            }
        }
        this.setState({total:total});
    }

    renderOrderItems(){
        this.props.bill.map((orderItems, i) =>
            <OrderItems key={i}
                       orderItems={orderItems}
            />)
    }

    render(){
        console.log("test16: BillPage");
        console.log(JSON.stringify(this.props.bill));
        if(this.props.bill == null){
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
                    <Text>No payable items!</Text>
                </View>
            )
        }
        this.calculateTotal();
        return(
            <View>
                <Header>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} title='Back'>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Bill</Title>
                    </Body>
                </Header>
                {this.renderOrderItems()}
                <Text>Total Price: {this.calculateTotal()}</Text>
                <Text>GST: 7%</Text>
                <Text>Service Charge: 10%</Text>
                <Text>Total Payable: {this.state.total * 1.1 * 1.07}</Text>
            </View>
        )
    }
}

export default BillPage;