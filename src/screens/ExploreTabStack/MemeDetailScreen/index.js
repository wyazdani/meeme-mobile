import MasonryList from '@react-native-seoul/masonry-list';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {useTheme} from 'react-native-paper';
import Share from 'react-native-share';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {
    GETALLCOMMENTS, LIKEPOST, MORE_LIKE_THIS, SHARE_POST_COUNT,
} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import VideoPlayerModal from '../../../components/Modals/VideoPlayerModal';
import PostCard from '../../../components/PostCard';
import RandomImageCard from '../../../components/RandomImageCard';
import {fonts} from '../../../Themes/FontsConfig';
import LinearGradient from 'react-native-linear-gradient';

const MemeDetailScreen = ({navigation, route}) => {
    const font = fonts(fontChange);
    const {item} = route?.params;
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const {token} = useSelector((state) => state.authReducer);
    const [isPosts, setIsPosts] = useState({...item, isLoading: true});
    const [moreLikePosts, setMoreLikePosts] = useState([]);
    const [isImageViwer, setIsImageViwer] = useState(null);
    const [videoUri, setVideoUri] = useState(null);
    const [videoPlayerModal, setVideoPlayerModal] = useState(false);
    const [isPlay, setIsPlay] = useState(0);

    const bgImage = theme_data?.bgImage;

    useFocusEffect(useCallback(() => {
        moreLikeThis();
        getComments();
    }, [navigation]),);

    // get comments count
    const getComments = () => {
        HitApi(`${GETALLCOMMENTS}?post_id=${item?.post?.id}`, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    setIsPosts({
                        ...item, post_comments_count: res?.data?.comments[0]?.post_comments_count,
                    });
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
            });
    };

    const moreLikeThis = async () => {
        const data = new FormData();
        data.append('post_id', item?.post?.id);
        data.append('tag', item?.post?.tag_list[0]);
        let res = await HitApi(MORE_LIKE_THIS, 'post', data, token);
        if (res?.status == 200) {
            setMoreLikePosts(res?.data?.explore_posts);
        } else {
        }
    };

    const LikePost = (id) => {
        const data = new FormData();
        data.append('post_id', id);

        if (isPosts.liked_by_current_user) {
            isPosts.post_likes = parseInt(isPosts.post_likes) - 1;
            isPosts.liked_by_current_user = false;
            setIsPosts({...isPosts});
        } else {
            isPosts.post_likes = parseInt(isPosts.post_likes) + 1;
            isPosts.liked_by_current_user = true;
            setIsPosts({...isPosts});
        }

        HitApi(LIKEPOST, 'post', data, token).then((res) => {
            if (res?.status == 200) {
                console.log('LIKE or dislike done');
            }
        });
    };

    // no pst found container
    const noPost = () => {
        return (<View style={styles.noPostFound}>
            <Text
                style={{
                    color: color.white, opacity: 0.6,
                }}
            >
                No Post Found
            </Text>
        </View>);
    };

    const ImageViwer = () => {
        return (<ImageView
            images={[{
                uri: isImageViwer?.uri,
            },]}
            imageIndex={0}
            visible={isImageViwer?.check}
            onRequestClose={() => setIsImageViwer({uri: '', check: false, type: ''})}
            swipeToCloseEnabled={false}
            animationType="fade"
        />);
    };

    const selectedVideo = (item) => {
        setIsPlay(-1);
        let type = item?.post_image?.split('.')?.slice(-1)[0];
        const video = type == 'mp4v' ? item.post_image.slice(0, -1) : item?.post_image;
        setVideoUri(video);
        setVideoPlayerModal(true);
    };

    const shareMemee = async (id, index, postImage, des) => {
        Share.open({
            title: `Post Description:\n ${des}\n` || 'Share a file',
            failOnCancel: false,
            message: `Post Description:\n ${des}\n` || '',
            urls: [postImage],
        })
            .then(async (resp) => {
                const data = new FormData();
                data.append('post_id', id);
                let res = await HitApi(SHARE_POST_COUNT, 'post', data, token);

                if (res?.status == 200) {
                    setIsPosts({
                        ...isPosts, post: {
                            ...isPosts.post, share_count: isPosts?.post?.share_count + 1,
                        },
                    });
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((err) => {
                err && console.log(err);
            });
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
                {ImageViwer()}
                <Header
                    title={'Memee Details'}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    fontSize={hp(2.2)}
                    navigation={navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PostCard
                        index={0}
                        item={isPosts}
                        likePress={() => LikePost(isPosts?.post?.id)}
                        onDelete={() => deletePost(index, isPosts?.post?.id)}
                        navigation={navigation}
                        isPlay={isPlay}
                        shareMemee={() => shareMemee(isPosts?.post?.id, 0, isPosts?.post_image, isPosts?.post?.description,)}
                        imageView={setIsImageViwer}
                        videoPlayerModal={() => selectedVideo(item)}
                    />

                    <View style={styles.innerContainer}>
                        <Text
                            style={{
                                ...styles.likeThis, fontFamily: font?.bold, color: color?.white,
                            }}
                        >
                            More like this
                        </Text>

                        {/* Random Images */}
                        <MasonryList
                            data={moreLikePosts}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            style={styles.randomContainer}
                            renderItem={({item, index}) => (<RandomImageCard item={item} index={index}/>)}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={noPost()}
                        />
                    </View>
                </ScrollView>
                <VideoPlayerModal
                    show={videoPlayerModal}
                    hide={setVideoPlayerModal}
                    uri={videoUri}
                />
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default MemeDetailScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp('1'), alignItems: 'center', marginTop: hp(1.5),
    }, likeThis: {
        fontSize: 20, alignSelf: 'center', marginTop: hp(3),
    }, randomContainer: {
        marginTop: hp(2), bottom: 10, marginBottom: hp(6),
    }, noPostFound: {
        marginVertical: hp(8), justifyContent: 'center', alignItems: 'center',
    },
});
