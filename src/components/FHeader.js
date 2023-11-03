import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {fonts} from '../Themes/FontsConfig';
import GradientBtn from './gradientBtn';
import Plus from '../../assets/svgs/wPlus.svg';
import {coinConvert} from '../utiles/export';
import Coin from '../../assets/svgs/smallCoin.svg';

const FHeader = (props) => {
    const {leftIcon, headerText, navigation} = props;
    const {
        mainStyle, leftStyle, headingTextStyle, grafientStyle, backIconStyle,
    } = styles;
    const {color} = useTheme();
    const {fontChange, tempCoins} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (<View style={mainStyle}>
            <View style={leftStyle}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={backIconStyle}
                    >
                        {leftIcon}
                    </TouchableOpacity>
                    <Text
                        style={[headingTextStyle, {
                            color: color.white, fontFamily: font.bold,
                        },]}
                    >
                        {headerText}
                    </Text>
                </View>
                <GradientBtn
                    style={grafientStyle}
                    leftIcon={<Plus alignSelf="center"/>}
                    leftOnPress={() => navigation.navigate('BuyCoins')}
                    coins={coinConvert(tempCoins) || 0}
                    rightIcon={<Coin alignSelf="center"/>}
                    disabled={true}
                />
            </View>
        </View>);
};

export default FHeader;

const styles = StyleSheet.create({
    mainStyle: {
        marginHorizontal: wp(5), marginVertical: hp(2),
    }, leftStyle: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, headingTextStyle: {
        fontSize: wp(6), marginLeft: wp(2), alignSelf: 'center', textAlign: 'center',
    }, grafientStyle: {
        width: wp(28), height: hp(5),
    }, backIconStyle: {
        alignSelf: 'center', justifyContent: 'center', width: wp(8), height: hp(4),
    },
});
