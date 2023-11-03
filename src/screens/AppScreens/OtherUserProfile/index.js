import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    RefreshControl,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {useTheme} from 'react-native-paper';
import {
    Menu, MenuOption, MenuOptions, MenuTrigger,
} from 'react-native-popup-menu';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector,useDispatch} from 'react-redux';
import DownArrow from '../../../../assets/svgs/downArrow.svg';
import LeftArrow from '../../../../assets/svgs/leftArrow.svg';
import Coin from '../../../../assets/svgs/smallCoin.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {
    BLOCK_USER, CREATE_CONVERSATION, GETOTHERUSERINFO, SEND_FOLLOW_REQUEST, UNFOLLOW_REQUEST, CANCEL_FOLLOW_REQUEST,
} from '../../../APIHits/urls';
import GradientBtn from '../../../components/gradientBtn';
import VideoPlayerModal from '../../../components/Modals/VideoPlayerModal';
import RNButton from '../../../components/RNButton';
import {AppLoader} from '../../../components/RNLoader';
import {fonts} from '../../../Themes/FontsConfig';
import {months} from '../../../utiles/dummyData';
import {coinConvert} from '../../../utiles/export';
import LinearGradient from 'react-native-linear-gradient';
import {textColor} from '../../../utiles/themeSelectot';
import Toast from 'react-native-simple-toast'
import { setTournament_Request,setFollowing_Request } from '../../../redux/Actions/appAction';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const OtherUserProfile = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);
    const {item} = route?.params;
    const {token} = useSelector((state) => state.authReducer);
    const [btnSelect, setBtnSelect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [allPosts, setAllPosts] = useState([]);
    const [isMonth, setIsMonth] = useState('April');
    const [otherUser, setOtherUser] = useState(null);
    // console.log("otherUser",JSON.stringify(otherUser,null,2));
    const [otherUserProfile, setOtherUserProfile] = useState(null);
    const [isImageViwer, setIsImageViwer] = useState({
        uri: '', check: false, type: '',
    });

    const bgImage = theme_data?.bgImage;

    useEffect(() => {
        setIsLoading(true);
        getOtherUserInfo();
    }, []);

    // get other user info
    const getOtherUserInfo = async () => {
        let res = await HitApi(`${GETOTHERUSERINFO}${item}`, 'GET', '', token);
        if (res?.status == 200) {
            setOtherUserProfile(res?.data?.profile?.user_image);
            setAllPosts(res?.data?.profile?.profile_posts);
            setOtherUser(res?.data?.profile?.user);
            setUserInfo(res?.data?.profile);
            setIsLoading(false);
            setLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
            setLoading(false);
        }
    };

    const filterByMonths = (i) => {
        if (btnSelect == 0) {
            let temp = [];
            userInfo?.profile_posts.map((j) => {
                let m = moment(j?.post_time).format('MMMM');
                if (i.ref == m) {
                    temp.push(j);
                }
            });
            setAllPosts(temp);
        }
        setIsMonth(i?.month);
    };

    // send follow request
    const followRequest = async () => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', item);
        let res = await HitApi(SEND_FOLLOW_REQUEST, 'POST', data, token);
        if (res?.status == 200) {
            setIsLoading(false);
            // Alert.alert('Success', res?.data?.message);
            getOtherUserInfo();
            dispatch(setTournament_Request(true));
            dispatch(setFollowing_Request(true));
            
            
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // unfollow request
    const unFollowRequest = async () => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', userInfo?.user?.id);
        let res = await HitApi(UNFOLLOW_REQUEST, 'POST', data, token);
        if (res?.status == 200) {
            setIsLoading(false);
            // Alert.alert('Success', res?.data?.message);
            getOtherUserInfo();
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    //Cancel Request
    const cancelRequest = async () => {
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', userInfo?.user?.id);

        let res = await HitApi(CANCEL_FOLLOW_REQUEST, 'POST', data, token);

        if (res?.status == 200) {
            setIsLoading(false);
            // Alert.alert('Success', res?.data?.message);
            getOtherUserInfo();
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }

    }

    // create conversation
    const createConversation = async () => {
        const data = new FormData();
        data.append('receiver_id', otherUser?.id);
        let res = await HitApi(CREATE_CONVERSATION, 'post', data, token);

        if (res?.status == 200) {
            navigation.navigate('ChatScreen', {
                selectedUser: {
                    ...res?.data?.conversation, user_image: otherUserProfile, username: otherUser?.username,
                },
            });
        }
    };

    const ImageViwer = () => {
        return (<ImageView
            images={[{
                uri: isImageViwer?.uri,
            },]}
            imageIndex={0}
            visible={isImageViwer?.check && isImageViwer?.type.slice(0, 5) != 'video'}
            onRequestClose={() => setIsImageViwer({uri: '', check: false, type: ''})}
            swipeToCloseEnabled={false}
            animationType="fade"
        />);
    };

    const onPressUnBlock = async () => {
        setIsLoading(true);
        let res = await HitApi(`${BLOCK_USER}/${otherUser?.id}`, 'delete', '', token,);
        if (res?.status == 200) {
            setIsLoading(false);
            navigation.navigate('BlockedUsers');
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
        } else {
            setIsLoading(false);
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
        }
    };

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
                {ImageViwer()}
                <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            setLoading(true);
                            getOtherUserInfo();
                        }}
                    />}
                >
                    <ImageBackground
                        source={require('../../../../assets/pngs/otherUserbg.png')}
                        resizeMode="cover"
                        style={{height: hp(62)}}
                        borderBottomLeftRadius={wp(12)}
                        borderBottomRightRadius={wp(12)}
                    >
                        <View style={styles.headerView}>
                            <View style={styles.leftHeaderStyle}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('BottomTab', {screen: 'Home'})}
                                    style={{justifyContent: 'center'}}
                                >
                                    <LeftArrow alignSelf="center"/>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        ...styles.profileStyle,
                                        fontFamily: font.bold,
                                        color: textColor(app_Theme, color?.white).text,
                                    }}
                                >
                                    Profile
                                </Text>
                            </View>
                            <GradientBtn
                                rightIcon={<Coin alignSelf="center"/>}
                                coins={coinConvert(userInfo?.user?.coins)}
                                style={styles.bgGradientbtnStyle}
                                disabled={true}
                            />
                        </View>

                        <View style={{...styles.profileView, borderColor: 'white'}}>
                            <FastImage
                                source={{uri: userInfo?.user_image || dummyImg}}
                                resizeMode="cover"
                                style={styles.profileImageStyle}
                            />
                        </View>

                        {userInfo?.blocked_user ? (<View style={{marginTop: hp(2)}}>
                            <RNButton
                                clr1={color.linerClr1}
                                clr2={color.linerClr2}
                                textColor={color.black}
                                family={font.bold}
                                btnWidth={wp(38)}
                                btnHeight={hp(6.5)}
                                btnRadius={wp(10)}
                                title={'Un Block'}
                                borderWidth={0}
                                borderClr={'transparent'}
                                onPress={() => onPressUnBlock()}
                            />
                        </View>) : (<View style={styles.btnsStyle}>
                            <RNButton
                                clr1={color.linerClr1}
                                clr2={color.linerClr2}
                                textColor={color.bl1}
                                family={font.bold}
                                btnWidth={wp(38)}
                                btnHeight={hp(6.5)}
                                btnRadius={wp(10)}
                                title={userInfo?.follow_request_send ? 'Pending' : userInfo?.follow_each_other ? 'Friends' : userInfo?.follower_added ? 'Unfollow' : 'Follow'}
                                borderWidth={0}
                                borderClr={'transparent'}
                                onPress={() => {
                                    if (userInfo?.follow_each_other || userInfo?.follower_added) {
                                        unFollowRequest();
                                    } else if (userInfo?.follow_request_send) {
                                        cancelRequest();
                                    } else {
                                        followRequest();
                                    }
                                }}
                            />
                            <RNButton
                                clr1={textColor(app_Theme, color?.white).text}
                                clr2={textColor(app_Theme, color?.white).text}
                                textColor={color.black}
                                family={font.bold}
                                btnWidth={wp(38)}
                                btnHeight={hp(6.5)}
                                btnRadius={wp(10)}
                                title={'Message'}
                                borderWidth={0}
                                borderClr={'transparent'}
                                onPress={() => createConversation()}
                            />
                        </View>)}
                        <Text
                            style={{
                                ...styles.userNameStyle,
                                fontFamily: font.bold,
                                color: textColor(app_Theme, color?.white).text,
                            }}
                            numberOfLines={1}
                        >
                            {userInfo?.user?.username}
                        </Text>

                        <ImageBackground
                            style={styles.blurStyle}
                            resizeMode="cover"
                            source={require('../../../../assets/pngs/blur.png')}
                            blurRadius={60}
                            borderRadius={wp(5)}
                        >
                            <View style={styles.blurBtnStyle}>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: wp(26)}}
                                    disabled={true}
                                >
                                    <Text
                                        style={{
                                            fontFamily: font.bold,
                                            fontSize: hp(2.5),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        {userInfo?.all_post_count}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: font.regular,
                                            fontSize: hp(1.3),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        Posts
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={true}
                                    style={{
                                        alignSelf: 'center',
                                        borderRightWidth: 1,
                                        borderLeftWidth: 1,
                                        borderLeftColor: textColor(app_Theme, color?.white).text,
                                        borderRightColor: textColor(app_Theme, color?.white).text,
                                        width: wp(26),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: font.bold,
                                            fontSize: hp(2.5),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        {userInfo?.followers}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: font.regular,
                                            fontSize: hp(1.3),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        Followers
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: wp(26)}}
                                    disabled={true}
                                >
                                    <Text
                                        style={{
                                            fontFamily: font.bold,
                                            fontSize: hp(2.5),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        {userInfo?.following}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: font.regular,
                                            fontSize: hp(1.3),
                                            alignSelf: 'center',
                                            color: textColor(app_Theme, color?.white).text,
                                        }}
                                    >
                                        Followings
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <Text
                            style={{
                                ...styles.bioStyle,
                                color: textColor(app_Theme, color?.white).text,
                                fontFamily: font.regular,
                            }}
                            numberOfLines={2}
                        >
                            {userInfo?.user?.bio || ''}
                        </Text>
                    </ImageBackground>

                    <View
                        style={{
                            height: hp(20), backgroundColor: color.g6, borderRadius: wp(8), marginVertical: hp(2),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: font.bold,
                                    fontSize: hp(2.7),
                                    color: textColor(app_Theme, color?.white).text,
                                    marginLeft: wp(6),
                                    marginVertical: hp(2),
                                }}
                            >
                                Earned Badges
                            </Text>
                        </View>
                        {userInfo?.badges?.length != 0 ? (<View style={styles.badgeSpcae}>
                            {userInfo?.badges.map((i, index) => (<View key={index}>
                                <View
                                    style={{
                                        ...styles.badgeImage, backgroundColor: textColor(app_Theme, color?.white).text,
                                    }}
                                >
                                    <FastImage
                                        source={{uri: i?.badge_image}}
                                        style={styles.badgeStyle}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.activityIndicator}>
                                        <ActivityIndicator size={'small'} color={'black'}/>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        ...styles.badgeName, color: textColor(app_Theme, color?.white).text,
                                    }}
                                    numberOfLines={1}
                                >
                                    {i?.title}
                                </Text>
                            </View>))}
                        </View>) : (<View style={{justifyContent: 'center', height: hp(10)}}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    fontFamily: font.bold,
                                    color: textColor(app_Theme, color?.white).text,
                                    opacity: 0.6,
                                }}
                            >
                                Not Earned{' '}
                            </Text>
                        </View>)}
                    </View>

                    <View style={styles.badgeView}>
                        <Text
                            style={{
                                alignSelf: 'center',
                                color: textColor(app_Theme, color?.white).text,
                                fontFamily: font.bold,
                                fontSize: hp(2.5),
                            }}
                        >
                            {allPosts?.length} Posts
                        </Text>
                        {/* <View style={{ alignSelf: 'center' }}>
                <Menu>
                  <MenuTrigger>
                    <View
                      style={[
                        styles.monthViewStyle,
                        { backgroundColor: color.g6, fontFamily: font.medium },
                      ]}
                    >
                      <Text
                        style={{
                          color: textColor(app_Theme, color?.white).text,
                          alignSelf: 'center',
                          fontFamily: font.regular,
                          opacity: 0.7,
                        }}
                      >
                        {isMonth}
                      </Text>
                      <DownArrow alignSelf="center" />
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{
                      ...styles.menuOptionsStyle,
                      backgroundColor: color.g6,
                    }}
                  >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {months.map((i) => (
                        <MenuOption
                          key={i.id}
                          onSelect={() => filterByMonths(i)}
                        >
                          <Text
                            style={{
                              color: textColor(app_Theme, color?.white).text,
                              marginLeft: wp(5),
                              fontFamily: font.regular,
                            }}
                          >
                            {i?.month}
                          </Text>
                        </MenuOption>
                      ))}
                    </ScrollView>
                  </MenuOptions>
                </Menu>
              </View> */}
                    </View>

                    {allPosts?.length == 0 ? (<View
                        style={{
                            alignSelf: 'center', justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center',
                                color: textColor(app_Theme, color?.white).text,
                                opacity: 0.6,
                                fontFamily: font.bold,
                            }}
                        >
                            No post found
                        </Text>
                    </View>) : (<View style={styles.numOfColumn}>
                        {allPosts?.map((item, index) => {
                            return (<TouchableOpacity
                                key={index}
                                style={styles.postView}
                                onPress={() => {
                                    setIsImageViwer({
                                        uri: item?.post_image, check: true, type: item?.post_type,
                                    });
                                }}
                            >
                                <FastImage
                                    source={{
                                        uri: item.post_type?.slice(0, 5) == 'video' && Platform.OS === 'ios' ? item?.post_thumbnail || 'https://www.realfinityrealty.com/wp-content/uploads/2018/08/video-poster.jpg' : item?.post_image,
                                    }}
                                    resizeMode="cover"
                                    style={styles.postImageStyle}
                                />
                                {item.post_type?.slice(0, 5) ? (<View style={styles.activityIndicator}>
                                    <ActivityIndicator size={'small'} color={'white'}/>
                                </View>) : (<View style={styles.corruptView}>
                                    <Text
                                        style={{
                                            alignSelf: 'center',
                                            fontFamily: font.regular,
                                            color: color.g1,
                                            fontSize: wp(3),
                                        }}
                                    >
                                        This content has been expired
                                    </Text>
                                </View>)}
                            </TouchableOpacity>);
                        })}
                    </View>)}
                </ScrollView>
                <VideoPlayerModal
                    show={isImageViwer?.check && isImageViwer?.type.slice(0, 5) == 'video'}
                    hide={(res) => setIsImageViwer({uri: '', check: false, type: ''})}
                    uri={isImageViwer?.uri}
                />
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default OtherUserProfile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, headerView: {
        marginHorizontal: wp(5), height: hp(7), flexDirection: 'row', justifyContent: 'space-between',
    }, leftHeaderStyle: {
        flexDirection: 'row', alignSelf: 'center', justifyContent: 'center',
    }, profileView: {
        width: wp(43),
        height: wp(43),
        borderRadius: wp(43),
        borderWidth: wp(1),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp(1),
    }, profileStyle: {
        fontSize: hp(3), alignSelf: 'center', marginLeft: wp(5),
    }, userNameStyle: {
        fontSize: hp(3.2), marginHorizontal: wp(5), marginVertical: hp(2), alignSelf: 'center',
    }, gradientStyle: {
        shadowOffset: {
            width: 0, height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,

        flexDirection: 'row',
        width: wp(25),
        height: hp(5),
        borderRadius: wp(5),
    }, coinsStyle: {
        marginHorizontal: wp(2),

        fontSize: hp(2.5), alignSelf: 'center',
    }, buttonGroup: {
        marginHorizontal: wp(5),
        marginVertical: hp(1),
        height: hp(7),
        borderRadius: wp(10),
        borderColor: 'transparent',
        flexDirection: 'row',
    }, selectedButtonStyle: {
        backgroundColor: 'rgba(246, 200, 2, 0.9)', borderRadius: wp(8),
    }, profileImageStyle: {
        width: wp(40), height: wp(40), borderRadius: wp(40), alignSelf: 'center',
    }, blurStyle: {
        height: hp(9), width: wp(80), alignSelf: 'center', justifyContent: 'center',
    }, blurBtnStyle: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, bioStyle: {
        fontSize: hp(2), marginVertical: hp(2), marginHorizontal: wp(10), textAlign: 'center',
    }, badgeName: {
        fontSize: hp(1.5), opacity: 0.5, marginVertical: hp(1.5), width: wp(20),
    }, postView: {
        alignSelf: 'center', justifyContent: 'center',
    }, postImageStyle: {
        width: wp(50), height: hp(30), zIndex: 1,
    }, badgeView: {
        height: hp(8), flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(5),
    },

    badgeImage: {
        width: wp(13), height: wp(13), borderRadius: wp(13), justifyContent: 'center', alignItems: 'center',
    }, badgeSpcae: {
        flexDirection: 'row', marginHorizontal: wp(12),
    }, btnsStyle: {
        flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: wp(80), marginTop: hp(1.5),
    }, menuOptionsStyle: {
        width: wp(40), borderRadius: 15, maxHeight: wp(40), marginTop: hp(4), marginLeft: wp(-4),
    }, bgGradientbtnStyle: {
        maxWidth: wp(25), height: hp(5),
    }, monthViewStyle: {
        flexDirection: 'row',
        width: wp(21),
        height: hp(5),
        justifyContent: 'space-between',
        borderRadius: wp(10),
        paddingLeft: hp(2),
        paddingRight: hp(2),
    }, activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -1, justifyContent: 'center',
    }, numOfColumn: {
        flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: hp(15),
    }, badgeStyle: {
        width: wp(10), height: hp(5),
    }, corruptView: {
        position: 'absolute', margin: 0, alignSelf: 'center', justifyContent: 'center',
    },
});
