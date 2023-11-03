import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';

const GradientBtn = ({
                         leftIcon, rightIcon, coins, leftOnPress, style, disabled, onPress,
                     }) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (<TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{justifyContent: 'center'}}
    >
        <LinearGradient
            colors={[color.linerClr3, color.linerClr4]}
            style={{...styles.gradientStyle, ...style}}
            start={{y: 0, x: 0}}
            end={{y: 0.9, x: 0}}
        >
            {leftIcon ? (<TouchableOpacity
                style={{
                    justifyContent: 'center', width: wp(7), height: wp(7), borderRadius: wp(7), alignSelf: "center",
                }}
                onPress={leftOnPress}
            >
                {leftIcon}
            </TouchableOpacity>) : null}
            <Text
                style={[styles.coinsStyle, {
                    color: color?.bl4, fontFamily: font.bold,
                },]}
                numberOfLines={1}
            >
                {coins}
            </Text>
            {rightIcon ? rightIcon : null}
        </LinearGradient>
    </TouchableOpacity>);
};

export default GradientBtn;

const styles = StyleSheet.create({
    gradientStyle: {
        shadowOffset: {
            width: 0, height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: wp(5),
        borderColor: 'transparent',
        padding: hp(0.5),
    }, coinsStyle: {
        fontSize: hp(2), alignSelf: 'center', marginHorizontal: wp(1),
    },
});
