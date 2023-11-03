import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BottomSheet} from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import PostCard from '../../components/PostCard';
import {HitApi} from '../../APIHits/APIHandler';
import {LIKEPOST} from '../../APIHits/urls';
import {useSelector} from 'react-redux';

const VideoPlayerModal = ({show, hide, item, navigation}) => {
    const {token, user} = useSelector((state) => state.authReducer);
    const {color} = useTheme();

    const [isPost, setIsPost] = useState({
        post_type: item?.post_type,
        compress_image: item?.post_image,
        post_image: item?.post_image,
        post_comments_count: item?.post_comments_count,
        post_likes: item?.post_likes,
        liked_by_current_user: item?.liked_by_current_user,
        post: {
            share_count: item?.post_share_count, id: item?.post_id,
        },
    });

    const likePost = () => {
        if (isPost?.liked_by_current_user) {
            isPost.liked_by_current_user = false;
            isPost.post_likes = isPost.post_likes - 1;
            setIsPost({...isPost});
        } else {
            isPost.liked_by_current_user = true;
            isPost.post_likes = isPost.post_likes + 1;
            setIsPost({...isPost});
        }
        const data = new FormData();
        data.append('post_id', isPost?.post?.id);

        HitApi(LIKEPOST, 'post', data, token).then((res) => {
            if (res?.status != 200) {
                Alert.alert('Error', res?.message);
            }
        });
    };

    return (<BottomSheet isVisible={show}>
        <View style={[styles.main, {backgroundColor: color.black}]}>
            <View style={styles.innerContainer}>
                <View style={styles.crossIcon}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => hide(false)}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}
                >
                    <PostCard
                        index={0}
                        item={isPost}
                        isPlay={0}
                        currentUserPost={true}
                        likePress={() => likePost()}
                        navigation={navigation}
                        hide={hide}
                        show={false}
                    />
                </View>
            </View>
        </View>
    </BottomSheet>);
};

export default VideoPlayerModal;

const styles = StyleSheet.create({
    main: {
        width: wp(100), height: hp(100), justifyContent: 'center', alignItems: 'center',
    }, innerContainer: {
        width: wp(90), height: hp(90),
    }, closeButton: {
        marginRight: 10,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#ffffff20',
    }, closeText: {
        lineHeight: 22, fontSize: 19, textAlign: 'center', color: '#FFF', includeFontPadding: false,
    }, videoStyle: {
        width: wp(90), height: hp(75), marginTop: hp(2),
    }, crossIcon: {
        alignSelf: 'flex-end', zIndex: 1,
    }, activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    },
});
