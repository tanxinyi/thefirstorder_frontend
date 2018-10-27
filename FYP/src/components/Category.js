// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
// Make a component
const MenuItem = (props) => {
    return (
        <Card>
            <Text>CategoryId: {props.category.categoryId}</Text>
            <Text>CategoryName: {props.category.categoryName}</Text>
            <Text>CategoryImg: {props.category.catImg}</Text>
        </Card>
    );
};


// Make component available to other parts of the app
export default MenuItem;