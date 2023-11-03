import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {fonts} from '../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';

const FoundUserCard = ({item, onPress}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
            <View style={styles.cardContainer}>
                <FastImage
                    source={{
                        uri:
                            item?.user_image ||
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                    }}
                    style={styles.imageStyle}
                />
                <View style={styles.textContainer}>
                    <Text
                        style={[styles.name, {color: color.white, fontFamily: font.bold}]}
                    >
                        {item?.username}
                    </Text>
                    <Text
                        style={[
                            styles.mentionName,
                            {color: color.g19, fontFamily: font.medium},
                        ]}
                    >
                        {`@${item?.username?.replace(/\s/g, '')}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FoundUserCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageStyle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(14),
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginStart: hp(2),
    },
    name: {
        fontSize: hp(1.8),
    },
    mentionName: {
        fontSize: hp(1.8),
        marginTop: hp(0.8),
    },
});
