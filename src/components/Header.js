import {
    Keyboard, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svgs/arrow-left.svg';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import RNDrive from './RNDrive';
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';

const Header = ({
                    navigation,
                    isLeftIcon,
                    isCenterText,
                    isRightIcon = false,
                    title,
                    isLoading = false,
                    count,
                    rightText = 'absx',
                    textColor = 'transparent',
                    onPress,
                    goBack,
                    fontSize,
                }) => {
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const rightTextColor = rightText?.length > 0 ? textColor : 'transparent';
    const icons = theme_data?.nav_bar;

    return (<>
        <View style={styles.headerContainer}>
            {isLeftIcon && (<TouchableOpacity
                activeOpacity={0.8}
                disabled={isLoading}
                style={styles.arrowStyle}
                onPress={goBack ? goBack : () => {
                    Keyboard.dismiss();
                    setTimeout(() => {
                        navigation.goBack();
                    }, 200);
                }}
            >
                {icons?.back ? <SvgUri uri={icons?.back}/> : <BackArrow/>}
            </TouchableOpacity>)}
            {isCenterText && (<View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 0,
                }}
            >
                <Text
                    style={{
                        fontFamily: font?.medium, color: color?.white, fontSize: hp(2.1), alignSelf: 'center',
                    }}
                >
                    {title}
                </Text>
            </View>)}
            {isRightIcon ? (<TouchableOpacity
                onPress={onPress}
                style={{
                    position: 'absolute', width: wp(15), height: '100%', right: 0,

                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: rightTextColor,
                        fontFamily: font.medium,
                        fontSize: wp(3.8),
                        alignSelf: 'flex-end',
                    }}
                >
                    {rightText || ''}
                </Text>
            </TouchableOpacity>) : (<View
                style={{
                    height: hp(4),
                    maxWidth: wp(25),
                    borderRadius: hp(5),
                    borderWidth: 1,
                    borderColor: color.white,
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    position: 'absolute',
                    right: 0,
                }}
            >
                <Text
                    style={{
                        color: color.white, fontFamily: font.bold, fontSize: hp(2), paddingLeft: wp(3),
                    }}
                >
                    {count}
                </Text>
                <Text
                    style={{
                        color: color.g15, fontFamily: font.bold, fontSize: hp(2), paddingRight: wp(3),
                    }}
                >
                    /25
                </Text>
            </View>)}
        </View>
        <RNDrive
            borderClr={color.g5}
            marginHorizontal={wp(5)}
            marginVertical={hp(0.5)}
        />
    </>);
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: wp(5), flexDirection: 'row', height: hp(5),
    }, arrowStyle: {
        position: 'absolute', width: wp(15), height: '100%', justifyContent: 'center', left: 0, zIndex: 1,
    },
});
