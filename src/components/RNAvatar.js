import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const RNAvatar = ({
                      img,
                      plus,
                      userName,
                      marginHorizontal,
                      borderRadius,
                      width,
                      height,
                      clr1,
                      clr2,
                      onPress,
                      index,
                  }) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    return (
        <View key={index}>
            <LinearGradient
                colors={[clr1, clr2]}
                style={{
                    width: width + 6,
                    height: height + 6,
                    borderRadius: borderRadius,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginHorizontal: marginHorizontal,
                }}
                start={{y: 0, x: 0.0}}
                end={{y: 0.9, x: 0.0}}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        width: width,
                        height: height,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: color.g8,
                        borderRadius: borderRadius,
                    }}
                    onPress={onPress}
                >
                    <FastImage
                        source={{
                            uri: img,
                        }}
                        style={{
                            width: width,
                            height: height,
                            borderRadius: wp(10),
                            alignSelf: 'center',
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.plus}
            >
                {plus}
            </TouchableOpacity>
            <Text
                style={[styles.userName, {fontFamily: font.bold, color: color.white}]}
                numberOfLines={1}
            >
                {userName}
            </Text>
        </View>
    );
};

export default RNAvatar;

const styles = StyleSheet.create({
    userName: {
        alignSelf: 'center',
        fontSize: wp(4.3),
        textAlign: 'center',
        marginTop: hp(1.2),
        width: wp(16),
    },
    plus: {
        position: 'absolute',
        right: hp(1.5),
        bottom: hp(4.2),
    },
});
