import React, {useCallback, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
    Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {HitApi} from '../../../APIHits/APIHandler';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
    CREATE_CHILD_COMMENT, GETALLCOMMENTS, LIKEPOST,
} from '../../../APIHits/urls';
import MediaSelectionPopup from '../../../components/Modals/MediaSelectionPopup';
import CommentsCard from '../../../components/Cards/CommentsCard';
import ImageIcon from '../../../../assets/svgs/image.svg';
import LinearGradient from 'react-native-linear-gradient';
import {AppLoader} from '../../../components/RNLoader';
import {fonts} from '../../../Themes/FontsConfig';

import {inputColor, textColor} from '../../../utiles/themeSelectot';
import RNDrive from '../../../components/RNDrive';
import Header from '../../../components/Header';
import Cross from '../../../../assets/svgs/lightCross.svg';
import {SvgUri} from 'react-native-svg';

var commentIndex = 0;

const CommentScreen = ({navigation, route}) => {
    const {token, user} = useSelector((state) => state.authReducer);
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);
    const flatListRef = useRef(null);
    const inputRef = useRef();
    const {postId} = route?.params;
    const {color} = useTheme();

    const [mediaSelect, setMediaSelect] = useState(false);
    const [media, setMedia] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [postComment, setPostComment] = useState(null);
    const [postReply, setPostReply] = useState(null);
    const [isIndex, setIsIndex] = useState(null);
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(true);
    const [selectedChild, setSelectedChild] = useState(null);
    const [commentReply, setCommentReply] = useState(null);
    const [selectedChildCommentId, setSelectedChildCommentId] = useState(null);
    const icons = theme_data?.nav_bar;

    const bgImage = theme_data?.bgImage;

    useFocusEffect(useCallback(() => {
        setIsLoading(true);
        getComments();
    }, [navigation]),);

    // get all comments
    const getComments = () => {
        HitApi(`${GETALLCOMMENTS}?post_id=${postId}`, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    setComments(res?.data?.comments);
                } else {
                    Alert.alert('Error', res?.message);
                }
                setIsLoading(false);
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
                setIsLoading(false);
            });
    };

    // post comment
    const commentPost = () => {
        const data = new FormData();
        data.append('description', postComment);
        data.append('post_id', postId);
        if (media != null) {
            data.append('comment_image', media);
        }

        HitApi(GETALLCOMMENTS, 'post', data, token)
            .then((res) => {
                if (res?.status == 200) {
                    let obj = {
                        child_comment: [],
                        comment_like_count: 0,
                        comment_time: res?.data?.comment?.created_at,
                        description: postComment,
                        id: res?.data?.comment?.id,
                        parent_id: res?.data?.comment?.parent_id,
                        post_comments_count: 0,
                        user: user?.username,
                        user_id: res?.data?.comment?.user_id,
                        user_comment_like_status: false,
                        user_image: user?.img,
                        comment_image: res?.data?.comment_image,
                    };
                    comments.unshift(obj);
                    setComments(comments);
                    setPostComment(null);
                    setMedia(null);
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;

                Alert.alert('Error', message);
            });
    };

    // on Press Reply
    const onPressReply = (item, index) => {
        commentIndex = index;
        setSelectedChild(item);
        setSelectedChildCommentId(item?.id);
        setCommentReply(true);
        inputRef.current.focus();
        setShow(!show);
    };

    // post reply
    const replyPost = (item) => {
        setSelectedChildCommentId(item?.id);
    };

    // like unlike comment
    const likeComment = async (commentId, index) => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('comment_id', commentId);

        if (comments[index].user_comment_like_status) {
            comments[index].comment_like_count = parseInt(comments[index].comment_like_count) - 1;
            comments[index].user_comment_like_status = false;
            setComments([...comments]);
        } else {
            comments[index].comment_like_count = parseInt(comments[index].comment_like_count) + 1;
            comments[index].user_comment_like_status = true;
            setComments([...comments]);
        }

        let res = await HitApi(LIKEPOST, 'POST', data, token);
        if (res?.status == 200) {
            console.log('Successfully Like or unlike comment ');
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    // like unlike child comment
    const likeChildComment = async (id, childIndex, index) => {
        if (comments[index].child_comment[childIndex].child_comment_like_status) {
            comments[index].child_comment[childIndex].child_comment_like_status = false;
            comments[index].child_comment[childIndex].child_comment_like_count = comments[index].child_comment[childIndex].child_comment_like_count - 1;
            setComments([...comments]);
        } else {
            comments[index].child_comment[childIndex].child_comment_like_status = true;
            comments[index].child_comment[childIndex].child_comment_like_count = comments[index].child_comment[childIndex].child_comment_like_count + 1;
            setComments([...comments]);
        }

        var FormData = require('form-data');
        var data = new FormData();
        data.append('comment_id', id);

        let res = await HitApi(LIKEPOST, 'POST', data, token);
        if (res?.status == 200) {
            console.log('Child comments like unlike successfully');
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    // reply child comment
    const replyChildComment = (item, index) => {
        commentIndex = index;
        setSelectedChild(item);
        setSelectedChildCommentId(item?.parent_id);
        inputRef.current.focus();
        setCommentReply(true);
    };

    // reply child comment
    const replyChild = () => {
        const data = new FormData();
        data.append('post_id', postId);
        data.append('comment_id', selectedChildCommentId);
        data.append('description', postComment);
        if (media != null) {
            data.append('comment_image', media);
        }
        HitApi(CREATE_CHILD_COMMENT, 'post', data, token)
            .then((res) => {
                if (res?.status == 200) {
                    let obj = {
                        child_comment_like_count: 0,
                        child_comment_like_status: false,
                        child_comment_time: new Date(),
                        description: postComment,
                        id: res?.data?.comment?.id,
                        parent_id: res?.data?.comment?.parent_id,
                        user: user?.username,
                        user_id: res?.data?.comment?.user_id,
                        user_image: user?.img,
                        child_comment_image: res?.data?.child_comment_image,
                    };

                    comments[commentIndex].child_comment.push(obj);
                    setComments([...comments]);
                    setPostComment(null);
                    setSelectedChild(null);
                    setMedia(null);
                    setTimeout(() => {
                        setCommentReply(false);
                        setSelectedChild(null);
                    }, 2500);
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;

                Alert.alert('Error', message);
            });
    };

    // cancel comment
    const onPressCancel = () => {
        commentIndex = null;
        setCommentReply(false);
        setSelectedChild(null);
    };

    const handleScroll = (index) => {
        flatListRef.current.scrollToIndex({
            animated: true, index: index,
        });
    };

    const RemoveImage = () => {
        setMedia(null);
    };

    return (<View style={{...styles.main, backgroundColor: color?.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.main}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={styles.main}
                resizeMode="cover"
            >
                <Header
                    title={'Comments'}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    fontSize={hp(2.2)}
                    navigation={navigation}
                />
                <View style={styles.innerContainer}>
                    <>
                        {comments?.length == 0 ? (<View style={styles.noCommentsView}>
                            <Text style={{color: color?.g3, fontFamily: font.medium}}>
                                No Comments
                            </Text>
                        </View>) : (<FlatList
                            ref={flatListRef}
                            data={comments}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            renderItem={({item, index}) => (<>
                                <CommentsCard
                                    item={item}
                                    show={index == isIndex && !show}
                                    onPressReply={() => {
                                        handleScroll(index);
                                        onPressReply(item, index);
                                        setIsIndex(index);
                                    }}
                                    PostReply={() => replyPost(item)}
                                    setPostReply={setPostReply}
                                    postReply={postReply}
                                    onPressLike={() => likeComment(item?.id, index)}
                                    isLiked={item?.user_comment_like_status}
                                    likeCounts={item?.comment_like_count == 0 ? '' : item?.comment_like_count}
                                    onPressChildCommentLike={(id, childIndex) => likeChildComment(id, childIndex, index)}
                                    onPressChildCommentReply={(item, childIndex) => replyChildComment(item, index)}
                                    selectedChild={selectedChild}
                                    navigation={navigation}
                                />
                                <RNDrive borderClr={color.g10} marginVertical={hp(2)}/>
                            </>)}
                            showsVerticalScrollIndicator={false}
                        />)}
                    </>

                    {selectedChild != null && (<View style={styles.replyingView}>
                        <Text
                            style={{
                                color: color.g1, fontFamily: font.light, width: wp(50),
                            }}
                            numberOfLines={1}
                        >{`replying to ${selectedChild?.user}`}</Text>
                        <TouchableOpacity onPress={onPressCancel} activeOpacity={0.8}>
                            <Text
                                style={{
                                    color: color.g1, fontFamily: font.bold, left: hp(2),
                                }}
                            >{`cancel`}</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>

                {/* Post comment  */}
                {media != null ? (<View
                    style={{
                        flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: wp(3),
                    }}
                >
                    <View style={styles.mainImageView}>
                        <TouchableOpacity
                            // disabled={loading}
                            style={styles.crossBtnStyle}
                            onPress={() => RemoveImage()}
                        >
                            <Cross alignSelf="center"/>
                        </TouchableOpacity>

                        <View
                            style={[styles.btnStyle1, {
                                height: media == null ? wp(13) : wp(30),
                                marginTop: media == null ? hp(5) : hp(2),
                            },]}
                        >
                            <FastImage
                                source={{
                                    uri: media?.uri,
                                }}
                                style={styles.imageStyle}
                            />
                        </View>
                    </View>
                </View>) : null}
                <View style={[styles.postComment]}>
                    <FastImage
                        style={styles.imgStyle}
                        source={{
                            uri: user?.img || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
                        }}
                    />
                    <View
                        style={[styles.textInputContainer, {
                            backgroundColor: textColor(app_Theme, color.g8).serachColor,
                        },]}
                    >
                        <TextInput
                            ref={inputRef}
                            style={{
                                ...styles.textInput, fontFamily: font.medium, color: inputColor(app_Theme),
                            }}
                            placeholder={commentReply ? 'Write a reply' : 'Write a comment'}
                            placeholderTextColor={color.g11}
                            value={postComment}
                            onChangeText={(val) => {
                                setPostComment(val);
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setMediaSelect(true)}
                            style={styles.btnStyle}
                        >
                            {icons?.gallery ? (<SvgUri uri={icons?.gallery}/>) : (<ImageIcon alignSelf="center"/>)}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (commentReply) {
                                    replyChild();
                                } else {
                                    commentPost();
                                }
                            }}
                            disabled={postComment == null ? true : false}
                        >
                            <Text
                                style={{
                                    color: color?.y1, fontFamily: font.medium, marginRight: wp(2),
                                }}
                            >
                                {commentReply ? 'Reply' : 'Post'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
        <MediaSelectionPopup
            isVisible={mediaSelect}
            navigation={navigation}
            setMediaSelect={setMediaSelect}
            screenName="CreateSupport"
            setImg={setMedia}
            mediaType="photo"
        />
    </View>);
};

export default CommentScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp(3), marginTop: hp(2),
    }, postComment: {
        borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: hp(1.5),
        marginBottom: hp(2),
    }, imgStyle: {
        width: wp(12), height: wp(12), borderRadius: hp(5),
    }, textInputContainer: {
        flexDirection: 'row', alignItems: 'center', width: wp(80),

        borderRadius: wp(10), justifyContent: 'space-around',
    }, textInput: {
        width: wp(56), padding: wp(3),
    }, noCommentsView: {
        flex: 1, alignSelf: 'center', justifyContent: 'center',
    }, replyingView: {
        width: '80%', alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center',
    }, btnStyle: {justifyContent: 'center'},

    //
    mainImageView: {
        marginTop: hp(5), width: wp(32),
    }, crossBtnStyle: {
        position: 'absolute', right: 0, top: hp(2), width: wp(5), height: hp(5), zIndex: 1,
    }, btnStyle1: {
        justifyContent: 'center', width: wp(30), borderRadius: wp(5), zIndex: 0,
    }, imageStyle: {
        width: wp(28), height: wp(28), borderRadius: wp(3), alignSelf: 'center',
    },
});
