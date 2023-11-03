import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DELETEPOST, FOLLOWINGPOSTS, LIKE_UNLIKESTORIES, LIKEPOST, STORIES } from "../../APIHits/urls";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { styles } from "../../screens/AppScreens/HomeScreen/style";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StoryContainer } from "../../components/StoryModule";
import { HitApi } from "../../APIHits/APIHandler";
import Toast from "react-native-simple-toast";
import RNAvatar from "../../components/RNAvatar";
import Plus from "../../../assets/svgs/wPlus.svg";
import { useSelector ,useDispatch} from "react-redux";
import Modal from "react-native-modal";
import Posts from "../../components/Posts";
import { useTheme } from "react-native-paper";
import MediaSelectionPopup from "../../components/Modals/MediaSelectionPopup";
import { setTournament_Request } from "../../redux/Actions/appAction";
import StoryModal from "../../components/StoryModal";

const Followings =React.memo(({
    isScrolled,
    setSelectedVideoUri,
    setVideoPlayerModal,
    setIsImageViewer,
    navigation,
    selectedTabIndex,
    isLoading,
    setIsLoading
}) => {
    // console.log('DUCK', 'Screen', 'Following')
    const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    const [isVisible, setIsVisible] = useState({ isVisible: false, index: 0 });
    const [storiesPageSize, setStoriesPageSize] = useState(1);
    const [followingPosts, setFollowingPosts] = useState([]);
    const [mediaSelect, setMediaSelect] = useState(false);
    const { user, token } = useSelector((state) => state.authReducer);
    const [postPageSize, setPostPageSize] = useState(1);
    const [allStories, setAllStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPlay, setIsPlay] = useState(0);
    const [storyData, setStoryData] = useState(null);
    const modelRef = useRef();
    const isFocused = useIsFocused();
    const { color } = useTheme();
    const dispatch = useDispatch();
    const {is_tournament,is_following} = useSelector((state) => state.appReducer);
    useEffect(() => {
        if (isScrolled) {
            // console.log(">>>>>>000");
            (async () => {
                // setIsLoading(true);
                await fetchStories(1,true);
                await fetchFollowingPosts(1, true);
            })();
        }
    }, [isScrolled]);
   
    useEffect(() => {
        // console.log(">>>>>>");
        if (selectedTabIndex === 0) {
            (async () => {
                await fetchStories(1, true);
               
            })();
        }
    }, [selectedTabIndex]);
    useEffect(() => {
        // console.log(">>>>>>1111");
        if (is_tournament == true) {
            (async () => {
                await fetchFollowingPosts(1, true);
            })();
        }
    }, [is_tournament]);


    const fetchFollowingPosts =useCallback( async (count, isFirstTime = false) => {
        let res = await HitApi(`${FOLLOWINGPOSTS}?page=${count}`, 'GET', '', token);
        if (res?.status === 200) {
            if (res?.data?.following_posts?.length !== 0) {
                if (count === 1) {
                   
                    setFollowingPosts(res?.data?.following_posts);
                    setIsLoading(false);
                    setLoading(false);
                    dispatch(setTournament_Request(false))
                } else {
                  
                    setFollowingPosts([...followingPosts, ...res?.data?.following_posts]);
                    setIsLoading(false);
                    setLoading(false);
                    dispatch(setTournament_Request(false))
                }

                if (count !== postPageSize) {
                    setPostPageSize(count);
                }
            }else{
                setIsLoading(false);
                setLoading(false);
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

    // const StoryModal =React.memo( () => {
    //     return <Modal
    //         ref={modelRef}
    //         isVisible={isVisible?.isVisible}
    //         style={styles.openShare}
    //         animationIn="zoomIn"
    //         animationOut="zoomOut"
    //         swipeDirection="down"
    //         scrollHorizontal={false}
    //         swipeThreshold={0}
    //         onBackButtonPress={() => {
    //             setIsVisible({ ...isVisible, isVisible: false });
    //             setIsOpen({ ...isOpen, isOpen: false });
    //         }}
    //         onSwipeStart={(s) => {
    //             if (s?.dx < 0 && s?.dy > 0 && isVisible.index < allStories.length - 1) {
    //                 setStoryData(allStories[isVisible.index + 1]);
    //                 setIsVisible({ ...isVisible, index: isVisible.index + 1 });
    //             } else if (s?.dx > 0 && s?.dy < 0 && isVisible.index > 0) {
    //                 setStoryData(allStories[isVisible.index - 1]);
    //                 setIsVisible({ ...isVisible, index: isVisible.index - 1 });
    //             }
    //         }}
    //         onSwipeComplete={() => setIsVisible({ ...isVisible, isVisible: false })}
    //     >
    //         {isOpen?.isOpen ? (<View
    //             style={{
    //                 ...styles.isOpenStyle, borderColor: color.g1, backgroundColor: color.g6,
    //             }}
    //         >
    //             <TouchableOpacity
    //                 onPress={() => deleteStory(isOpen?.id, isOpen?.index)}
    //             >
    //                 <Text style={{ color: color.white }}>Delete</Text>
    //             </TouchableOpacity>
    //         </View>) : null}
    //         <StoryContainer
    //             visible={true}
    //             enableProgress={true}
    //             images={storyData?.stories}
    //             imageStyle={styles?.storyImageStyle}
    //             barStyle={{
    //                 barActiveColor: color.white,
    //                 barInActiveColor: 'rgba(255, 255, 255, 0.27)',
    //                 barWidth: 100,
    //                 barHeight: 1.8,
    //             }}
    //             setIsOpen={setIsOpen}
    //             duration={30}
    //             containerStyle={{ width: wp(100), height: hp(100) }}
    //             onComplete={() => {
    //                 setIsVisible({ ...isVisible, isVisible: false });
    //                 setIsOpen({ ...isOpen, isOpen: false });
    //             }}
    //             crossPress={() => {
    //                 setIsVisible({ ...isVisible, isVisible: false });
    //                 setIsOpen({ ...isOpen, isOpen: false });
    //             }}
    //             storyLike={(id, index) => like_unlikeStory(id, index)}
    //             deletePress={(id, index) => {
    //                 setIsOpen({ isOpen: true, id: id, index: index });
    //             }}
    //             userProfile={{
    //                 userImage: storyData?.stories[0]?.user_image, userName: storyData?.stories[0]?.username,
    //             }}
    //         />
    //     </Modal>;
    // });

    const deleteStory = async (id, index) => {
        setIsOpen(false);
        setIsLoading(true);
        const data = new FormData();
        data.append('story_id', id);
        let res = await HitApi(`${STORIES}/:id`, 'DELETE', data, token);
        if (res?.status === 200) {
            // setAllStories([
            //   ...allStories[isVisible.index].stories.slice(0, index),
            //   ...allStories[isVisible.index].stories.slice(
            //     index + 1,
            //     allStories[isVisible.index].stories.length,
            //   ),
            // ]);

            Alert.alert('Alert', res?.message);
            setIsLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    const like_unlikeStory = async (id, index) => {
        const data = new FormData();
        data.append('story_id', id);

        if (allStories[isVisible?.index]?.stories[index]?.liked_by_current_user) {
            allStories[isVisible.index].stories[index].story_likes = parseInt(allStories[isVisible.index].stories[index]?.story_likes) - 1;
            allStories[isVisible.index].stories[index].liked_by_current_user = false;
            setAllStories([...allStories]);
        } else {
            allStories[isVisible.index].stories[index].story_likes = parseInt(allStories[isVisible.index].stories[index].story_likes) + 1;
            allStories[isVisible.index].stories[index].liked_by_current_user = true;
            setAllStories([...allStories]);
        }
        let res = await HitApi(LIKE_UNLIKESTORIES, 'POST', data, token);

        if (res?.status !== 200) {
            Alert.alert('Error', res?.message);
        }
    };

    const likePost = (id, index) => {
        setFollowingPosts((prevState) => prevState?.map((i, ind) => {
            if (followingPosts[index]?.liked_by_current_user) {
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
            setFollowingPosts([...followingPosts?.slice(0, index), ...followingPosts?.slice(index + 1, followingPosts?.length),]);
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
        await fetchStories(1);
    };

    const getData = async (count, index) => {
        await fetchFollowingPosts(count);
    };

    const onEndReached = async () => {
        await getData(postPageSize + 1);
    };

    useFocusEffect(useCallback(() => {
        if (isFocused) {
            setIsPlay(0);
            setStoriesPageSize(1);
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

    const isScrollViewCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToRight = 10;
        return (layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight);
    }

    const fetchStories = async (size, again = false) => {
        let res = await HitApi(`${STORIES}?page=${size}`, 'GET', '', token);
        if (res?.status === 200) {
            if (res?.data?.user_stories?.length !== 0) {
                if (size === 1) {
                    if (again) {
                        if (allStories.length !== res?.data?.user_stories.length) {
                            setAllStories(res?.data?.user_stories);
                        }
                    } else {
                        setAllStories(res?.data?.user_stories);
                    }
                } else {
                    setAllStories([...allStories, ...res?.data?.user_stories]);
                }
            }
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    const Stories =React.memo( () => {
        return <View style={styles.storyViewStyle}>
            <RNAvatar
                plus={<Plus alignSelf="center" />}
                borderWidth={0}
                userName="You"
                width={wp(15)}
                height={wp(15)}
                borderRadius={wp(10)}
                marginHorizontal={wp(2)}
                img={user?.img || dummyImg}
                clr1={color?.transparent}
                clr2={color?.transparent}
                onPress={() => setMediaSelect(true)}
            />
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                onScrollEndDrag={(e) => {
                    if (isScrollViewCloseToRight(e.nativeEvent)) {
                        fetchStories(storiesPageSize + 1);
                        setStoriesPageSize(storiesPageSize + 1);
                    }
                }}
            >
                {allStories?.map((i, index) => {
                    return (<View key={Math.random()}>
                        <RNAvatar
                            key={Math.random()}
                            index={index}
                            borderWidth={2}
                            width={wp(15)}
                            userName={i?.stories[0]?.username}
                            height={wp(15)}
                            borderRadius={wp(10)}
                            marginHorizontal={wp(2)}
                            img={i?.stories[0]?.user_image || dummyImg}
                            clr1={color.linerClr1}
                            clr2={color.linerClr2}
                            onPress={() => {
                                setIsVisible({ isVisible: true, index: index });
                                setStoryData(i);
                                setIsPlay(-1);
                            }}
                        />
                    </View>);
                })}
            </ScrollView>
        </View>;
    })

    return (<>
        <StoryModal isVisible={isVisible} allStories={allStories} storyData={storyData}
        crossPress={() => {
                            setIsVisible({ ...isVisible, isVisible: false });
                            setIsOpen({ ...isOpen, isOpen: false });
                        }}
                         onComplete={() => {
                    setIsVisible({ ...isVisible, isVisible: false });
                    setIsOpen({ ...isOpen, isOpen: false });
                }}
                storyLike={(id, index) => like_unlikeStory(id, index)}
        />
        <MediaSelectionPopup
            isVisible={mediaSelect}
            navigation={navigation}
            setMediaSelect={setMediaSelect}
            screenName="story"
            mediaType="photo"
        />
        <View style={{ width: wp(100) }}>
            <Stories />
            <Posts postsList={followingPosts} setPostList={followingPosts} isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsImageViewer={setIsImageViewer} likePost={likePost} deletePost={deletePost}
                navigation={navigation}
                selectedVideo={selectedVideo} isPlay={isPlay} onEndReached={onEndReached} loading={loading}
                onRefresh={onRefresh} />
        </View></>);
});

export default Followings;
