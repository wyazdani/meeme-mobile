import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {fonts} from '../../Themes/FontsConfig';

const RankingCard = ({item, textColor}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (
        <View style={{...styles.mainContainer, backgroundColor: color?.g6}}>
            <FastImage
                resizeMode="contain"
                style={styles.imageStyle}
                source={require('../../../assets/pngs/rankBg.png')}
            >
                <Text
                    style={{
                        ...styles.position,
                        color: textColor,
                        fontFamily: font.bold,
                    }}
                >
                    {item?.position.slice(0, 1)}
                    <Text style={{fontSize: hp(1.6), fontFamily: font.regular}}>
                        {item?.position.slice(1, 3)}
                    </Text>
                </Text>
            </FastImage>
            <Image style={styles.icon} source={item?.icon}/>
            <Text
                style={{
                    ...styles.description,
                    color: color.white,
                    fontFamily: font.medium,
                }}
            >
                {item?.description}
            </Text>
        </View>
    );
};

export default RankingCard;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: hp(6.5),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp(5),
        marginTop: hp(0.5),
    },
    position: {
        right: hp(1.9),
        bottom: hp(1.7),
        fontStyle: 'italic',
        fontSize: hp(2),
    },
    icon: {
        width: wp(8),
        height: hp(8),
        resizeMode: 'contain',
    },
    description: {
        marginStart: wp(3),
        fontStyle: 'italic',
        fontSize: hp(2),
    },
    imageStyle: {
        width: wp(25),
        height: hp(25),
        top: 7,
        right: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
