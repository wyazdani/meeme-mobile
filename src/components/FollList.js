import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {fonts} from '../Themes/FontsConfig';
import RNButton from './RNButton';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const FollList = (props) => {
    const {
        item, onPress, onPressUnBlock, unBlockButton = false, disabled = false, onPressUserProfile,
    } = props;

    const {username, profile_image} = item?.follower_user_detail || item?.following_user_detail || item;

    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    return (<TouchableOpacity
        disabled={disabled}
        style={{marginHorizontal: wp(5), marginVertical: hp(1.5)}}
        onPress={onPress}
    >
        <View style={styles.main}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={onPressUserProfile}>
                    <FastImage
                        source={{uri: profile_image || dummyImg}}
                        style={{
                            width: wp(13), height: wp(13), borderRadius: wp(13), backgroundColor: color.g8,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressUserProfile}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            marginLeft: wp(5),
                            fontFamily: font.medium,
                            color: color.white,
                            fontSize: wp(3.5),
                        }}
                    >
                        {username || ''}
                    </Text>
                </TouchableOpacity>
            </View>
            {unBlockButton && (<RNButton
                // isLoading={isLoading}
                clr1={color.linerClr1}
                clr2={color.linerClr2}
                textColor={color.bl1}
                borderClr={'transparent'}
                family={font.regular}
                fontSize={hp(1.4)}
                btnWidth={wp(22)}
                btnHeight={hp(5)}
                btnRadius={wp(10)}
                btnVertical={hp(1)}
                title={'Unblock'}
                onPress={onPressUnBlock}
            />)}
        </View>
    </TouchableOpacity>);
};

export default FollList;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, innerContainer: {
        flexDirection: 'row', alignItems: 'center',
    },
});
