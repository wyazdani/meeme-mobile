import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {fonts} from '../../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import RNDrive from '../RNDrive';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import RNButton from '../RNButton';
import RightArrow from '../../../assets/svgs/rightArrow.svg';
import {textColor} from '../../utiles/themeSelectot';
import {SvgUri} from 'react-native-svg';

const dummyImg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
const MessagesCard = ({
                          item,
                          onPress,
                          status,
                          purpose,
                          onPress1,
                          navigation,
                      }) => {
    const {user} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector(
        (state) => state.appReducer,
    );
    const font = fonts(fontChange);

    const icons = theme_data?.nav_bar;

    console.log('item======>', item);

    return (
        <>
            <TouchableOpacity
                disabled={purpose == 'btnShow' ? true : false}
                onPress={onPress}
                activeOpacity={0.8}
                style={styles.card}
            >
                {/* user image and status */}
                <TouchableOpacity
                    style={styles.userImage}
                    onPress={() => {
                        navigation.navigate('OtherUserProfile', {
                            item: item?.sender_id || item?.user?.id,
                        });
                    }}
                >
                    <FastImage
                        source={{
                            uri:
                                purpose == 'btnShow' || purpose == 'btnNotShow'
                                    ? item?.user_image || item?.sender_image || dummyImg
                                    : user?.id == item?.sender_id
                                        ? item?.receiver_image || dummyImg
                                        : item?.sender_image || dummyImg,
                        }}
                        style={[styles.image, {backgroundColor: color.g8}]}
                    />
                    {status && (
                        <View style={[styles.online, {backgroundColor: color?.gr1}]}/>
                    )}
                </TouchableOpacity>

                {/* user name and status  */}
                <View style={styles.nameAndFirstMessage}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('OtherUserProfile', {
                                    item: item?.sender_id || item?.user?.id,
                                });
                            }}
                        >
                            <Text
                                style={[
                                    styles.userName,
                                    {
                                        color: color?.white,
                                        fontFamily: font?.bold,
                                    },
                                ]}
                                numberOfLines={1}
                            >
                                {purpose == 'btnShow' || purpose == 'btnNotShow'
                                    ? item?.user?.username || item?.sender_name
                                    : user?.id == item?.sender_id
                                        ? item?.receiver_name
                                        : item?.sender_name || ''}
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={[
                                styles.message,
                                {color: color.g18, fontFamily: font?.regular},
                            ]}
                            numberOfLines={2}
                        >
                            {item?.message_images_count > 0
                                ? 'Image.jpg'
                                : item?.body || item?.user?.email}

                            {item?.user?.email || purpose == 'arrow' ? null : (
                                <Text>
                                    . {moment(item?.created_at).startOf('s').fromNow('h')}
                                </Text>
                            )}
                        </Text>
                    </View>

                    {/* time and forward icon */}
                    {purpose == 'btnShow' ? (
                        <RNButton
                            // isLoading={isLoading}
                            clr1={
                                item?.request ||
                                (item?.notification_type == 'request_accepted' &&
                                    app_Theme == 'rare2')
                                    ? color?.notiBtn
                                    : item?.request ||
                                    item?.notification_type == 'request_accepted'
                                        ? color?.notiBtn
                                        : app_Theme == 'ultra_rare2'
                                            ? 'rgba(255, 255, 255, 0.4)'
                                            : color.linerClr1
                            }
                            clr2={
                                item?.request ||
                                (item?.notification_type == 'request_accepted' &&
                                    app_Theme == 'rare2')
                                    ? color?.notiBtn
                                    : item?.request ||
                                    item?.notification_type == 'request_accepted'
                                        ? color?.notiBtn
                                        : app_Theme == 'ultra_rare2'
                                            ? 'rgba(255, 255, 255, 0.4)'
                                            : color.linerClr2
                            }
                            textColor={
                                color.linerClr1 == 'rgba(93, 51, 173, 1)'
                                    ? color.white
                                    : item?.request ||
                                    item?.notification_type == 'request_accepted'
                                        ? textColor(app_Theme, color.white).followBtn
                                        : color.bl1
                            }
                            borderClr={
                                item?.request || item?.notification_type == 'request_accepted'
                                    ? color.borderClr
                                    : 'transparent'
                            }
                            family={font.regular}
                            fontSize={hp(1.4)}
                            btnWidth={wp(22)}
                            btnHeight={hp(5)}
                            btnRadius={wp(10)}
                            btnVertical={hp(1)}
                            title={
                                item?.notification_type == 'request_accepted'
                                    ? 'Following'
                                    : item?.request
                                        ? item?.user?.private_account
                                            ? 'Pending'
                                            : 'Following'
                                        : 'Follow'
                            }
                            onPress={onPress1}
                        />
                    ) : purpose == 'btnNotShow' ? null : (
                        <View style={styles.timeAndIcon}>
                            <Text
                                style={[
                                    styles.messageTime,
                                    {color: color.g18, fontFamily: font?.regular},
                                ]}
                                numberOfLines={1}
                            >
                                {moment(item?.created_at).startOf('s').fromNow()}
                            </Text>
                            {icons?.forward ? (
                                <SvgUri alignSelf="center" uri={icons?.forward}/>
                            ) : (
                                <RightArrow alignSelf="center" marginRight={wp(2)}/>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <RNDrive borderClr={color.g10} borderWidth={0.6}/>
        </>
    );
};

export default MessagesCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        marginBottom: hp(1),
    },
    userImage: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        marginStart: hp(1),
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: hp(5),
        resizeMode: 'cover',
    },
    online: {
        width: 15,
        height: 15,
        borderRadius: hp(5),
        position: 'absolute',
        bottom: hp(1),
        right: hp(1.5),
        borderColor: 'white',
        borderWidth: 2,
    },
    forward: {
        width: wp(4),
        height: wp(4),
        resizeMode: 'contain',
        marginStart: hp(2),
        marginTop: hp(1),
    },
    nameAndFirstMessage: {
        width: wp(68),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
        fontSize: hp(2),
        width: wp(40),
    },
    message: {
        fontSize: hp(1.5),
        marginTop: hp(0.5),
        width: wp(40),
    },
    messageTime: {
        fontSize: hp(1.2),
        bottom: hp(1),
        width: wp(16),
        marginRight: wp(2),
    },
    timeAndIcon: {
        flexDirection: 'row',
        width: wp(20),
        justifyContent: 'space-between',
    },
});
