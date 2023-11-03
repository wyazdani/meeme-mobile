import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RNButton from './RNButton';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
const FRCard = ({onConfirm, onDecline, item, navigation}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);


    return (<View style={styles.cardView}>
        <View style={styles.cardInnerContainer}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('OtherUserProfile', {
                    item: item?.follower_user_id
                });
            }}>
                <FastImage
                    source={{uri: item?.follower_image || dummyImg}}
                    style={styles.imageStyle}
                /></TouchableOpacity>
            <View style={styles.nameContainer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('OtherUserProfile', {
                        item: item?.follower_user_id
                    });
                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.dateStyle, color: color.white, fontFamily: font.bold,
                        }}
                    >
                        {item?.follower_name || ''}
                    </Text></TouchableOpacity>

                <Text
                    numberOfLines={1}
                    style={{
                        ...styles.codeStyle, color: color.g2, fontFamily: font.medium,
                    }}
                >
                    Sent you a follow request.
                </Text>

                <View style={styles.buttonsContainer}>
                    <RNButton
                        clr1={color.linerClr1}
                        clr2={color.linerClr2}
                        textColor={color.bl1}
                        borderClr={'transparent'}
                        family={font.medium}
                        btnWidth={wp(25)}
                        btnHeight={hp(5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        title={'Confirm'}
                        onPress={onConfirm}
                    />
                    <RNButton
                        clr1={color.g8}
                        clr2={color.g8}
                        textColor={color.white}
                        borderClr={'transparent'}
                        family={font.regular}
                        btnWidth={wp(25)}
                        btnHeight={hp(5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        title={'Decline'}
                        onPress={onDecline}
                    />
                </View>
            </View>
        </View>

        <View style={styles.rightStyle}>
            <Text
                style={{
                    color: color.g2, fontFamily: font.medium, ...styles.countStyle,
                }}
            >
                {item?.time || ''}
            </Text>
        </View>
    </View>);
};

export default FRCard;

const styles = StyleSheet.create({
    cardView: {
        marginHorizontal: wp(3),
        borderRadius: wp(5),
        padding: wp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(1),
    }, card1View: {flexDirection: 'row', justifyContent: 'space-between'}, dateStyle: {
        fontSize: hp(2.3), marginBottom: hp(0.5),
    }, statusStyle: {
        marginRight: wp(1), fontSize: hp(1.7),
    }, codeStyle: {
        fontSize: hp(1.8), marginBottom: hp(0.2),
    }, messageStyle: {
        fontSize: hp(1.8), marginBottom: hp(0.2),
    }, imageStyle: {
        width: wp(14), height: wp(14), borderRadius: wp(14), marginTop: hp(0.5),
    }, cardInnerContainer: {
        flexDirection: 'row', alignSelf: 'center',
    }, nameContainer: {
        width: wp(52), marginStart: hp(2), alignSelf: 'center',
    }, buttonsContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
});
