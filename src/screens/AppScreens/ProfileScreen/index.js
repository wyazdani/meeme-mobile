import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import EditProfile from '../../../../assets/svgs/editProfile.svg';
import Setting from '../../../../assets/svgs/setting.svg';
import Coin from '../../../../assets/svgs/smallCoin.svg';
import Store from '../../../../assets/svgs/hand.svg';
import Plus from '../../../../assets/svgs/wPlus.svg';
import RNButton from '../../../components/RNButton';
import Noti from '../../../../assets/svgs/notification.svg';
import RedNoti from '../../../../assets/svgs/redNotification.svg';

import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {GETCURRENTUSERINFO} from '../../../APIHits/urls';
import GradientBtn from '../../../components/gradientBtn';
import {AppLoader} from '../../../components/RNLoader';
import {fonts} from '../../../Themes/FontsConfig';

import {coinConvert} from '../../../utiles/export';
import VideoPlayerModal from '../../../components/Modals/VideoPlayerModal';
import LinearGradient from 'react-native-linear-gradient';
import {textColor} from '../../../utiles/themeSelectot';
import {SvgUri} from 'react-native-svg';

const btns = [{
    id: 1, name: 'Posts',
}, {
    id: 2, name: 'Tournament Entries',
},];

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const ProfileScreen = React.memo(({navigation}) => {
    // console.log(">>>>>>>>>>>>>>ProfileScreen");
    const {color} = useTheme();
    const {
        fontChange, profileBackground, counts, tempCoins, theme_data, app_Theme,
    } = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {token, user} = useSelector((state) => state.authReducer);
    const [btnSelect, setBtnSelect] = useState(false);
    const [userInfo, setUserInfo] = useState();
    // console.log(token,"userInfo on profile",userInfo);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [isMonth, setIsMonth] = useState('Jan');
    const [isImageViwer, setIsImageViwer] = useState({
        check: false, item: null,
    });

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    const BtnCall = (index) => {
        setIsMonth('Jan');
        setBtnSelect(index);
        if (index == 0) {
            setAllPosts(userInfo?.profile_posts);
        } else {
            setAllPosts(userInfo?.tournament_posts);
        }
    };

    useEffect(() => {
        // console.log("useeffect call on profile screen");
        setIsLoading(true);
        GetCurrentUserInfo();
    }, []);

    const GetCurrentUserInfo = async () => {
        let res = await HitApi(GETCURRENTUSERINFO, 'get', '', token);

        if (res?.status == 200) {
            setUserInfo(res?.data?.profile);
            setAllPosts(res?.data?.profile?.profile_posts);
            setBtnSelect(0);
            setIsLoading(false);
            setLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setLoading(false);
            setIsLoading(false);
        }
    };

    const textColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare9':
                return 'white';
                break;
            case 'ultra_rare10':
                return 'white';
                break;
            case 'ultra_rare11':
                return 'white';
                break;
            case 'ultra_rare12':
                return 'white';
                break;
            case 'ultra_rare14':
                return 'white';
                break;
            default:
                return textColor(app_Theme, color?.white).black;
                break;
        }
    };

    const NotFoundtextColorCheck = () => {
        switch (app_Theme) {
            case 'ultra_rare9':
                return 'white';
                break;
            case 'ultra_rare10':
                return 'white';
                break;
            case 'ultra_rare11':
                return 'white';
                break;
            case 'ultra_rare12':
                return 'white';
                break;
            case 'ultra_rare14':
                return 'white';
                break;
            default:
                return color.black;
                break;
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
                {/* {ImageViwer()} */}
                <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            setLoading(true);
                            GetCurrentUserInfo();
                        }}
                    />}
                >
                    <ImageBackground
                        source={profileBackground}
                        resizeMode="cover"
                        style={{height: hp(57)}}
                        borderBottomLeftRadius={wp(8)}
                        borderBottomRightRadius={wp(8)}
                    >
                        <View style={styles.headerView}>
                            <View style={styles.leftHeaderStyle}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('EditProfile', {
                                        item: user, img: user?.img,
                                    })}
                                >
                                    {icons?.profile_edit ? (<SvgUri alignSelf="center" uri={icons?.profile_edit}/>) : (
                                        <EditProfile/>)}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SettingScreen')}
                                >
                                    {icons?.setting ? (<SvgUri
                                        alignSelf="center"
                                        uri={icons?.setting}
                                        marginHorizontal={wp(3)}
                                    />) : (<Setting marginHorizontal={wp(3)}/>)}
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={{justifyContent: 'center'}}
                                    onPress={() => navigation.navigate('StoreScreen')}
                                >
                                    {icons?.shop ? (<SvgUri alignSelf="center" uri={icons?.shop}/>) : (<Store/>)}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ActivitiesScreen')}
                                    style={{justifyContent: 'center', padding: hp(1)}}
                                >
                                    {counts ? (<>
                                        {icons?.dot_notification ? (<SvgUri
                                            alignSelf={'center'}
                                            uri={icons?.dot_notification}
                                        />) : (<RedNoti alignSelf="center"/>)}
                                    </>) : (<>
                                        {icons?.notification ? (<SvgUri
                                            alignSelf={'center'}
                                            uri={icons?.notification}
                                        />) : (<Noti alignSelf="center"/>)}
                                    </>)}
                                </TouchableOpacity>
                                <GradientBtn
                                    style={{
                                        width: wp(28), height: hp(5),
                                    }}
                                    leftIcon={<Plus alignSelf="center"/>}
                                    leftOnPress={() => navigation.navigate('BuyCoins')}
                                    coins={coinConvert(tempCoins) || 0}
                                    rightIcon={<Coin alignSelf="center"/>}
                                    disabled={true}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...styles.profileView, borderColor: textColor(app_Theme, color?.white).text,
                            }}
                        >
                            <FastImage
                                source={{uri: user?.img || dummyImg}}
                                resizeMode="cover"
                                style={[styles.profileImageStyle, {backgroundColor: color.g8},]}
                            />
                        </View>
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
                                        {userInfo?.profile_posts?.length}
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
                                    onPress={() => navigation.navigate('FollowerList')}
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
                                    onPress={() => navigation.navigate('FollowingList')}
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
                            height: hp(20),
                            backgroundColor: color.g6,
                            borderRadius: wp(8),
                            marginVertical: hp(2),
                            marginHorizontal: wp(3),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(2),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: font.bold,
                                    fontSize: hp(2.7),
                                    color: textColor(app_Theme, color?.white).text,
                                    marginLeft: wp(6),
                                    alignSelf: 'center',
                                }}
                            >
                                Earned Badges
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('OrganizeBadges')}
                                style={{justifyContent: 'center'}}
                            >
                                <Text
                                    style={{
                                        fontFamily: font.light,
                                        fontSize: hp(1.5),
                                        color: textColor(app_Theme, color?.white).text,
                                        marginRight: wp(6),
                                        alignSelf: 'center',
                                    }}
                                >
                                    Organize Badges
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {userInfo?.badges?.length != 0 ? (<View style={styles.badgeSpcae}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {userInfo?.badges?.map((i, index) => {
                                    return (<View key={index}>
                                        <View
                                            style={{
                                                ...styles.badgeImage,
                                                backgroundColor: textColor(app_Theme, color?.white,).text,
                                            }}
                                        >
                                            <FastImage
                                                source={{uri: i?.badge_image || dummyImg}}
                                                style={styles.badgeStyle}
                                                resizeMode="contain"
                                            />
                                            <View style={styles.activityIndicator}>
                                                <ActivityIndicator
                                                    size={'small'}
                                                    color={'black'}
                                                />
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
                                    </View>);
                                })}
                            </ScrollView>
                        </View>) : (<View style={{justifyContent: 'center', height: hp(10)}}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    color: textColor(app_Theme, color?.white).text,
                                    opacity: 0.6,
                                    fontFamily: font.medium,
                                }}
                            >
                                Not Earned{' '}
                            </Text>
                        </View>)}
                    </View>

                    <View style={{...styles.buttonGroup, backgroundColor: color.g8}}>
                        {btns?.map((i, index) => (<RNButton
                            key={index}
                            clr1={index == btnSelect ? color.linerClr1 : color.transparent}
                            clr2={index == btnSelect ? color.linerClr2 : color.transparent}
                            textColor={index == btnSelect ? color.bl1 : color.g7}
                            isSelect={btnSelect}
                            index={index}
                            family={index == btnSelect ? font.bold : font.medium}
                            btnWidth={wp(45)}
                            btnHeight={hp(7)}
                            btnRadius={wp(10)}
                            btnVertical={hp(1)}
                            borderWidth={0.01}
                            fontSize={hp(1.5)}
                            borderClr="transparent"
                            title={i?.name}
                            onPress={() => BtnCall(index)}
                        />))}
                    </View>

                    <View style={styles.badgeView}>
                        <Text
                            style={{
                                alignSelf: 'center', color: textColorCheck(), fontFamily: font.bold, fontSize: hp(2.5),
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
                        {
                          backgroundColor: color.g6,
                          fontFamily: font.medium,
                        },
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
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled={true}
                    >
                      {months.map((i, index) => (
                        <MenuOption
                          key={index}
                          value={index}
                          onSelect={() => FilterByMoths(i)}
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
                            alignSelf: 'center', justifyContent: 'center', marginBottom: hp(15),
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center', //color: color.black,
                                color: NotFoundtextColorCheck(), opacity: 0.6, fontFamily: font.medium,
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
                                        check: true, item: item,
                                    });
                                }}
                            >
                                <FastImage
                                    source={{
                                        uri: item.post_type?.slice(0, 5) == 'video' && Platform.OS === 'ios' ? item?.post_thumbnail || 'https://www.realfinityrealty.com/wp-content/uploads/2018/08/video-poster.jpg' : item?.post_image,
                                    }}
                                    resizeMode="contain"
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
                <AppLoader loading={isLoading}/>
                {isImageViwer?.check && (<VideoPlayerModal
                    show={true}
                    hide={(res) => setIsImageViwer({...isImageViwer, check: false})}
                    navigation={navigation}
                    item={isImageViwer?.item}
                />)}
            </ImageBackground>
        </LinearGradient>
    </View>);
})

export default ProfileScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, headerView: {
        marginHorizontal: wp(5), height: hp(9), flexDirection: 'row', justifyContent: 'space-between',
    }, leftHeaderStyle: {
        flexDirection: 'row', alignSelf: 'center',
    }, profileView: {
        width: wp(43),
        height: wp(43),
        borderRadius: wp(43),
        borderWidth: wp(1),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp(2),
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
        width: wp(35),
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
        width: wp(41), height: wp(41), borderRadius: wp(41), alignSelf: 'center',
    }, blurStyle: {
        height: hp(9), width: wp(80), alignSelf: 'center', justifyContent: 'center',
    }, blurBtnStyle: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, bioStyle: {
        fontSize: hp(2), marginVertical: hp(2), marginHorizontal: wp(10), textAlign: 'center',
    }, badgeName: {
        fontSize: hp(1.5), opacity: 0.5, marginVertical: hp(1.5), width: wp(20),
    }, postView: {
        alignSelf: 'center', justifyContent: 'center', flexBasis: '50%', width: Dimensions.get('window').width / 2.2,
    }, postImageStyle: {
        width: wp(50), height: hp(30), zIndex: 1,
    }, badgeView: {
        height: hp(8), flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(5),
    },

    badgeImage: {
        width: wp(13), height: wp(13), borderRadius: wp(13), justifyContent: 'center', alignItems: 'center',
    }, badgeSpcae: {
        flexDirection: 'row', marginHorizontal: wp(10),
    }, menuOptionsStyle: {
        width: wp(40), borderRadius: 15, maxHeight: wp(40), marginTop: hp(4), marginLeft: wp(-4),
    }, redDot: {
        width: wp(2),
        height: wp(2),
        backgroundColor: 'red',
        position: 'absolute',
        top: hp(3),
        right: hp(1.5),
        borderRadius: hp(1),
    }, icon: {
        width: wp(6.5), height: wp(6.5), resizeMode: 'contain',
    }, iconContainer: {
        width: wp(9.5),
        height: wp(9.5),
        backgroundColor: '#FFFFFF33',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(9.5),
    }, monthViewStyle: {
        flexDirection: 'row',
        width: wp(22),
        height: hp(5),
        justifyContent: 'space-between',
        paddingLeft: hp(2),
        borderRadius: wp(10),
        paddingRight: hp(2),
    }, activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, justifyContent: 'center',
    }, badgeStyle: {
        width: wp(10), height: hp(5), borderRadius: wp(10), zIndex: 1,
    }, numOfColumn: {
        flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: hp(15),
    }, corruptView: {
        position: 'absolute', margin: 0, alignSelf: 'center', justifyContent: 'center',
    },
});
