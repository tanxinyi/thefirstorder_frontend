import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView, Dimensions, ImageBackground,
} from "react-native";
import {Card, Icon} from 'react-native-elements'
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";
import CartIcon from "../components/CartIcon";
import {connect} from 'react-redux';
import BillIcon from "../components/BillIcon";
import axios from "axios";
import RF from "react-native-responsive-fontsize/index";
import OrderMainPage from "./OrderMainPage";
import OrderHeader from "../components/OrderHeader";

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
            var defaultCOID = customisationOptions[0].customisationOptionId;
            var defaultPrice = customisationOptions[0].optionPrice;
            var defaultName = customisations[i].customisationName + ': ' + customisationOptions[0].optionDescription;
            inner:
                for(var j = 1; j < customisationOptions.length; j++){
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
                    buttonColor={'#50C900'}
                    formHorizontal={true}
                    animation={true}
                    labelHorixontal={false}
                    selectedButtonColor= {'red'}
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
        //{this.params.foodPrice.food.foodName}
        //{this.params.foodPrice.foodPrice}
        //{this.params.foodPrice.food.foodDescription}
        //containerStyle={styles.cardContainer}
        return (
            <View style={styles.container}>
                <OrderHeader
                    enableBack={true}
                    title='CUSTOMISE'
                    onPress={this.props.navigation.navigate.goBack}
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    <View style = {styles.imageContainer}>
                        <ImageBackground source={require('../images/dessert.jpg')} style={styles.image}>
                            <View style = {styles.overlay}>
                                <Card
                                    containerStyle={styles.cardContainer}
                                >
                                    <Text style = {styles.titleStyle}>{this.params.foodPrice.food.foodName.toUpperCase()} </Text>
                                    <Text style = {styles.description}>$ {this.params.foodPrice.foodPrice}</Text>
                                    <Text style = {styles.description}>{this.params.foodPrice.food.foodDescription}</Text>
                                </Card>
                            </View>
                        </ImageBackground>

                    </View>


                    <Text>{this.params.foodPrice.availability ? '' : 'Sold Out'}</Text>

                    {this.state.mounted? this.renderCustomisations(this.state.customisations) : <View style ={styles.customisations}></View>}
                    <Text style = {styles.remarksQn}> Any special remarks: </Text>
                    <TextInput
                        style = {styles.remarks}
                        onChangeText={(text)=> this.setState({remark:text})}
                        value={this.state.remark}
                    />
                </ScrollView>
                <View style={styles.floatingContainer}>
                    <View style ={styles.cancelContainer}>
                        <Text style = {styles.cancelText}> CANCEL </Text>
                    </View>
                    <View style={styles.counter}>
                        <Icon name='minus' type='font-awesome' onPress={()=>{this.decreaseCount()}} />
                        <Text style = {styles.quantity}>{this.state.quantity}</Text>
                        <Icon name='plus' type='font-awesome'onPress={()=>{this.increaseCount()}} />
                    </View>
                    <View style = {styles.addCart}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
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
                        >
                            <Text style = {styles.buttonText}>ADD TO CART!</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    floatingContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '0%'
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)*0.30,

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    card: {
        width: 10,
        height: (Dimensions.get('window').height)*0.30,
    },
    overlay: {
        backgroundColor: 'rgba(255, 0, 0, 0);',
        alignItems: 'center',
        justifyContent: 'center',
        top: '40%',
    },
    itemDetailsContainer:{
        backgroundColor: 'red',
    },
    description: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: RF(2.5),
        paddingTop: 15,
    },
    titleStyle: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: RF(3.5),
        color: 'black',
        paddingTop: 15,
    },
    cardContainer: {
        width: (Dimensions.get('window').width)*0.75,
        minHeight: (Dimensions.get('window').height)*0.20,
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.28,
        borderRadius: 30,
        backgroundColor: "#F67075",
    },


    counter:{
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: 'white',
        height: 45,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.28,
        borderWidth: 0.5,
        borderColor: 'black',


    },
    addCart:{
        flex: 1,

    },
    remarks: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor:'gray',
        marginLeft: '10%',
        marginRight:'10%',
    },

    remarksQn: {
        marginLeft: '10%',
        marginTop: '3%',

    },
    customisations: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    quantity: {
        fontSize: RF(3),
        color: 'black',
        fontWeight: 'bold',

    },
    buttonText: {
        fontSize: RF(2.5),
        color: 'white',
    },
    cancelContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width)*0.25,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    cancelText: {
        fontSize: RF(2.5),
        color: 'grey',
    }

});