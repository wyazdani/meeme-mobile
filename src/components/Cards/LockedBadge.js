import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Lock from '../../../assets/svgs/lock.svg';
import {fonts} from '../../Themes/FontsConfig';
import FastImage from 'react-native-fast-image';
import {textColor} from '../../utiles/themeSelectot';

const LockedBadge = ({index, item}) => {
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (
        <View style={[styles.mainView, {backgroundColor: color.g6}]} key={index}>
            <View style={styles.headerView}>
                <View
                    // onPress={() => ProgressBar()}
                    style={[styles.headerLeftView, {backgroundColor: `${color.g1}25`}]}
                >
                    {/* <Text style={{ alignSelf: 'center' }}>Badge</Text> */}
                    <FastImage
                        source={{uri: item?.badge_image}}
                        style={styles.badgeStyle}
                        resizeMode="contain"
                    />
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="small" color={'white'}/>
                    </View>
                </View>

                <Lock marginTop={hp(1)}/>
            </View>
            <Text
                style={[
                    styles.titleTextStyle,
                    {
                        color: textColor(app_Theme, color?.white).text,
                        fontFamily: font.bold,
                    },
                ]}
                numberOfLines={1}
            >
                {item?.title}
            </Text>
            <Text
                style={[
                    styles.desTextStyle,
                    {
                        fontFamily: font.medium,
                        color: color?.white,
                    },
                ]}
                numberOfLines={2}
            >
                {item?.title}
            </Text>
            <Text
                style={[
                    styles.badgeNameStyle,
                    {
                        fontFamily: font.medium,
                        color: color?.white,
                    },
                ]}
                numberOfLines={2}
            >
                {`Rarity: ${item?.rarity?.match(/\d+/)[0]}`}
            </Text>
            {/* <Text
        style={[
          styles.pointTextStyle,
          {
            color: color.white,
            fontFamily: font.medium,
          },
        ]}
        numberOfLines={2}
      >
        14 Points Needed
      </Text>

      <View style={styles.progressViewBar}>
        <Animated.View
          style={[
            styles.progressViewBar2,
            { backgroundColor: color.y1, width: wp(isValue) },
          ]}
        />
      </View> */}
        </View>
    );
};

export default LockedBadge;

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: wp(2),
        marginBottom: hp(3),
        borderRadius: wp(6),
        width: wp(45),
        height: hp(25),
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(2),
        marginHorizontal: wp(4),
    },
    headerLeftView: {
        width: wp(17),
        height: hp(8.5),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeStyle: {
        width: wp(12),
        height: hp(7.5),
        zIndex: 1,
    },
    titleTextStyle: {
        marginHorizontal: wp(4),
        fontSize: wp(4.2),
    },
    desTextStyle: {
        marginHorizontal: wp(4),
        fontSize: wp(3),
        color: '#8E8DAF',
        marginVertical: hp(1.3),
    },
    badgeNameStyle: {
        color: '#8E8DAF',
        marginHorizontal: wp(4),
        fontSize: wp(3),
        marginVertical: hp(0.5),
    },
    pointTextStyle: {
        marginHorizontal: wp(4),
        fontSize: wp(3),
        marginVertical: hp(1),
    },
    progressViewBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.21)',
        width: wp(36),
        height: hp(0.7),
        marginHorizontal: wp(4),
        borderRadius: wp(10),
    },
    progressViewBar2: {
        height: hp(0.7),
        borderRadius: wp(10),
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        justifyContent: 'center',
    },
});
