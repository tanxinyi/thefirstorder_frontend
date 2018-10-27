
import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import {View, Text, TouchableOpacity, Image, Button, Animated, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import MenuItem from './MenuItem';
import AddButton from './AddButton';
import MinusButton from './MinusButton';
import Counter from './Counter';
import TagDetails from './TagDetails';
import {Header} from "react-native-elements";

class Cart extends PureComponent{
    static navigationOptions = {
        title: "Cart",
    };
    state = {
        menuItems: [],
        animationValue: new Animated.Value(0),
        counterAnimation: new Animated.Value(0),
        shakeMotion: new Animated.Value(0),
        counter: 1,
        open: false,
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    animateCircle = () => {
        if (this.state.open) {
            this.incrementNumber();
        } else {
            Animated.timing(this.state.animationValue, {
                toValue: 1,
                duration: 500
            }).start(() => this.setState({open: true}));
        }
    };

    animateCounterAnimation = () => {
        Animated.timing(this.state.counterAnimation, {
            toValue: 1,
            duration: 250
        }).start(() => this.state.counterAnimation.setValue(0));
    };

    shakeMotionAnimation = () => {
        Animated.timing(this.state.shakeMotion, {
            toValue: 1,
            duration: 250
        }).start(() => this.state.shakeMotion.setValue(0));
    };

    decreaseNumber = () => {
        if (this.state.counter > 0) {
            this.setState({counter: this.state.counter - 1});
            this.animateCounterAnimation();
        } else {
            this.shakeMotionAnimation();
        }
    };


    incrementNumber = () => {
        this.setState({counter: this.state.counter + 1});
        this.animateCounterAnimation();
    };


    componentWillMount() {

        let console = {
            log: function(msg){
                alert(msg);
            }
        }

        const ip = '10.0.2.2'; //leave this here
        const request = 'http://' + ip + ':8080/api/foodItems/'
        //const request = 'http://' + ip + ':8080/ + /api/seatingTables/T001'
        //const request = 'https://fjchng-menuitems.herokuapp.com/api/getMenuItems'
        axios.get(request)
            .then(response => {
                this.setState({menuItems: response.data});
            }).catch(response => console.log('request link: ' + request + '              error: ' + response));


    };

    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.foodId} menuItem={item}/>);
    }


    render() {
        // require module
        const { navigate } = this.props.navigation;
        const deleteIcon = (<Icon name="close" size={30} />)


        return (

            <View>
                <View style = {styles.innerContainer}>
                    <View style = {{paddingLeft: '2%'}}>
                         <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                          style={styles.image} />
                    </View>
                    <Text style = {styles.caption}> Creamy Chocolate Pie</Text>
                    <View style = {styles.icon}>
                        {deleteIcon}
                    </View>
                    <View>
                        <Counter
                            counterAnimation={this.state.counterAnimation}
                            shakeMotion={this.state.shakeMotion}
                            counter={this.state.counter}
                            animationValue={this.state.animationValue}
                        />
                        <MinusButton
                            animationValue={this.state.animationValue}
                            decreaseNumber={this.decreaseNumber}
                        />
                        <AddButton animationValue={this.state.animationValue} animateCircle={this.animateCircle} />
                    </View>

                </View>

            </View>

        );
    }
}
const styles = {
    button: {
        backgroundColor: "rgba(92, 99,216, 1)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        height: 40,
        width: 250,
        position: 'absolute',
        bottom: 0,
    },
    innerContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: '50%',
        zIndex: -1,

    },
    image: {
        height: '85%',
        width: '30%',
        top:18,
        paddingLeft: '10%',
    },
    caption:{
        fontSize: 15,
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',
        top:'-70%',
        left: '8%',

    },
    icon:{
        left: '90%',
        top: '-95%',
    },


};
export default Cart;