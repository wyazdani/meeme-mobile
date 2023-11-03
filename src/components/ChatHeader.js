import React from 'react';
import {
    Keyboard, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import BackArrow from '../../assets/svgs/arrow-left.svg';
import {fonts} from '../Themes/FontsConfig';
import RNDrive from './RNDrive';
import {SvgUri} from 'react-native-svg';

const ChatHeader = ({
                        navigation, userName, status, receiverImage, onPressUser,
                    }) => {
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const icons = theme_data?.nav_bar;

    return (<>
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.arrowStyle}
                onPress={() => {
                    Keyboard.dismiss();
                    setTimeout(() => {
                        navigation.goBack();
                    }, 200);
                }}
            >
                {icons?.back ? <SvgUri uri={icons?.back}/> : <BackArrow/>}
            </TouchableOpacity>

            {/* user Image and status  */}
            <TouchableOpacity
                onPress={onPressUser}
                activeOpacity={0.5}
                style={styles.nameAndPicContainer}
            >
                <View style={styles.userImage}>
                    <FastImage
                        source={{
                            uri: receiverImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                        }}
                        style={styles.image}
                    />
                    {status ? (<View style={[styles.online, {backgroundColor: color?.gr1}]}/>) : null}
                </View>

                {/* username and status  */}
                <View style={styles.nameAndStatus}>
                    <Text
                        style={[styles.userName, {color: color.white, fontFamily: font?.bold},]}
                    >
                        {userName}
                    </Text>
                    <Text
                        style={[styles.message, {color: `${color.g19}90`, fontFamily: font?.regular},]}
                    >
                        {status ? 'Active now' : 'Offline'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        {/* horizontal line */}
        <RNDrive borderClr={color.g5}/>
    </>);
};

export default ChatHeader;

const styles = StyleSheet.create({
    mainContainer: {
        width: wp(98), flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: 10,
    }, arrowStyle: {
        resizeMode: 'contain',
    }, userImage: {
        width: wp(10), height: wp(10), borderRadius: wp(10), justifyContent: 'center', marginStart: hp(1.5),
    }, image: {
        width: wp(10), height: wp(10), borderRadius: wp(10), resizeMode: 'cover',
    }, online: {
        width: 12,
        height: 12,
        borderRadius: hp(5),
        position: 'absolute',
        bottom: 2,
        right: hp(0),
        borderColor: 'white',
        borderWidth: 2,
    }, nameAndStatus: {
        marginStart: hp(1.5),
    }, userName: {
        fontSize: hp(2),
    }, message: {
        fontSize: hp(1.5), marginTop: hp(0.2),
    }, nameAndPicContainer: {
        flexDirection: 'row', alignItems: 'center',
    },
});
