import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";
import CartIcon from "../components/CartIcon";
import {connect} from 'react-redux';
import BillIcon from "../components/BillIcon";
import axios from "axios";

class FoodCustomisationPage extends Component {
    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this.state={
            customisations: [],
            mounted: false,
            quantity: 1,
            remarks: '',
            selected: []
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Food Customisation Page',
            headerRight:
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                        <CartIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('Bill')}>
                        <BillIcon />
                    </TouchableOpacity>
                </View>
        }
    }

    componentWillMount(){
        let request = this.props.prefix + "customisation/menu/" + this.params.foodPrice.menuFoodCatId.menuId
            + "/food/" + this.params.foodPrice.menuFoodCatId.foodId
            + "/category/" + this.params.foodPrice.menuFoodCatId.foodCategoryId;
        console.log("REQUEST: " + request);
        axios.get(request)
            .then(response => {
                console.log(response);
                this.initialiseSelected(response.data);
                this.setState({
                    customisations : response.data,
                    mounted: true
                });
            }).catch(error => console.log(error))
    }

    increaseCount(){
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseCount(){
        if(this.state.quantity == 1){return}
y
    }

    initialiseSelected(customisations){
        console.log("Initialise selected");
        var selected = [];
        for(var i = 0; i < customisations.length; i ++){
            var customisationOptions = customisations[i].customisationOptions;
            var defaultCOID = '';
            var defaultPrice = 0;
            var defaultName = ''
            inner:
            for(var j = 0; j < customisationOptions.length; j++){
                if(customisationOptions[j].optionDescription === 'Normal'){
                    defaultCOID = customisationOptions[j].customisationOptionId;
                    defaultPrice = customisationOptions[j].optionPrice;
                    defaultName = customisations[i].customisationName + ': Normal';
                    break inner;
                }
            }

            selected = [...selected, {customisationOptionId: defaultCOID, name: defaultName, optionPrice: defaultPrice}];
        }
        console.log(selected);
        this.setState({selected: selected});
    }

    renderOptions(options, index, name){
        console.log("Render Options");
        console.log(options)
        return options.map((option) => (
            <RadioButton
                key={option.customisationOptionId}
                obj={{
                    label: option.optionDescription + "(+ $" + option.optionPrice + ")",
                    value: option.customisationOptionId
                }}
                onPress={()=> this.onPress(index, option, name)}
                isSelected={
                    this.state.selected[index] !== {} &&
                    this.state.selected[index].customisationOptionId === option.customisationOptionId
                }
            />
        ))
    }

    onPress(index, option, name){
        console.log("Update Selected")
        let selected = this.state.selected;
        selected[index] = {
            customisationOptionId: option.customisationOptionId,
            name: name + ": " + option.optionDescription,
            optionPrice: option.optionPrice
        }
        this.setState({selected: selected})
    }

    renderCustomisations(customisations){

        console.log("Render Customisation");
        return customisations.map((customisation, i) => (
            <View
                key={customisation.customisationId}
            >
                <Text>{customisation.customisationName} :</Text>
                <RadioForm
                    formHorizontal={true}
                    animation={true}
                    labelHorixontal={false}
                >
                    {this.renderOptions(customisation.customisationOptions, i, customisation.customisationName)}
                </RadioForm>
            </View>
        ))
    }

    calculatePrice(selected){
        let price = this.params.foodPrice.foodPrice;
        if(selected == undefined) return price
        for(var i = 0; i < selected.length; i++){
            price += selected[i].optionPrice;
        }
        return price;
    }

    render() {
        console.log('FoodCustomisationPage');
        console.log('STATE:');
        console.log(this.state);
        console.log('PROPS');
        console.log(this.props);
        var date = new Date();
        if(this.state.selected != undefined) {
            var selected = this.state.selected.filter(option => option.customisationOptionId !== '');
        }else{
            var selected = {}
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Food Name = {this.params.foodPrice.food.foodName}</Text>
                    <Text>Food Description = {this.params.foodPrice.food.foodDescription}</Text>
                    <Text>Food Price = ${this.params.foodPrice.foodPrice}</Text>
                    <Text>{this.params.foodPrice.availability ? '' : 'Sold Out'}</Text>
                    <Text> Any special remarks: </Text>
                    <TextInput
                        onChangeText={(text)=> this.setState({remark:text})}
                        value={this.state.remark}
                    />
                    {this.state.mounted? this.renderCustomisations(this.state.customisations) : <View></View>}
                </ScrollView>
                <View style={styles.floatingContainer}>
                    <View style={{flexDirection: 'row', flex:1}}>
                        <Button title='+' onPress={()=>{this.increaseCount()}} />
                        <Text>{this.state.quantity}</Text>
                        <Button title='-' onPress={()=>{this.decreaseCount()}} />

                    </View>
                    <Button
                        title='Add to Cart!'
                        disabled={!this.params.foodPrice.availability}
                        onPress={()=>{
                            let cartItem = {
                                id: this.props.seatingInformation.orderId + date.getTime(),
                                orderId:this.props.seatingInformation.orderId,
                                menuFoodCatId: this.params.foodPrice.menuFoodCatId,
                                name:this.params.foodPrice.food.foodName,
                                customerOrderPrice: this.calculatePrice(selected),
                                customerOrderQuantity:this.state.quantity,
                                customerOrderRemarks: this.state.remarks,
                                customisationOptions: selected
                            }
                            Alert.alert(
                                'Add to cart',
                                'Add (' + this.state.quantity + ') ' +
                                this.params.foodPrice.food.foodName + ' to cart?',
                                [
                                    {text: 'Yes', onPress: () => {
                                            this.props.addItemToCart(cartItem)
                                            this.props.navigation.goBack()
                                        }},
                                    {text: 'No', style:'cancel'}
                                ]
                            )

                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps =(state, ownProps) => {
    return {
        seatingInformation: state.seatingInformation,
        prefix: state.prefix,
        navigation: ownProps.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        addItemToCart:(product) => dispatch({
            type: 'ADD_TO_CART',
            payload: product
        }),
        navigation:ownProps.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCustomisationPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    floatingContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center'
    }
});