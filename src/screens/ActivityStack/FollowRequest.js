import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
    Alert, FlatList, StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {
    ACCEPT_REJECT_REQUEST,
    CANCEL_FOLLOW_REQUEST,
    PENDING_REQUESTS,
    SEND_FOLLOW_REQUEST,
    SUGGESTION_USER,
    UNFOLLOW_REQUEST,
} from '../../APIHits/urls';
import {notificationRequests} from '../../redux/Actions/appAction';
import MessagesCard from '../../components/Cards/MessagesCard';
import LinearGradient from 'react-native-linear-gradient';
import {AppLoader} from '../../components/RNLoader';
import {fonts} from '../../Themes/FontsConfig';
import RNDrive from '../../components/RNDrive';
import FRCard from '../../components/FRCard';
import Header from '../../components/Header';

const FollowRequest = ({navigation}) => {
    const dispatch = useDispatch();
    const {color} = useTheme();
    const {token} = useSelector((state) => state.authReducer);
    const {counts, fontChange, theme_data} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);

    const bgImage = theme_data?.bgImage;

    const [isLoading, setIsLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [isSuggestion, setIsSuggestion] = useState([]);
    const [page, setPage] = useState(1);

    useFocusEffect(useCallback(() => {
        getPendingRequests();
        suggestion_user();
    }, [navigation]),);

    //get Suggestion user
    const suggestion_user = async () => {
        let res = await HitApi(`${SUGGESTION_USER}?page=${page}`, 'Get', '', token);
        if (res?.status == 200) {
            if (res?.data?.suggestions?.length != 0) {
                if (page === 1) {
                    let obj = res?.data?.suggestions?.map((i) => {
                        return {...i, request: false};
                    });
                    setIsSuggestion(obj);
                } else {
                    isSuggestion.push(...res?.data?.suggestions);
                    let obj = isSuggestion?.map((i) => {
                        return {...i, request: false};
                    });
                    setIsSuggestion(obj);
                }
            }
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    // get pending requests
    const getPendingRequests = async () => {
        setIsLoading(true);
        let res = await HitApi(PENDING_REQUESTS, 'GET', '', token);
        if (res?.status == 200) {
            setPendingRequests(res?.data?.pending_followers || res?.data?.followers);
            setIsLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // request accept
    const onPressConfirm = async (id) => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        data.append('is_following', true);

        let res = await HitApi(ACCEPT_REJECT_REQUEST, 'PUT', data, token);

        if (res?.status == 200) {
            dispatch(notificationRequests(counts - 1));
            setIsLoading(false);
            getPendingRequests();
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // request reject
    const onPressDecline = async (id) => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        data.append('is_following', false);

        let res = await HitApi(ACCEPT_REJECT_REQUEST, 'PUT', data, token);

        if (res?.status == 200) {
            dispatch(notificationRequests(counts - 1));
            setIsLoading(false);
            getPendingRequests();
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // send follow request
    const followRequest = async (id, index) => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        let res = await HitApi(SEND_FOLLOW_REQUEST, 'POST', data, token);

        if (res?.status == 200) {
            setIsLoading(false);
            isSuggestion[index].request = true;
            setIsSuggestion([...isSuggestion]);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // unfollow request
    const unFollowRequest = async (id, index) => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        let res = await HitApi(UNFOLLOW_REQUEST, 'POST', data, token);

        if (res?.status == 200) {
            setIsLoading(false);
            isSuggestion[index].request = false;
            setIsSuggestion([...isSuggestion]);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    //cancelFollow Request
    const cancelFollowRequest = async (id, index) => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        let res = await HitApi(CANCEL_FOLLOW_REQUEST, 'POST', data, token);

        if (res?.status == 200) {
            setIsLoading(false);
            isSuggestion[index].request = false;
            setIsSuggestion([...isSuggestion]);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    }

    const fetchMoreData = () => {
        setPage(page + 1);
        suggestion_user();
    };

    return (<View style={{...styles.mainContainer, backgroundColor: color.bgColor}}>
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.mainContainer}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.mainContainer}
                    resizeMode="cover"
                >
                    <Header
                        title="Follow Request"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        navigation={navigation}
                    />
                    <View style={{maxHeight: hp(50)}}>
                        <FlatList
                            data={pendingRequests}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            renderItem={({item, index}) => (<>
                                    <FRCard
                                        item={item}
                                        onConfirm={() => onPressConfirm(item?.follower_user_id)}
                                        onDecline={() => onPressDecline(item?.follower_user_id)}
                                        navigation={navigation}
                                    />
                                    <RNDrive borderClr={color.g10}/>
                                </>)}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (<Text
                                    style={{
                                        color: color.g3,
                                        fontFamily: font.medium,
                                        alignSelf: 'center',
                                        marginVertical: hp(5),
                                    }}
                                >
                                    No Request Found
                                </Text>)}
                        />
                    </View>

                    <View style={styles.suggestionContainer}>
                        <Text
                            style={{
                                fontFamily: font.bold, fontSize: wp(4.4), color: color.g2,
                            }}
                        >
                            Suggestions for you
                        </Text>
                    </View>
                    <View style={styles.innerContainer}>
                        <FlatList
                            contentContainerStyle={{flexGrow: 1}}
                            data={isSuggestion}
                            keyExtractor={(i, index) => `key-${index}${i}`}
                            renderItem={({item, index}) => (<View key={index}>
                                    <MessagesCard
                                        status={false}
                                        item={item}
                                        purpose="btnShow"
                                        navigation={navigation}
                                        onPress1={() => {
                                            if (item?.request && item?.user?.private_account) {
                                                cancelFollowRequest(item?.user?.id, index);
                                            } else if (item?.request) {
                                                unFollowRequest(item?.user?.id, index);

                                            } else {
                                                followRequest(item?.user?.id, index);
                                            }
                                        }}
                                    />
                                </View>)}
                            showsVerticalScrollIndicator={false}
                            onEndReached={fetchMoreData}
                            onEndReachedThreshold={0}
                            ListEmptyComponent={() => (<Text
                                    style={{
                                        color: color.g3,
                                        fontFamily: font.medium,
                                        alignSelf: 'center',
                                        marginVertical: hp(5),
                                    }}
                                >
                                    No Record Found
                                </Text>)}
                        />
                    </View>
                    <AppLoader loading={isLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default FollowRequest;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, noRequest: {
        marginVertical: hp(10), justifyContent: 'center', alignItems: 'center',
    }, suggestionContainer: {
        marginHorizontal: wp(5), marginVertical: hp(2),
    }, innerContainer: {
        marginHorizontal: wp(5), flex: 1,
    },
});
