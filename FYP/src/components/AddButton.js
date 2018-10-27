import React, { PureComponent } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

export default class AddButton extends PureComponent {
    // NOTE: For the sake of reusability, I pass the animationValue as a prop to the AddButton, MinusButton
    render() {
        // this rotates the circle 90 degrees when the animated value reaches 1
        const rotatePlusCircle = this.props.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        });

        // this translates the circle 30 pixels when the animated value reaches 1
        const translatePlusCircle = this.props.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30]
        });

        // this scales down the circle to 0.7 of the size when the animated value reaches 1
        const scaleDownCircle = this.props.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.7]
        });

        // Plug the created interpolations to actually be used in your layout to animate
        const incrementCirleTransforms = {
            transform: [
                { scale: scaleDownCircle },
                { translateX: translatePlusCircle },
                { rotate: rotatePlusCircle }
            ]
        };

        return (
            <TouchableWithoutFeedback onPress={this.props.animateCircle}>
                <Animated.View style={[styles.counterIncrementStyle, incrementCirleTransforms]}>
                    <Icon name="ios-add" size={30} color={'white'} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

AddButton.propTypes = {
    animationValue: PropTypes.object,
    animateCircle: PropTypes.func
};

const styles = {
    counterIncrementStyle: {
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowOffset: { x: 0, y: 2 },
        shadowColor: 'black',
        backgroundColor: 'rgb(49, 186, 201)'
    }
};