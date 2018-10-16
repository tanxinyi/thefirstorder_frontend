// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
// Make a component
const TagDetails = (props) => {
    return (
        <View>

            <Text>Food Tag ID: {props.tagDetails.foodTagId}</Text>
            <Text>Food Tag Description: {props.tagDetails.description}</Text>
        </View>
    );
};


// Make component available to other parts of the app
export default TagDetails;

