import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import RedHeart from '../../../../assets/svgs/redHeart.svg';
import Header from '../../../components/Header';
import {fonts} from '../../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const OpenPost = ({navigation, route}) => {
    const {imageView, mainContainer, heartBtnStyle, heartTextStyle} = styles;

    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {item} = route?.params;

    const bgImage = theme_data?.bgImage;

    return (<View style={{...mainContainer, backgroundColor: color.bgColor}}>
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.mainContainer}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.mainContainer}
                    resizeMode="cover"
                >
                    <Header
                        title="Ranking Prizes"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        navigation={navigation}
                    />

                    <View style={imageView}>
                        <FastImage
                            source={{uri: item?.post_image}}
                            resizeMode="contain"
                            style={{height: '100%'}}
                        />
                    </View>

                    <TouchableOpacity
                        style={{...heartBtnStyle, backgroundColor: color.g6}}
                    >
                        <RedHeart alignSelf="center"/>
                        <Text
                            style={{
                                ...heartTextStyle, color: color.r1, fontFamily: font.bold,
                            }}
                        >
                            {item.post_likes}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default OpenPost;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, imageView: {
        height: hp(60), marginHorizontal: wp(2), marginTop: hp(10),
    }, heartBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(3),
        width: wp(30),
        height: hp(5),
        borderRadius: wp(10),
        alignSelf: 'center',
    }, heartTextStyle: {
        alignSelf: 'center', marginLeft: wp(4),
    },
});
