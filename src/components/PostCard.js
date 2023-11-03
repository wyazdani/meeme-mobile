import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Heart from '../../assets/svgs/heart.svg';
import Comment from '../../assets/svgs/comment.svg';
import Share1 from '../../assets/svgs/share.svg';
import RedHeart from '../../assets/svgs/redHeart.svg';
import ThreeDot from '../../assets/svgs/threeDot.svg';
import Forward from '../../assets/svgs/forward.svg';
import {fonts} from '../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import RNDrive from './RNDrive';
import {coinConvert} from '../utiles/export';
import VideoPost from './VideoPost';
import {HitApi} from '../APIHits/APIHandler';
import {BLOCK_USER, FARWORD_MEMEE} from '../APIHits/urls';
import FormData from 'form-data';
import {SvgUri} from 'react-native-svg';

const PostCard =React.memo( ({
                      likePress,
                      imageView,
                      onDelete,
                      index,
                      item,
                      length,
                      isPlay,
                      refreshTHeAllPosts,
                      videoPlayerModal,
                      shareMemee,
                      navigation,
                      setIsLoading,
                      currentUserPost = false,
                      hide,
                      show = true,
                  }) => {
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const {user, token} = useSelector((state) => state.authReducer);
    const font = fonts(fontChange);
    const [loading, setLoading] = useState(false);
    const [press, setPress] = useState(true);
    const icons = theme_data?.nav_bar;

    const dummyImg =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

    let type = item?.post_type?.slice(0, 5) || 'image/jpg';
    const image = item?.compress_image || item?.post_image || dummyImg;
    const image2 = item?.post_thumbnail||dummyImg;
// console.log(">>>>item",image2)
    const openUserProfile = () => {
        if (user?.id == item?.post?.user_id) {
            navigation.navigate('BottomTab', {
                screen: 'Profile',
            });
        } else {
            navigation.navigate('OtherUserProfile', {
                item: item?.post?.user_id,
            });
        }
    };

    const imageOnPress = () => {
        imageView({
            uri: item?.compress_image,
            check: type == 'video' ? false : true,
            type: item?.post_type,
        });
    };

    const commentPress = () => {
        if (hide) {
            hide();
        }
        navigation.navigate('CommentScreen', {
            postId: item?.post?.id,
        });
    };

    const onEdit = () => {
        navigation.navigate('CreateMemeeScreen', {
            item: {
                img: {
                    type: item?.post_type,
                    uri: image,
                    name: type,
                },
                des: item?.post?.description,
                tags: item?.post?.tag_list,
                postId: item?.post?.id,
                check: 'editMemee',
            },
        });
    };

    const IndicatorLoadingView = () => {
        return (
            <>
                {loading ? (
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size="small"
                        color="white"
                    />
                ) : null}
            </>
        );
    };

    const DuplicateTags = () => {
        switch (item?.post?.duplicate_tags?.length) {
            case 0:
                return null;
                break;
            default:
                return (
                    <View
                        style={{
                            marginBottom: hp(2),
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        {item?.post?.duplicate_tags?.map((i, index) => {
                            return (
                                <TouchableOpacity disabled={true} key={index}>
                                    <Text
                                        style={{
                                            fontSize: hp(1.9),
                                            color: color.blue,
                                            marginHorizontal: wp(0.4),
                                            fontFamily: font.medium,
                                        }}
                                    >
                                        {i}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );
        }
    };

    const ShowPost = () => {
        if (!image) {
            return (
                <View style={styles.postImageStyle} key={Math.random()}>
                    <Text
                        style={[
                            styles.couldNotText,
                            {
                                color: color.g2,
                            },
                        ]}
                    >
                        Couldn't load the image
                    </Text>
                </View>
            );
        } else if (type == 'video') {
            return (<>
                {press?
                <VideoPost
                    image={image}
                    image2={image2}
                    isPlay={isPlay}
                    // videoPlayerModal={videoPlayerModal}
                    index={index}
                    // videoPriview={true}
                />: 
                <FastImage source={image2} style={{height:hp(20),width:wp(50)}}/>}
                </>);
        } else {
            return (
                <FastImage
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                        // cache: FastImage.cacheControl.immutable,
                    }}
                    // resizeMode="contain"
                    cache={FastImage.cacheControl.cacheOnly}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.postImageStyle}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            );
        }
    };

    const miniBtnApiCall = async (data, message, key) => {
        Alert.alert('Alert', message, [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    setIsLoading(true);
                    miniBtnApi(data, message, key);
                },
                style: 'default',
            },
        ]);
    };

    async function miniBtnApi(data, message, key) {
        let res = await HitApi(BLOCK_USER, 'post', data, token);
        if (res.status == 200) {
            switch (key) {
                case 'flag':
                    refreshTHeAllPosts(item?.post?.id, key);
                    Toast.showWithGravity(
                        'Post has been flaged',
                        Toast.SHORT,
                        Toast.BOTTOM,
                    );
                    break;
                case 'block':
                    refreshTHeAllPosts(item?.post?.user_id);
                    Toast.showWithGravity(
                        'User has been Blocked',
                        Toast.SHORT,
                        Toast.BOTTOM,
                    );

                    break;
                case 'report':
                    Toast.showWithGravity(
                        'User has been Reported',
                        Toast.SHORT,
                        Toast.BOTTOM,
                    );

                    break;
                default:
                    break;
            }
            setIsLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    }

    let miniBtns = ['Edit', 'Delete', 'Report', 'Block'];

    const miniBtnPress = (key) => {
        let data = new FormData();
        switch (key) {
            case 'Edit':
                onEdit();
                break;
            case 'Delete':
                onDelete();
                break;
            case 'Report':
                let img = {
                    type: item?.post_type,
                    uri: image,
                    name: 'media',
                };
                data.append('user_id', item?.post?.user_id);
                data.append('type', 'report');
                data.append('admin_user_id', 1);
                data.append('message_images[]', img);
                miniBtnApiCall(
                    data,
                    'Are you sure, You want to report this user',
                    'report',
                );
                break;
            case 'Block':
                data.append('user_id', item?.post?.user_id);
                data.append('type', 'block');
                miniBtnApiCall(
                    data,
                    'Are you sure, You want to block this user',
                    'block',
                );
                break;
            case 'Flag':
                data.append('post_id', item?.post?.id);
                data.append('type', 'flag');
                miniBtnApiCall(
                    data,
                    'Are you sure, You want to flag this post',
                    'flag',
                );
                break;
            default:
                break;
        }
    };

    const MiniBtnUI = () => {
        let temp =
            user?.id == item?.post?.user_id
                ? miniBtns?.slice(0, 2)
                : miniBtns?.slice(2, 4);

        return (
            <>
                {temp.map((item, i) => {
                    return (
                        <View key={i}>
                            <MenuOption onSelect={() => miniBtnPress(item)}>
                                <Text
                                    style={[
                                        styles.popupTextStyle,
                                        {
                                            color: color.white,
                                            fontFamily: font.regular,
                                        },
                                    ]}
                                >
                                    {item}
                                </Text>
                            </MenuOption>
                            {(item === 'Block' || item === 'Delete') && (
                                <RNDrive borderClr={'white'} marginHorizontail={wp(2)}/>
                            )}
                        </View>
                    );
                })}
            </>
        );
    };

    const farwordMeme = async () => {
        let data = new FormData();
        data.append('post_id', item?.post?.id);

        Alert.alert('Alert', 'Do you want to forward your meme in tournament.', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: async () => {
                    setIsLoading(true);
                    let res = await HitApi(FARWORD_MEMEE, 'post', data, token);

                    if (res?.status == 200) {
                        setIsLoading(false);
                        Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    } else {
                        setIsLoading(false);
                        Alert.alert('Error', res?.message);
                    }
                },
                style: 'default',
            },
        ]);
    };

    return (
        <View
            key={item?.post?.id}
            style={{
                marginBottom: length - 1 == index ? hp(10) : 0,
            }}
        >
            <View key={index} style={styles.mainView}>
                <>
                    {!currentUserPost ? (
                        <>
                            <View style={styles.subMainView}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={openUserProfile}>
                                        <FastImage
                                            source={{uri: item?.user_image || dummyImg}}
                                            style={[styles.imageStyle, {backgroundColor: color.g8}]}
                                        />
                                    </TouchableOpacity>
                                    <View style={{marginLeft: wp(3), alignSelf: 'center'}}>
                                        <TouchableOpacity onPress={openUserProfile}>
                                            <Text
                                                style={{
                                                    ...styles.nameStyle,
                                                    color: color.white,
                                                    fontFamily: font.bold,
                                                }}
                                                numberOfLines={1}
                                            >
                                                {item?.username}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                ...styles.timeStyle,
                                                color: color.g1,
                                                fontFamily: font.regular,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {moment(item?.post?.created_at)
                                                .startOf('seconds')
                                                .fromNow()}
                                        </Text>
                                    </View>
                                </View>
                                {/* {item?.post?.user_id == user?.id ? ( */}
                                <Menu>
                                    <MenuTrigger>
                                        <View style={styles.threeDotView}>
                                            {icons?.dots ? (
                                                <SvgUri alignSelf="center" uri={icons?.dots}/>
                                            ) : (
                                                <ThreeDot alignSelf="center"/>
                                            )}
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions
                                        optionsContainerStyle={{
                                            ...styles.menuOptionsStyle,
                                            backgroundColor: color.g6,
                                        }}
                                    >
                                        {MiniBtnUI()}
                                    </MenuOptions>
                                </Menu>
                                {/* ) : null} */}
                            </View>
                            <Text
                                style={{
                                    ...styles.textStyle,
                                    marginTop: hp(2),
                                    marginBottom:
                                        item?.post?.tag_list?.length == 0 ? hp(2) : hp(0.5),
                                    fontSize: hp(1.9),
                                    color: color.white,
                                    fontFamily: font.regular,
                                }}
                            >
                                {item?.post?.description}
                            </Text>
                            {DuplicateTags()}
                        </>
                    ) : null}
                </>
                <TouchableOpacity
                    onPress={() => {
                        if (type != 'video' && !currentUserPost) {
                            imageOnPress();
                        }
                    }}
                    activeOpacity={0.8}
                    style={{
                        width: wp(100),
                        height: currentUserPost ? hp(70) : hp(45),
                        alignSelf: 'center',
                        backgroundColor: 'black',
                    }}
                >
                    {ShowPost()}
                    {IndicatorLoadingView()}
                </TouchableOpacity>

                {show ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: hp(2),
                            width: wp(45),
                            alignSelf: 'flex-start',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity
                            // disabled={currentUserPost}
                            style={{
                                flexDirection: 'row',
                                width: wp(15),
                            }}
                            onPress={likePress}
                        >
                            {item?.liked_by_current_user ? (
                                <RedHeart alignSelf="center"/>
                            ) : (
                                <>
                                    {icons?.like ? (
                                        <SvgUri alignSelf={'center'} uri={icons?.like}/>
                                    ) : (
                                        <Heart alignSelf="center"/>
                                    )}
                                </>
                            )}
                            <Text
                                style={{
                                    ...styles.textStyle,
                                    marginHorizontal: hp(1),
                                    alignSelf: 'center',
                                    color: color.white,
                                    fontFamily: font.regular,
                                }}
                            >
                                {item?.post_likes == 0 ? '' : coinConvert(item?.post_likes)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // disabled={currentUserPost}
                            style={{
                                flexDirection: 'row',
                                width: wp(15),
                            }}
                            onPress={commentPress}
                        >
                            <>
                                {icons?.comment ? (
                                    <SvgUri alignSelf={'center'} uri={icons?.comment}/>
                                ) : (
                                    <Comment alignSelf="center"/>
                                )}
                            </>
                            <Text
                                style={{
                                    ...styles.textStyle,
                                    fontFamily: font.regular,
                                    marginHorizontal: hp(1),
                                    alignSelf: 'center',
                                    color: color.white,
                                }}
                            >
                                {item?.post_comments_count == 0
                                    ? ''
                                    : coinConvert(item?.post_comments_count)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={currentUserPost}
                            style={{flexDirection: 'row', width: wp(15)}}
                            onPress={shareMemee}
                        >
                            {icons?.share ? (
                                <SvgUri alignSelf={'center'} uri={icons?.share}/>
                            ) : (
                                <Share1 alignSelf="center"/>
                            )}

                            <Text
                                style={{
                                    ...styles.textStyle,
                                    fontFamily: font.regular,
                                    marginHorizontal: hp(1),
                                    alignSelf: 'center',
                                    color: color.white,
                                }}
                            >
                                {item?.post?.share_count == 0 ? '' : item?.post?.share_count}
                            </Text>
                        </TouchableOpacity>
                        {item?.post?.user_id == user?.id ? (
                            <TouchableOpacity
                                style={{flexDirection: 'row', width: wp(15)}}
                                onPress={farwordMeme}
                            >
                                {icons?.tournament_forward ? (
                                    <SvgUri alignSelf="center" uri={icons?.tournament_forward}/>
                                ) : (
                                    <Forward alignSelf="center"/>
                                )}
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ) : null}
            </View>
            {show ? <RNDrive borderClr={color.g10}/> : null}
        </View>
    );
});

export default PostCard;

const styles = StyleSheet.create({
    mainView: {marginVertical: hp(3), marginHorizontal: wp(5)},
    subMainView: {flexDirection: 'row', justifyContent: 'space-between'},
    popupTextStyle: {marginVertical: hp(1), marginLeft: wp(3)},
    imageStyle: {
        width: wp(11.5),
        height: wp(11.5),
        borderRadius: wp(11.5),
        alignSelf: 'center',
    },
    postImageStyle: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    textStyle: {fontSize: hp(1.5)},
    nameStyle: {fontSize: hp(2.1)},
    timeStyle: {fontSize: hp(1.9)},
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
    },
    menuOptionsStyle: {
        width: wp(27),
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
        marginTop: hp(2.3),
        marginLeft: wp(-7),
    },
    threeDotView: {
        width: wp(10),
        height: hp(5),
        justifyContent: 'center',
    },
    playBtnStyle: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: wp(12),
        height: wp(7),
        borderRadius: wp(1),
    },
    playIconBtn: {
        position: 'absolute',
        backgroundColor: '#FFFFFF33',
        width: wp(15),
        height: wp(15),
        borderRadius: wp(15),
        zIndex: 1,
        marginTop: hp(18),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    couldNotText: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
