import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';

import {font} from '../../assets/fonts/index';
import Coin from '../../assets/svgs/smallCoin.svg';
import Hand from '../../assets/svgs/hand.svg';
import Noti from '../../assets/svgs/notification.svg';
import RedNoti from '../../assets/svgs/redNotification.svg';
import Plus from '../../assets/svgs/wPlus.svg';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import GradientBtn from './gradientBtn';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';

const MainHeader = ({
                        img,
                        coins,
                        text,
                        storeOnPress,
                        notiOnPress,
                        plusOnPress,
                        onPress,
                        showRedDot = false,
                    }) => {
    const {color} = useTheme();
    const {fontChange, app_Theme, theme_data} = useSelector(
        (state) => state.appReducer,
    );
    const font = fonts(fontChange);
    const icons = theme_data?.nav_bar;

    return (
        <>
            <View style={styles.mainSyle}>
                {img ? (
                    <TouchableOpacity
                        onPress={onPress}
                        style={{...styles.imageViewStyle, backgroundColor: color.black}}
                    >
                        <FastImage
                            source={{
                                uri: img,
                            }}
                            style={[styles.imageStyle, {backgroundColor: color.g8}]}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={{
                            ...styles.headerTextStyle,
                            color: color.white,
                            fontFamily: font.bold,
                        }}
                    >
                        {text}
                    </Text>
                )}
                <View style={styles.iconsContainer}>
                    <TouchableOpacity
                        onPress={storeOnPress}
                        style={{justifyContent: 'center'}}
                    >
                        {icons?.shop ? (
                            <SvgUri alignSelf={'center'} uri={icons?.shop}/>
                        ) : (
                            <Hand alignSelf="center"/>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={notiOnPress}
                        style={{justifyContent: 'center'}}
                    >
                        {showRedDot ? (
                            <>
                                {icons?.dot_notification ? (
                                    <SvgUri alignSelf={'center'} uri={icons?.dot_notification}/>
                                ) : (
                                    <RedNoti alignSelf="center"/>
                                )}
                            </>
                        ) : (
                            <>
                                {icons?.notification ? (
                                    <SvgUri alignSelf={'center'} uri={icons?.notification}/>
                                ) : (
                                    <Noti alignSelf="center"/>
                                )}
                            </>
                        )}
                    </TouchableOpacity>

                    <GradientBtn
                        style={{
                            width: wp(28),
                            height: hp(5),
                        }}
                        leftIcon={<Plus alignSelf="center"/>}
                        leftOnPress={plusOnPress}
                        coins={coins}
                        rightIcon={<Coin alignSelf="center"/>}
                        disabled={true}
                    />
                </View>
            </View>
        </>
    );
};

export default MainHeader;

const styles = StyleSheet.create({
    mainSyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageViewStyle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(12),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imageStyle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(12),
        alignSelf: 'center',
    },
    coinsStyle: {
        marginHorizontal: wp(2),
        fontFamily: font.dmBold,
        fontSize: hp(2.5),
        alignSelf: 'center',
    },
    headerTextStyle: {
        width: wp(30),
        alignSelf: 'center',
        fontSize: hp(2),
        fontFamily: font.dmRegular,
    },
    gradientStyle: {
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        width: wp(35),
        height: hp(5),
        borderRadius: wp(5),
    },
    iconsContainer: {
        width: wp(46),
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    redDot: {
        width: wp(2.5),
        height: wp(2.5),
        backgroundColor: 'red',
        position: 'absolute',
        top: hp(1.8),
        right: 0,
        borderRadius: hp(1),
    },
});
