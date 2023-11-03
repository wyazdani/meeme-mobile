import {Alert, Platform} from "react-native";
import {DELETEPOST, LIKEPOST, RECENTPOSTS} from "../../APIHits/urls";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppLoader} from "../../components/RNLoader";
import {HitApi} from "../../APIHits/APIHandler";
import Toast from "react-native-simple-toast";
import Posts from "../../components/Posts";
import {useDispatch, useSelector} from "react-redux";
import {notificationRequests, SetJudgeCount_Coins} from "../../redux/Actions/appAction";
import {Logout} from "../../redux/Actions/authAction";

const Recent =React.memo( ({
                    isScrolled,
                    setSelectedVideoUri,
                    setVideoPlayerModal,
                    setIsImageViewer,
                    navigation,
                    setRequestCounts,
                    isLoading,
                    setIsLoading,
                   
                }) => {
                    // console.log('DUCK', 'Screen', 'Recent')
    const {judgedMemes} = useSelector((state) => state.appReducer);
    const [recentPosts, setRecentPosts] = useState([]);
    const {token} = useSelector((state) => state.authReducer);
    const [postPageSize, setPostPageSize] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fisrt, setFirst] = useState(false);
    const [isPlay, setIsPlay] = useState(0);
    // console.log("isPlay",isPlay);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isScrolled) {
            (async () => {
                setIsLoading(true);
                await fetchRecentPosts(1);
            })();
        }
    }, [isScrolled]);

    const fetchRecentPosts =useCallback( async (count) => {
        let res = await HitApi(`${RECENTPOSTS}?page=${count}`, 'GET', '', token);
        // console.log("recent post",JSON.stringify(res?.data?.recent_posts,null,2));
        if (res?.status === 200) {
            dispatch(SetJudgeCount_Coins(res?.data?.coins, judgedMemes));
            if (res?.data?.recent_posts?.length !== 0) {
                if (count === 1) {
                    setRecentPosts(res?.data?.recent_posts);
                    setRequestCounts(res?.data?.recent_posts[0]?.pending_requests);
                    dispatch(notificationRequests(res?.data?.recent_posts[0]?.pending_requests),);
                } else {
                    setRecentPosts([...recentPosts, ...res?.data?.recent_posts]);
                }

                if (count !== postPageSize) {
                    setPostPageSize(count);
                }
            }
            setIsLoading(false);
            setLoading(false);
        } else {
            if (res?.message === 'User not logged in' || res?.status === 401) {
                navigation?.replace('Before');
                dispatch(Logout());
            }
            Alert.alert('Error', res?.message);
            setIsLoading(false);
            setLoading(false);
        }
    },[]);

    const likePost = (id, index) => {
        setRecentPosts((prevState) => prevState?.map((i, ind) => {
            if (recentPosts[index]?.liked_by_current_user) {
                return ind !== index ? i : {
                    ...i, post_likes: i?.post_likes - 1, liked_by_current_user: false,
                };
            } else {
                return ind !== index ? i : {
                    ...i, post_likes: i?.post_likes + 1, liked_by_current_user: true,
                };
            }
        }));

        const data = new FormData();
        data.append('post_id', id);

        HitApi(LIKEPOST, 'post', data, token).then((res) => {
            if (res?.status !== 200) {
                Alert.alert('Error', res?.message);
            }
        });
    };

    const deletePost = async (index, id) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('post_id', id);
        let res = await HitApi(DELETEPOST, 'DELETE', data, token);
        if (res?.status === 200) {
            setRecentPosts([...recentPosts?.slice(0, index), ...recentPosts?.slice(index + 1, recentPosts?.length),]);
            setIsLoading(false);
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
        } else {
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setPostPageSize(1);
        setLoading(true);
        await getData(1);
    };

    const getData = async (count, index) => {
        await fetchRecentPosts(count);
    };

    const onEndReached = async () => {
        await getData(postPageSize + 1);
    };

    useFocusEffect(useCallback(() => {
        if (isFocused) {
            setIsPlay(0);
            setPostPageSize(1);
            return () => {
                setTimeout(() => {
                    if (Platform.OS === 'ios') {
                        setIsPlay(-1);
                    }
                }, 1000);
            };
        }
    }, [isFocused]));

    const selectedVideo = (item) => {
        const video = item?.post_image;
        setIsPlay(-1);
        setSelectedVideoUri(video);
        setVideoPlayerModal(true);
    };

    return (
        <Posts postsList={recentPosts} setPostList={recentPosts} isLoading={isLoading} setIsLoading={setIsLoading}
               setIsImageViewer={setIsImageViewer} likePost={likePost} deletePost={deletePost} navigation={navigation}
               selectedVideo={selectedVideo} isPlay={isPlay} onEndReached={onEndReached} loading={loading}
               onRefresh={onRefresh}/>
    );
});

export default Recent;
