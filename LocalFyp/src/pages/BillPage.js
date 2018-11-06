import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import OrderItems from "../components/OrderItems";

class BillPage extends Component{
    constructor(props){
        super(props);
        this.state={
            total: 0.0
        }
    }

    componentWillMount(){
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
        return(
            <View>
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