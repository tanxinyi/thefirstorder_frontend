import React, { Component } from "react";
import {Toast} from 'native-base';
import {View, Dimensions, Text, TextInput, TouchableOpacity, Vibration, PermissionsAndroid} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

class ScanningPage extends Component {
    constructor(props){
        super(props);
        this.state={
            qrCode:'T001',
            email:''
        }
        this.navigate = this.props.navigation.navigate;
    };

    componentWillMount(){
        if(this.state.email == ''){
            this.setState({email: this.props.screenProps.email})
        }
    }

    render() {
        console.log("Scanning Page Render");
        if(this.props.navigation.state.params != null && this.props.navigation.state.error != null){
            Toast.show({
                text:"Unable to register table",
                buttonText:"Okay",
                duration: 3000
            })
        }
        const { navigate } = this.props.navigation;
        return (
            <QRCodeScanner
                onRead={(e) =>
                    navigate('OrderMainPage', {
                        qrCodeString : e.data,
                        email : this.state.email
                    })
                }
                showMarker
                cameraStyle={{ top: -80, height: SCREEN_HEIGHT }}
                customMarker={
                    <View style={styles.rectangleContainer}>
                        <View style={styles.topOverlay}>
                            <Text style={{ top: 80, fontSize: 30, color: "white" }}>
                                QR CODE SCANNER
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay} />

                            <View style={styles.rectangle}>
                                <Icon
                                    name="ios-qr-scanner"
                                    size={SCREEN_WIDTH * 0.73}
                                    color={iconScanColor}
                                />

                            </View>

                            <View style={styles.leftAndRightOverlay} />
                        </View>

                        <View style={styles.topOverlay}>
                            <Text style={{ fontSize: 20, color: "white" }}>
                                Not working? Enter Table ID here!
                            </Text>

                            <TextInput
                                style={{ height: 45,width: "50%",borderColor: "gray",borderWidth: 2, color: 'white'}}
                                // Adding hint in TextInput using Placeholder option.
                                placeholder="Eg: T001"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                name={"qrCode"}
                                id={"qrCode"}
                                value = {this.state.qrCode}
                                onChangeText= {(tableValue ) => this.setState({qrCode: tableValue})}
                                TextInput/>

                            <TouchableOpacity onPress ={() =>
                                navigate('OrderMainPage', {
                                    qrCodeString: this.state.qrCode,
                                    email : this.state.email,
                                    navigation: this.props.navigation
                                })
                            } style = {styles.button}>
                                <Text >
                                    ENTER
                                </Text>

                            </TouchableOpacity >
                        </View>
                    </View>
                }
            />
        );
    }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
    button: {
        backgroundColor: "rgb(192,192,192)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        height: 40,
        width: 150,
        top: 10,
        alignItems: "center",
        justifyContent: "center",


    },

    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: rectBorderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        paddingBottom: SCREEN_WIDTH * 0.25
    },

    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor
    },

    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
        backgroundColor: scanBarColor
    },

    input:{
        top:10,
        bottom: 40,
        height: 40,
        width: 250,
        fontSize: 14,
        borderWidth:1,
        borderColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        textColor: 'white',
    }
};

export default ScanningPage;
