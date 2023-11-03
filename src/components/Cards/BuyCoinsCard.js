import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {useTheme} from 'react-native-paper';
import {fonts} from '../../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import GradientBtn from '../gradientBtn';
import FastImage from 'react-native-fast-image';

const BuyCoinsCard = ({coins, btnText, onPress}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const {color} = useTheme();
    const font = fonts(fontChange);
    return (<View style={[styles.cardContainer, {backgroundColor: color.g6}]}>
        <View
            style={{
                alignItems: 'center', height: hp(14), justifyContent: 'space-between',
            }}
        >
            <FastImage
                source={require('../../../assets/pngs/coin.png')}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
            <LinearGradientText
                colors={[color?.linerClr11, color?.linerClr12]}
                text={coins}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                textStyle={[styles.priceStyle, {fontFamily: font?.bold}]}
            />
            <GradientBtn
                style={{
                    width: wp(37), height: hp(5),
                }}
                coins={btnText}
                onPress={onPress}
            />
        </View>
    </View>);
};

export default BuyCoinsCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: wp(45),
        padding: hp(2),
        borderRadius: hp(3),
        margin: hp(0.5),
        justifyContent: 'space-around',
        alignItems: 'center',
    }, priceStyle: {
        fontSize: hp(3),
    },
});
