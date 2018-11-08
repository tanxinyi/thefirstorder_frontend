import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import { Card, Icon } from 'native-base';

class OrderItem extends Component{
    constructor(props){
        super(props)
        this.state={
            removed: false
        }
    }

    remove=()=>{
        this.setState({removed:true});
        this.props.removeFromCart(this.props.orderItem);
    }

    render(){
        console.log("Render Order Item")
        console.log(JSON.stringify(this.props))
        if(!this.props.removable){
            return(
                <Card>
                    <Text>Food Name: {this.props.orderItem.food.name}</Text>
                    <Text>Quantity: {this.props.orderItem.quantity}</Text>
                    <Text>Remarks: {this.props.orderItem.remarks}</Text>
                    <Text>Price: {this.props.orderItem.price}</Text>
                </Card>
            )
        }
        if(!this.state.removed) {
            return (
                <Card>
                    <Text>Food Name: {this.props.orderItem.food.name}</Text>
                    <Text>Quantity: {this.props.orderItem.quantity}</Text>
                    <Text>Remarks: {this.props.orderItem.remarks}</Text>
                    <Text>Remarks: {this.props.orderItem.remarks}</Text>
                    <Button onPress={()=> this.remove()} title='X'>
                        <Icon name="cross"/>
                    </Button>
                </Card>
            )
        }
        return(
            <Text>Removed</Text>
        )
    }
}

export default OrderItem;