import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import axios from "axios";


class MenuList extends Component {
    state = {
        table: []
    }

    static navigationOptions = {
        title: "Component",
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        axios.get('http://localhost:8080/api/table/registerTable', {
           params: {
            qrCode: this.params.qrCode}
        })
            .then(response => this.setState({table: response.data}))
            .catch(response => console.log('error' + response));
    }

    renderTable() {}


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text> MENU LIST</Text>
                <Text>{this.state.table}</Text>

                <Button
                    title = "See more inside this category!!"
                    onPress={() =>
                        navigate('Menu'
                        )
                    }
                />
            </View>

        );
    }
}

export default MenuList;