import React, {Component}from 'react';
import {RootTabNav} from "../../Routes";

class SignedInPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <RootTabNav screenProps={{email: this.props.navigation.state.params.email}}/>
        )
    }
}

export default SignedInPage;