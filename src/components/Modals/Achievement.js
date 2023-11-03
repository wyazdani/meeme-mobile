import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {fonts} from '../../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {BottomSheet} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const Achievement = ({title, description, show, hide, image}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (
        <BottomSheet isVisible={show} containerStyle={{}}>
            <View style={[styles.main, {backgroundColor: color.bgColor}]}>
                <FastImage
                    source={image}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.textStyle,
                            {color: color.white, fontFamily: font.bold},
                        ]}
                    >
                        {title}
                    </Text>
                    <Text
                        style={{
                            color: color.white,
                            fontSize: hp(2),
                            fontFamily: font.light,
                            marginHorizontal: wp(8),
                            textAlign: 'center',
                        }}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        </BottomSheet>
    );
};

export default Achievement;

const styles = StyleSheet.create({
    main: {
        width: wp(100),
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: wp(100),
        height: hp(80),
        resizeMode: 'cover',
    },
    textStyle: {
        fontSize: hp(3),
        marginVertical: hp(2),
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: hp(12),
    },
});
