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
            onPress={()=> props.navigation.navigate(props.navigatedPage,{
                prefix:props.prefix,
                categoryId:props.category.foodCategoryId,
                categoryName: props.category.foodCategoryName,
                categoryImg: props.category.foodCategoryImgPath,
                prevPage: 'Subcategories'
            })}>
                <Text>Category Name = {props.category.foodCategoryName}</Text>
                <Text>Category ID = {props.category.foodCategoryId}</Text>
                <Text>Category Image = {props.category.foodCategoryImgPath}</Text>
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