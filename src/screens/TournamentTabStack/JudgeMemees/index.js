import VideoPlayerModal from '../../../components/Modals/VideoPlayerModal';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Alert, FlatList, Platform, StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {
    DISLIKE_TOURNAMENT_POST, GET_TOURNAMENT_POSTS, LIKE_TOURNAMENT_POST,
} from '../../../APIHits/urls';
import MemeesCard from '../../../components/Cards/MemeesCard';
import Header from '../../../components/Header';
import Achievement from '../../../components/Modals/Achievement';
import {AppLoader} from '../../../components/RNLoader';
import {SetJudgeCount_Coins} from '../../../redux/Actions/appAction';
import {fonts} from '../../../Themes/FontsConfig';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';

const JudgeMemees = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.authReducer);
    const {tempCoins, fontChange, judgedMemes, theme_data} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);
    const {color} = useTheme();
    const [memees, setMemees] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [videoPlayerModal, setVideoPlayerModal] = useState(false);
    const [selectedVideoUri, setSelectedVideoUri] = useState(null);
    const [isPlay, setIsPlay] = useState(0);
    const [isImageViewer, setIsImageViewer] = useState({
        uri: '', check: false, type: '',
    });

    const bgImage = theme_data?.bgImage;

    useEffect(() => {
        setTimeout(() => {
            if (judgedMemes == 25) {
                Alert.alert('Congratulations', 'Goal reached. 25 memes judge', [{
                    text: 'OK', onPress: () => navigation.goBack(),
                },]);
            }
        }, 6000);
    }, [judgedMemes]);

    useFocusEffect(useCallback(() => {
        setIsPlay(0);
        GetTournamentPosts();
        return () => {
            setTimeout(() => {
                if (Platform.OS === 'ios') {
                    setIsPlay(-1);
                }
            }, 1000);
        };
    }, [navigation]),);

    // get all memees
    const GetTournamentPosts = () => {
        setIsLoading(true);
        HitApi(GET_TOURNAMENT_POSTS, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    setMemees(res?.data?.tournament_posts);
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

    // like tournament post
    const onPressHeart = (postId, index) => {
        const data = new FormData();
        data.append('post_id', postId);
        HitApi(LIKE_TOURNAMENT_POST, 'post', data, token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data.check) {
                        // setshowModal(true);

                        dispatch(SetJudgeCount_Coins(tempCoins, judgedMemes + 1));
                        memees[index].is_liked_by_current_user = true;
                        memees[index].post_judged_by_current_user = true;
                        setMemees([...memees]);
                        // setTimeout(() => {
                        //   setshowModal(false);
                        // }, 5000);
                    } else {
                        Alert.alert('Error', 'You already locked your decision');
                    }
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
            });
    };

    // dislike tournament post
    const onPressCross = (postId, index) => {
        const data = new FormData();
        data.append('post_id', postId);
        HitApi(DISLIKE_TOURNAMENT_POST, 'post', data, token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data.check) {
                        // setshowModal(true);
                        dispatch(SetJudgeCount_Coins(tempCoins, judgedMemes + 1));

                        memees[index].is_liked_by_current_user = false;
                        memees[index].post_judged_by_current_user = true;
                        setMemees([...memees]);
                        // setTimeout(() => {
                        //   setshowModal(false);
                        // }, 5000);
                    } else {
                        Alert.alert('Error', 'You already locked your decision');
                    }
                } else {
                    Alert.alert('Error', res?.message);
                }
            })
            .catch((e) => {
                let {message} = e;
                Alert.alert('Error', message);
            });
    };

    const onPressPost = (item) => {
        let type = item?.post_type?.slice(0, 5) || 'image/jpg';
        if (type == 'video') {
            setSelectedVideoUri(item?.post_image);
            setVideoPlayerModal(true);
        } else {
            setIsImageViewer({
                uri: item?.post_image, check: type == 'video' ? false : true, type: item?.post_type,
            });
        }
    };

    const ImageViewer = () => {
        return (<ImageView
            images={[{
                uri: isImageViewer.uri,
            },]}
            imageIndex={0}
            visible={isImageViewer.check}
            onRequestClose={() => setIsImageViewer({uri: '', check: false, type: ''})}
            swipeToCloseEnabled={false}
            animationType="fade"
        />);
    };

    const renderItem = useMemo(() => ({item, index}) => {
        return (<MemeesCard
            item={item}
            onPressCross={() => onPressCross(item?.id, index)}
            onPressHeart={() => onPressHeart(item?.id, index)}
            like={item?.post_judged_by_current_user && item?.is_liked_by_current_user}
            dislike={item?.post_judged_by_current_user && !item?.is_liked_by_current_user}
            // videoPlayerModal={() => selectedVideo(item)}
            isPlay={isPlay}
            index={index}
            onPressVideo={() => onPressPost(item)}
        />);
    }, [memees],);

    return (<View style={{...styles.mainContainer, backgroundColor: color.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.mainContainer}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={styles.mainContainer}
                resizeMode="cover"
            >
                <Header
                    title={'Judge'}
                    isLeftIcon
                    isCenterText
                    navigation={navigation}
                    count={judgedMemes}
                    fontSize={hp(2.2)}
                />
                <View style={styles.mainContainer}>
                    {ImageViewer()}
                    {memees?.length == 0 ? (<View style={styles.noMemeesView}>
                        <Text style={{color: color?.g3, fontFamily: font.medium}}>
                            No Memes Found
                        </Text>
                    </View>) : (<FlatList
                        showsVerticalScrollIndicator={false}
                        data={memees}
                        keyExtractor={(item, index) => `key-${index}${item}`}
                        renderItem={renderItem}
                    />)}
                </View>
                {/* {showModal && (
        <Achievement
          show={showModal}
          hide={setshowModal}
          image={require('../../../../assets/pngs/bgIcon.png')}
          title={'Congratulations'}
          description={'You Earn 50 coins for judging!'}
        />
      )} */}
                <VideoPlayerModal
                    show={videoPlayerModal}
                    hide={setVideoPlayerModal}
                    uri={selectedVideoUri}
                />
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default JudgeMemees;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, noMemeesView: {
        flex: 1, alignSelf: 'center', justifyContent: 'center',
    },
});
