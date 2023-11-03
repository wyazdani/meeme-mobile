import {Alert, Platform} from "react-native";
import {DELETEPOST, LIKEPOST, TRANDINGPOSTS} from "../../APIHits/urls";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppLoader} from "../../components/RNLoader";
import {HitApi} from "../../APIHits/APIHandler";
import Toast from "react-native-simple-toast";
import Posts from "../../components/Posts";
import {useSelector} from "react-redux";

const Trending =React.memo( ({
                      isScrolled,
                      setSelectedVideoUri,
                      setVideoPlayerModal,
                      setIsImageViewer,
                      navigation,
                      isLoading,
                      setIsLoading
                  }) => {
                    // console.log('DUCK', 'Screen', 'Trending')
    const [trendingPosts, setTrendingPosts] = useState([]);
    const {token} = useSelector((state) => state.authReducer);
    const [postPageSize, setPostPageSize] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isPlay, setIsPlay] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isScrolled) {
            (async () => {
                setIsLoading(true);
                await fetchTrendingPosts(1, true);
            })();
        }
    }, [isScrolled]);


    const fetchTrendingPosts =useCallback( async (count, isFirstTime = false) => {
        let res = await HitApi(`${TRANDINGPOSTS}?page=${count}`, 'GET', '', token);

        if (res?.status === 200) {
            if (res?.data?.trending_posts?.length !== 0) {
                if (count === 1) {
                    setTrendingPosts(res?.data?.trending_posts);
                } else {
                    setTrendingPosts([...trendingPosts, ...res?.data?.trending_posts]);
                }
            }

            if (count !== postPageSize) {
                setPostPageSize(count);
            }
            if (!isFirstTime) {
                setIsLoading(false);
                setLoading(false);
            }
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
            setLoading(false);
        }
    },[]);

    const likePost = (id, index) => {
        setTrendingPosts((prevState) => prevState?.map((i, ind) => {
            if (trendingPosts[index]?.liked_by_current_user) {
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
            setTrendingPosts([...trendingPosts?.slice(0, index), ...trendingPosts?.slice(index + 1, trendingPosts?.length),]);
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
        await fetchTrendingPosts(count);
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
        <Posts postsList={trendingPosts} setPostList={trendingPosts} isLoading={isLoading} setIsLoading={setIsLoading}
               setIsImageViewer={setIsImageViewer} likePost={likePost} deletePost={deletePost} navigation={navigation}
               selectedVideo={selectedVideo} isPlay={isPlay} onEndReached={onEndReached} loading={loading}
               onRefresh={onRefresh}/>
    );
});

export default Trending;
