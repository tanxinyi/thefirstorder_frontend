import React from 'react';
import {
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MenuIcon = (props) => (
    <TouchableOpacity onPress={()=>props.onPress()}>
        <Icon name="menu" size={30}/>
    </TouchableOpacity>
);

export default MenuIcon;
