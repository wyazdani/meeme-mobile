import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {color} from "../../assets/colors";

const RNSearch = ({svg, onPress, placeholder, changeText, editable}) => {
    return (<TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.container}
    >
        <View style={styles.svgStyle}>{svg}</View>
        <Text style={styles.textStyle}>{"Search hashtags, usernames"}</Text>
        {/* <TextInput
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={color.g9}
        style={{ width: wp(65), color: color.white, fontSize: hp(2.2) }}
        onChangeText={changeText}
      /> */}
    </TouchableOpacity>);
};

export default RNSearch;

const styles = StyleSheet.create({
    textStyle: {
        color: color.g9, fontSize: hp(2), marginStart: "5%",
    }, container: {
        height: hp(7), flexDirection: "row", alignItems: "center", borderRadius: wp(8), backgroundColor: color.g8,
    }, svgStyle: {
        marginStart: "5%",
    },
});
