import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const Component = (props) => (
    <View style = {styles.container}>
        <TouchableOpacity
            onPress={()=> props.navigation.navigate('FoodPrices',{
                prefix:props.prefix,
                categoryId:props.category.categoryId,
                menu:props.menu,
                seatingTable:props.seatingTable,
                restaurant:props.restaurant,
            })}>
                <Text>Category Name = {props.category.categoryName}</Text>

                 /*
                <Text>Category ID = {props.category.categoryId}</Text>
                <Text>Category Image = {props.category.categoryImage}</Text>
                */
        </TouchableOpacity>
    </View>
);

export default Component;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    }
})