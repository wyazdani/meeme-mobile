import React, {useEffect, useMemo} from 'react';
import {Alert, FlatList, Text, View} from "react-native";
import {styles} from "../screens/AppScreens/HomeScreen/style";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import PostCard from "../components/PostCard";
import Share from "react-native-share";
import {HitApi} from "../APIHits/APIHandler";
import {SHARE_POST_COUNT} from "../APIHits/urls";
import {useTheme} from "react-native-paper";
import {fonts} from "../Themes/FontsConfig";
import {useSelector} from "react-redux";

const Posts =React.memo( ({
                   postsList,
                   setPostList,
                   isLoading,
                   setIsImageViewer,
                   likePost,
                   deletePost,
                   selectedVideo,
                   isPlay,
                   onEndReached,
                   loading,
                   onRefresh,
                   navigation,
                   setIsLoading
                  
               }) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {color} = useTheme();
   
    const refreshTHeAllPosts = async (postId, key) => {
        let temp = postsList.filter((i) => key === 'flag' ? i?.post?.id != postId : i?.post?.user_id != postId);
        console.log("refreshTHeAllPosts called");
        setPostList(temp);
    };

    const shareMemee = async (id, index, postImage, des) => {
        Share.open({
            title: `Post Description:\n ${des}` || 'Share a file',
            message: `Post Description:\n ${des}\n` || '',
            url: postImage,
        })
            .then(async (resp) => {
                const data = new FormData();
                data.append('post_id', id);
                let res = await HitApi(SHARE_POST_COUNT, 'post', data, token);

                if (res?.status == 200) {
                    postsList[index].post.share_count = postsList[index].post.share_count + 1;
                    setPostList([...postsList]);
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((err) => {
                err && console.log(err);
            });
    };

    const renderItem = useMemo(() => ({item, index}) => {
        return <PostCard
            key={item?.post?.id}
            index={index}
            length={postsList?.length}
            item={item}
            refreshTHeAllPosts={refreshTHeAllPosts}
            imageView={setIsImageViewer}
            likePress={() => likePost(item?.post?.id, index)}
            onDelete={() => deletePost(index, item?.post?.id)}
            isPlay={isPlay}
            videoPlayerModal={() => selectedVideo(item)}
            navigation={navigation}
            setIsLoading={setIsLoading}
            shareMemee={() => shareMemee(item?.post?.id, index, item?.post_image, item?.post?.description)}
        />;
    }, [postsList, isPlay]);

    const getItemLayout = (data, index) => {
        return {length: hp(70), offset: hp(70) * index, index};
    };

    return postsList?.length !== 0 ?   <FlatList
        style={{width: wp(100)}}
        data={postsList}
        keyExtractor={(item) => `Key${item?.post?.id}`}
        windowSize={5}
        initialNumToRender={25}
        removeClippedSubviews={true}
        maxToRenderPerBatch={25}
        updateCellsBatchingPeriod={1000}
        keyboardShouldPersistTaps={'always'}
        onEndReachedThreshold={0}
        onEndReached={onEndReached}
        getItemLayout={getItemLayout}
        onRefresh={onRefresh}
        refreshing={loading}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        shouldComponentUpdate={false}
        bouncesZoom={true}
        alwaysBounceVertical={true}
        snapToAlignment="center"
      
    />:
    <>
        {isLoading ? null : (<View style={styles.noFoundView}>
            <Text style={{alignSelf: 'center', color: color.g1, fontFamily: font.bold}}>
                No post's found
            </Text>
        </View>)}
    </>
})

export default Posts;
