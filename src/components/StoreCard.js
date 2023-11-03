import {
    StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {fonts} from '../Themes/FontsConfig';
import GradientBtn from './gradientBtn';
import FastImage from 'react-native-fast-image';
import {textColor} from '../utiles/themeSelectot';

const StoreCard = ({
                       coins,
                       img,
                       name,
                       onPress,
                       imgResizeMode,
                       imgStyle,
                       coinIcon,
                       disabled,
                       btnStyle,
                       isHttps = false,
                   }) => {
    const {themeGradientbtnStyle, cardView, flexStyle} = styles;
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [loading, setLoading] = useState(true);

    return (<TouchableOpacity
            style={[cardView, {backgroundColor: color.g6, ...btnStyle}]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={flexStyle}>
                <Text
                    style={{
                        color: textColor(app_Theme, color?.white).text,
                        opacity: 0.7,
                        fontFamily: font.regular,
                        marginLeft: wp(2),
                        alignSelf: 'center',
                    }}
                >
                    {name}
                </Text>
                <GradientBtn
                    leftIcon={coinIcon}
                    coins={coins}
                    style={themeGradientbtnStyle}
                    disabled={true}
                    //onPress={onPress}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <FastImage
                    source={isHttps ? {uri: img} : img}
                    style={imgStyle}
                    resizeMode={imgResizeMode}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>
            {loading ? (<View style={styles.activityIndicator}>
                    <ActivityIndicator size="small" color={'white'}/>
                </View>) : null}
        </TouchableOpacity>);
};

export default StoreCard;

const styles = StyleSheet.create({
    themeGradientbtnStyle: {
        minWidth: wp(15), maxWidth: wp(30), height: hp(4),
    }, cardView: {
        width: wp(90),
        marginHorizontal: wp(5),
        borderRadius: wp(8),
        alignSelf: 'center',
        marginBottom: hp(2),
        paddingHorizontal: hp(1),
    }, flexStyle: {
        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(3), marginTop: hp(1.3),
    }, activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, justifyContent: 'center',
    },
});
