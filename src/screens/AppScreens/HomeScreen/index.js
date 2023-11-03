import {ScrollView, View, ImageBackground} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import React, {useState, useRef, useEffect} from 'react';
import VideoPlayerModal from '../../../components/Modals/VideoPlayerModal';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import MainHeader from '../../../components/MainHeader';
import RNButton from '../../../components/RNButton';
import {HitApi} from '../../../APIHits/APIHandler';
import {coinConvert} from '../../../utiles/export';
import {groupBtn} from '../../../utiles/dummyData';
import ImageView from 'react-native-image-viewing';
import {fonts} from '../../../Themes/FontsConfig';
import {useTheme} from 'react-native-paper';
import {styles} from './style';
import {USER_STATUS,RECENTPOSTS} from '../../../APIHits/urls';
import Followings from "../../../components/Home/Followings";
import Recent from "../../../components/Home/Recent";
import Trending from "../../../components/Home/Trending";
import {AppLoader} from "../../../components/RNLoader";
import {useDispatch, useSelector} from "react-redux";
const HomeScreen =React.memo(({navigation}) => {
    const {fontChange, tempCoins, theme_data} = useSelector((state) => state.appReducer);
    const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    const {user, token} = useSelector((state) => state.authReducer);
    const horizontalScrollRef = useRef(null);
    const bgImage = theme_data?.bgImage;
    const font = fonts(fontChange);
    const {color} = useTheme();
    const [isImageViewer, setIsImageViewer] = useState({uri: '', check: false, type: ''});
    const [videoPlayerModal, setVideoPlayerModal] = useState(false);
    const [selectedVideoUri, setSelectedVideoUri] = useState(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [requestCounts, setRequestCounts] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [postPageSize, setPostPageSize] = useState(1);
    const [recentPosts, setRecentPosts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
           
            setIsScrolled(true)
            let data = new FormData();
            data.append('status', true);
            await HitApi(USER_STATUS, 'POST', data, token);
            setTimeout(() => {
                setSelectedTabIndex(1)
             },1);
        })();
    }, []);

    messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage.data.notification_type === 'message') {
            navigation.navigate('ActivitiesScreen');
        } else if (remoteMessage.data.notification_type === 'request_send') {
            navigation.navigate('FollowRequest');
        }
    });
  
    useEffect(() => {
        if (horizontalScrollRef.current) {
            horizontalScrollRef.current.scrollTo({x: wp(100) * selectedTabIndex, y: 0, animated: false});
        }
    }, [selectedTabIndex, horizontalScrollRef]);

    return (<View style={{...styles.mainContainer, backgroundColor: color.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.mainContainer}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={{uri: bgImage}}
                style={styles.mainContainer}
                resizeMode="cover"
            >
                <ImageView
                    images={[{
                        uri: isImageViewer.uri,
                    },]}
                    imageIndex={0}
                    visible={isImageViewer.check}
                    onRequestClose={() => setIsImageViewer({uri: '', check: false, type: ''})}
                    swipeToCloseEnabled={false}
                    animationType="fade"
                />

                <View style={styles.headerStyle}>
                    <MainHeader
                        img={user?.img || dummyImg}
                        coins={coinConvert(tempCoins) || 0}
                        plusOnPress={() => navigation.navigate('BuyCoins')}
                        onPress={() => navigation.navigate('Profile')}
                        storeOnPress={() => navigation.navigate('StoreScreen')}
                        notiOnPress={() => navigation.navigate('ActivitiesScreen')}
                        showRedDot={requestCounts ? true : false}
                    />
                </View>

                <View style={[styles.buttonGroup, {backgroundColor: color.g8}]}>
                    {groupBtn?.map((i, index) => (<RNButton
                        key={i?.id}
                        index={index}
                        clr1={index === selectedTabIndex ? color.linerClr1 : color.transparent}
                        clr2={index === selectedTabIndex ? color.linerClr2 : color.transparent}
                        textColor={index === selectedTabIndex ? color.bl1 : color.g7}
                        family={index === selectedTabIndex ? font.medium : font.regular}
                        btnWidth={wp(30)}
                        btnHeight={hp(7)}
                        isSelect={selectedTabIndex}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        borderWidth={0}
                        fontSize={hp(2)}
                        borderClr={color.borderClr}
                        title={i.name}
                        onPress={() => {
                            if (isScrolled) {
                                setSelectedTabIndex(index)
                            }
                            // setSelectedTabIndex(index)
                        }}
                    />))}
                </View>
                <ScrollView
                    ref={horizontalScrollRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    snapToInterval={wp(100)}
                    snapToAlignment={"start"}
                    decelerationRate={"fast"}
                    scrollEnabled={false}
                    onScroll={() => !isScrolled && setIsScrolled(true)}
                >
             <Followings isScrolled={isScrolled} setIsImageViewer={setIsImageViewer}
                                setSelectedVideoUri={setSelectedVideoUri} setVideoPlayerModal={setVideoPlayerModal}
                                navigation={navigation} selectedTabIndex={selectedTabIndex}
                                isLoading={isLoading} setIsLoading={setIsLoading}/>
                            
                    <Recent  isScrolled={isScrolled} setIsImageViewer={setIsImageViewer}
                            setSelectedVideoUri={setSelectedVideoUri} setVideoPlayerModal={setVideoPlayerModal}
                            navigation={navigation} setRequestCounts={setRequestCounts}
                         setIsLoading={setIsLoading}/>

                    <Trending isScrolled={isScrolled} setIsImageViewer={setIsImageViewer}
                              setSelectedVideoUri={setSelectedVideoUri} setVideoPlayerModal={setVideoPlayerModal}
                              navigation={navigation}
                              isLoading={isLoading} setIsLoading={setIsLoading}/>
                </ScrollView>

                <AppLoader loading={isLoading}/>

                <VideoPlayerModal
                    show={videoPlayerModal}
                    hide={setVideoPlayerModal}
                    uri={selectedVideoUri}
                />
            </ImageBackground>
        </LinearGradient>
    </View>);
})

export default HomeScreen;
