import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {fonts} from '../../Themes/FontsConfig';
import moment from 'moment';
import {useSelector} from 'react-redux';

const CommentsCard = ({
                          item,
                          onPressLike,
                          onPressReply,
                          show,
                          isLiked,
                          likeCounts,
                          onPressChildCommentLike,
                          onPressChildCommentReply,
                          navigation,
                      }) => {
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const dummyImg =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare10':
                return 'black';
                break;
            case 'ultra_rare13':
                return 'black';
                break;
            case 'ultra_rare14':
                return 'black';
                break;
            case 'ultra_rare15':
                return 'black';
                break;
            default:
                return color.white;
                break;
        }
    };

    return (
        <>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('OtherUserProfile', {
                            item: item?.user_id,
                        });
                    }}
                >
                    <FastImage
                        source={{
                            uri: item?.user_image || dummyImg,
                        }}
                        resizeMode="cover"
                        style={[styles.imageStyle, {borderColor: color?.white}]}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        ...styles.nameAndCommentContainer,
                        backgroundColor: color.msgTextColor,
                        padding: 5,
                        borderRadius: wp(2),
                    }}
                >
                    <Text
                        style={[
                            styles.name,
                            {
                                color: textColorCheck(),
                                fontFamily: font?.bold,
                            },
                        ]}
                    >
                        {item?.user}
                    </Text>
                    <Text
                        style={{
                            marginTop: hp(0.2),
                            color: color?.g12,
                            fontFamily: font?.medium,
                            width: wp(70),
                        }}
                    >
                        {item?.description}
                    </Text>

                    {item?.comment_image ? (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{alignSelf: 'center', marginBottom: hp(-2.3)}}
                            // onPress={() =>
                            //   setIsState({
                            //     uri:
                            //       item?.message_images[0]?.message_image ||
                            //       item?.message_images[0],
                            //     check: true,
                            //   })
                            // }
                        >
                            <FastImage
                                source={{
                                    uri: item?.comment_image,
                                }}
                                style={styles.imageStyle1}
                                resizeMode="cover"
                            />
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator size={'small'} color={color.white}/>
                            </View>
                        </TouchableOpacity>
                    ) : null}

                    <View style={styles.timeLikeReplyContainer}>
                        <Text
                            style={{
                                color: color.g12,
                                width: item?.comment_time.length > 10 ? wp(13) : wp(25),
                            }}
                            numberOfLines={1}
                        >
                            {moment(item?.comment_time).startOf('seconds').fromNow('a')}
                        </Text>
                        <TouchableOpacity
                            style={styles.replyContainer}
                            activeOpacity={0.8}
                            onPress={onPressLike}
                        >
                            <Text style={{color: color.g12, fontFamily: font?.regular}}>
                                {isLiked ? 'Unlike' : 'Like'}
                            </Text>
                            <Text
                                style={[
                                    styles.likes,
                                    {color: color.g12, fontFamily: font?.regular},
                                ]}
                            >
                                {likeCounts || ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.replyContainer}
                            activeOpacity={0.8}
                            onPress={onPressReply}
                        >
                            <Text style={{color: color.g12}}>{`Reply`}</Text>
                            <Text
                                style={[
                                    styles.replyCounts,
                                    {color: color.g12, fontFamily: font?.regular},
                                ]}
                            >
                                {item?.child_comment?.length == 0
                                    ? ''
                                    : item?.child_comment?.length || ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* reply box */}
            {show ? (
                <>
                    <FlatList
                        data={item?.child_comment}
                        keyExtractor={(item, index) => `key-${index}${item}`}
                        renderItem={({item, index}) => (
                            <>
                                <View
                                    style={[
                                        styles.cardContainer,
                                        {marginStart: '10%', marginTop: hp(2)},
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('OtherUserProfile', {
                                                item: item?.user_id,
                                            });
                                        }}
                                    >
                                        <FastImage
                                            source={{
                                                uri: item?.user_image || dummyImg,
                                            }}
                                            resizeMode="cover"
                                            style={[styles.imageStyle, {borderColor: color?.white}]}
                                        />
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            ...styles.nameAndCommentContainer,
                                            backgroundColor: color.msgTextColor,
                                            padding: 5,
                                            borderRadius: wp(2),
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.name,
                                                {
                                                    color: textColorCheck(),
                                                    fontFamily: font?.bold,
                                                },
                                            ]}
                                        >
                                            {item?.user}
                                        </Text>
                                        <Text
                                            style={{
                                                width: wp(60),
                                                marginTop: hp(0.2),
                                                color: color?.g12,
                                                fontFamily: font?.light,
                                            }}
                                        >
                                            {item?.description}
                                        </Text>

                                        {item?.comment_image ? (
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                style={{alignSelf: 'center', marginBottom: hp(-2.3)}}
                                                // onPress={() =>
                                                //   setIsState({
                                                //     uri:
                                                //       item?.message_images[0]?.message_image ||
                                                //       item?.message_images[0],
                                                //     check: true,
                                                //   })
                                                // }
                                            >
                                                <FastImage
                                                    source={{
                                                        uri: item?.comment_image,
                                                    }}
                                                    style={styles.imageStyle1}
                                                    resizeMode="cover"
                                                />
                                                <View style={styles.activityIndicator}>
                                                    <ActivityIndicator
                                                        size={'small'}
                                                        color={color.white}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        ) : null}

                                        <View style={styles.timeLikeReplyContainer}>
                                            <Text style={{color: color.g12}}>
                                                {moment(item?.child_comment_time)
                                                    .startOf('seconds')
                                                    .fromNow()}
                                            </Text>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => onPressChildCommentLike(item?.id, index)}
                                            >
                                                <Text style={{color: color.g12}}>
                                                    {item?.child_comment_like_status
                                                        ? 'Unlike '
                                                        : 'Like '}
                                                    {item?.child_comment_like_count == 0
                                                        ? ''
                                                        : item?.child_comment_like_count}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => onPressChildCommentReply(item, index)}
                                            >
                                                <Text style={{color: color.g12}}>{`Reply `}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : null}
        </>
    );
};

export default CommentsCard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
    },
    nameAndCommentContainer: {
        marginStart: wp(4),
    },
    name: {
        fontSize: wp(4),
    },
    timeLikeReplyContainer: {
        width: wp(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: hp(1),
    },
    imageStyle: {
        width: wp(13),
        height: wp(13),
        borderRadius: hp(5),
        borderWidth: wp(0.5),
    },
    postComment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 5,
    },
    imgStyle: {
        width: wp(12),
        height: wp(12),
        borderRadius: hp(5),
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(1),
        borderRadius: wp(10),
        justifyContent: 'space-between',
    },
    textInput: {
        width: wp(58),
        padding: wp(3),
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyingView: {
        width: '80%',
        alignSelf: 'flex-end',
    },
    likes: {
        marginStart: wp(1),
        top: hp(0.1),
        fontSize: hp(1.6),
    },
    replyCounts: {
        marginStart: wp(1),
        top: hp(0.1),
        fontSize: hp(1.6),
    },
    imageStyle1: {
        width: wp(60),
        height: wp(30),
        borderRadius: wp(1),
        marginVertical: hp(2),
        zIndex: 1,
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});
