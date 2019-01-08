import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity

} from "react-native";

import {
    Header,
    Left,
    Body,
    Title
} from 'native-base'
import RF from "react-native-responsive-fontsize"
import EmptyCard from "../components/EmptyCard";
import MenuIcon from "../components/MenuIcon";

class HomePage extends Component {
    render() {
        console.log('Home Page');
        return (
            <View style = {styles.backgroundContainer}>
                <Header style = {styles.header}>
                    <Left>
                        <MenuIcon onPress={this.props.navigation.openDrawer}/>
                    </Left>
                    <Body style = {styles.headerTitle}>
                        <Title>HOMEPAGE</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >
                    <View style = {styles.overlay}>
                        <View style = {styles.logoPlaceholder}>
                            <Image source = {require('../images/makanow.jpg')} style = {styles.logo}/>
                            <Text style = {styles.logoName}>MAKANOW</Text>
                        </View>
                        <View style = {styles.options1}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ScanningPage')} >
                                <EmptyCard>
                                    <ImageBackground source = {require('../images/dineIn.jpg')} style = {styles.optionsPic}>
                                        <View style = {styles.overlayInner}>
                                            <Text style = {styles.caption}>DINE IN</Text>
                                        </View>
                                    </ImageBackground>

                                </EmptyCard>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.options}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Explore')} >
                                <EmptyCard>
                                    <ImageBackground source = {require('../images/explore.jpg')} style = {styles.optionsPic}>
                                        <View style = {styles.overlayInner}>
                                            <Text style = {styles.caption}>EXPLORE</Text>
                                        </View>
                                    </ImageBackground>
                                </EmptyCard>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    backgroundImage: {
        flex:1,
        width: null,
        height: null,

    },

    header: {
        backgroundColor: 'black',
    },

    headerTitle: {
        textAlign: 'center',
        flex:1,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },

    logoPlaceholder:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    options:{
        flex:1,
    },

    overlay: {
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        flex:1,
    },

    logo: {
        flex:1,
        height: 200,
        width: 200,
    },

    logoName: {
        fontSize: RF(4.5),
        color: 'black',
        fontWeight: '900',
        fontStyle: 'italic',


    },

    optionsPic: {
        height: 140,
        width: 250,
    },

    options1: {
        flex:1,
        paddingTop: 10,
    },

    overlayInner: {
        //hardcode and the white is covered which is wrong
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(246, 112, 117, 0.65))',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        top: '50%',

    },

    caption: {
        fontSize: RF(4),
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '900',
    },

    containerHeader: {
        backgroundColor: "#FFF"
    },



});

export default HomePage;