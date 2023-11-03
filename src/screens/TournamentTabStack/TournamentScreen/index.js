import React, {useEffect, useState} from 'react';
import {
    RefreshControl, ScrollView, ActivityIndicator, StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {
    ENROLL_TOURNAMENT, GET_LATEST_TOURNAMENTS, GET_TOURNAMENT_RULES,
} from '../../../APIHits/urls';
import MainHeader from '../../../components/MainHeader';
import Achievement from '../../../components/Modals/Achievement';
import Acknowledgements from '../../../components/Modals/Acknowledgements';
import RNButton from '../../../components/RNButton';
import {AppLoader} from '../../../components/RNLoader';
import RNDrive from '../../../components/RNDrive';
import {TextStroke} from '../../../components/ShadowText';
import {fonts} from '../../../Themes/FontsConfig';
import {coinConvert, staticRules} from '../../../utiles/export';
import Toast from 'react-native-simple-toast';
import MediaSelectionPopup from '../../../components/Modals/MediaSelectionPopup';

const TournamentScreen = ({navigation}) => {
    const {token} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const {fontChange, coins, counts, tempCoins, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [latestTournaments, setLatestTournaments] = useState(null);
    const [rules, setRules] = useState(null);
    const [showCongratsModal, setShowCongratsModal] = useState(false);
    const [isBannerImage, setIsBannerImage] = useState(true);
    const [mediaSelect, setMediaSelect] = useState(false);

    const bgImage = theme_data?.bgImage;

    useEffect(() => {
        setIsLoading(true);
        enrollTournament();
        getLatestTournaments();
    }, []);

    // get tournaments
    const getLatestTournaments = () => {
        HitApi(GET_LATEST_TOURNAMENTS, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data) {
                        setLatestTournaments(res?.data);
                        getTournamentRules(res?.data?.tournament?.id);
                    } else {
                        setLatestTournaments(null);

                        Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    }
                } else {
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                }
                setIsLoading(false);
                setLoading(false);
            })
            .catch((e) => {
                let {message} = e;
                Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
                setIsLoading(false);
                setLoading(false);
            });
    };

    // get tournament rules and regulations
    const getTournamentRules = (id) => {
        HitApi(`${GET_TOURNAMENT_RULES}?id=${id}`, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data?.tournament_rules?.rules.toString().length > 0) {
                        const orderedListItems = res?.data?.tournament_rules?.rules
                            .toString()
                            .split('<li>')
                            .join(',');
                        const orderedList = orderedListItems
                            .split(',')
                            .map((item) => item.replace(/&nbsp;/g, ''));
                        const newArr = orderedList.map((str) => str.replace(/<\/?ol>|<\/?li>|<\/?ul>|<\/?br>/g, ''),);
                        const filteredArr = newArr.filter((str) => str !== '');
                        const finalArr = filteredArr.map((str, index) => `${index + 1}. ${str}`,);
                        setRules(finalArr);
                    } else {
                        setRules(null);
                    }
                } else {
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                }
                setIsLoading(false);
                setLoading(false);
            })
            .catch((e) => {
                let {message} = e;
                Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
                setIsLoading(false);
                setLoading(false);
            });
    };

    // enroll in tournament;
    const enrollTournament = () => {
        setIsLoading(true);
        HitApi(ENROLL_TOURNAMENT, 'POST', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data?.message == 'Already enrolled') {
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        setTimeout(() => {
                            setShowCongratsModal(true);
                        }, 1000);
                        setTimeout(() => {
                            setShowCongratsModal(false);
                        }, 5000);
                    }
                }
            })
            .catch((e) => {
                let {message} = e;
                Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
                setIsLoading(false);
            });
    };

    // image Picker
    const selectImage = () => {
        ImageCropPicker.openPicker({
            mediaType: 'any', maxWidth: 500, maxHeight: 500, quality: 0.5,
        })
            .then((img) => {
                let imgObj = {
                    type: img.mime, uri: img.sourceURL || img.path, name: img.filename || img.mime,
                };
                navigation.navigate('CreateTournamentMemee', {item: imgObj});
            })
            .catch((err) => {
                return err;
            });
    };

    // enter in tournament
    const onPressEnterTournamentButton = () => {
        // if (latestTournaments?.is_current_user_enrolled) {
        //   selectImage();
        // } else {
        setShowModal(true);

        // }
    };

    // press on agree button
    const onPressAgree = () => {
        setShowModal(false);
        setTimeout(() => {
            // selectImage();
            setMediaSelect(true);
            // setShowCongratsModal(true);
        }, 500);
        // setTimeout(() => {
        //   setShowCongratsModal(false);
        // }, 5000);
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
                <View style={styles.headerStyle}>
                    <MainHeader
                        plusOnPress={() => navigation.navigate('BuyCoins')}
                        text={'Tournament'}
                        coins={coinConvert(tempCoins) || 0}
                        storeOnPress={() => navigation.navigate('StoreScreen')}
                        notiOnPress={() => navigation.navigate('ActivitiesScreen')}
                        showRedDot={counts ? true : false}
                    />
                </View>
                <RNDrive borderClr={color.g10}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            setLoading(true);
                            getLatestTournaments();
                            enrollTournament();
                            // getTournamentRules();
                        }}
                    />}
                >
                    <View style={styles.innerContainer}>
                        <LinearGradient
                            colors={[color?.linerClr3, color?.linerClr4]}
                            style={{...styles.innerView}}
                            start={{y: 0, x: 1}}
                            end={{y: 0.7, x: 1}}
                        >
                            <FastImage
                                style={styles.imgStyle}
                                source={latestTournaments?.tournament_banner_image ? {uri: latestTournaments?.tournament_banner_image} : require('../../../../assets/pngs/winnerCup.png')}
                                resizeMode="cover"
                                onLoadEnd={() => setIsBannerImage(false)}
                                onLoadStart={() => setIsBannerImage(true)}
                            />

                            {isBannerImage ? (<ActivityIndicator
                                color={'white'}
                                size="small"
                                style={{position: 'absolute', top: hp(12)}}
                            />) : null}

                            {/* ShadowText Season */}
                            <TextStroke stroke={1.5} color={'white'}>
                                <Text
                                    style={{
                                        ...styles.textStyle, fontFamily: font.medium, bottom: hp(2),
                                    }}
                                >
                                    {latestTournaments?.tournament?.title?.toUpperCase()}
                                </Text>
                            </TextStroke>

                            {/* participents and memes counts */}
                            <View style={styles.countsContainer}>
                                <View style={styles.counts}>
                                    <View style={styles.participents}>
                                        <Text
                                            style={{
                                                fontSize: wp(2.1), fontFamily: font.medium, color: color.black, // opacity: 0.6,
                                            }}
                                        >
                                            {'Number of\nParticipants'}
                                        </Text>
                                    </View>
                                    <View style={styles.memes}>
                                        <Text
                                            style={[styles.memesAndcounts, {
                                                fontFamily: font?.bold, color: color.black,
                                            },]}
                                        >
                                            {latestTournaments?.tournament_users_count || 0}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.counts}>
                                    <View style={styles.participents}>
                                        <Text
                                            style={{
                                                fontSize: wp(2.1), fontFamily: font.medium, color: color.black,
                                            }}
                                        >
                                            {'Number of\nMemes Posted'}
                                        </Text>
                                    </View>
                                    <View style={styles.memes}>
                                        <Text
                                            style={{
                                                fontSize: hp('1.8'), fontFamily: font?.bold, color: color.black,
                                            }}
                                        >
                                            {latestTournaments?.tournament_posts_count || 0}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginBottom: hp(2)}}>
                                <RNButton
                                    clr1={'#C67EFF'}
                                    clr2={'#A73AFC'}
                                    borderClr={'transparent'}
                                    borderWidth={0}
                                    family={font.medium}
                                    btnWidth={wp(80)}
                                    btnHeight={hp(5)}
                                    btnRadius={wp(10)}
                                    fontSize={hp(2)}
                                    title={'View all ranking prizes'}
                                    textColor={'white'}
                                    onPress={() => navigation.navigate('TournamentTabStack', {
                                        screen: 'PrizesRankScreen',
                                    })}
                                />
                            </View>
                        </LinearGradient>

                        <RNButton
                            clr1={color.linerClr1}
                            clr2={color.linerClr2}
                            textColor={color.bl1}
                            borderClr={'transparent'}
                            family={font.medium}
                            btnWidth={wp(90)}
                            btnHeight={hp(8.5)}
                            btnRadius={wp(10)}
                            btnVertical={hp(1)}
                            title={'Judge'}
                            onPress={() => {
                                if (latestTournaments != null) {
                                    navigation.navigate('TournamentTabStack', {
                                        screen: 'JudgeScreen', params: {
                                            bannerImage: latestTournaments?.tournament_banner_image, rules: rules,
                                        },
                                    });
                                } else {
                                    Toast.showWithGravity('No Tournaments are active at the moment.', Toast.SHORT, Toast.BOTTOM,);
                                }
                            }}
                        />
                        <RNButton
                            clr1={color.linerClr13}
                            clr2={color.linerClr14}
                            textColor={color.white}
                            borderClr={'transparent'}
                            family={font.medium}
                            btnWidth={wp(90)}
                            btnHeight={hp(8.5)}
                            btnRadius={wp(10)}
                            title={'Enter Tournament'}
                            onPress={() => {
                                if (latestTournaments != null) {
                                    //setMediaSelect(true);
                                    onPressEnterTournamentButton();
                                } else {
                                    Toast.showWithGravity('No Tournaments are active at the moment.', Toast.SHORT, Toast.BOTTOM,);
                                }
                            }}
                        />
                    </View>
                </ScrollView>
                {showModal && (<Acknowledgements
                    title={'Rules & Regulations'}
                    description={rules === null ? staticRules : rules}
                    show={showModal}
                    hide={setShowModal}
                    navigation={navigation}
                    onPressAgree={() => onPressAgree()}
                />)}

                {showCongratsModal && (<Achievement
                    show={showCongratsModal}
                    hide={setShowCongratsModal}
                    image={require('../../../../assets/pngs/congrats.png')}
                    title={'Congratulations'}
                    description={'Congrats, You joined the Tournament'}
                />)}
                <AppLoader loading={isLoading}/>
                <MediaSelectionPopup
                    isVisible={mediaSelect}
                    navigation={navigation}
                    setMediaSelect={setMediaSelect}
                    screenName="tournament"
                />
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default TournamentScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, headerStyle: {
        height: hp(8), marginHorizontal: wp(5), justifyContent: 'center',
    }, innerContainer: {
        marginHorizontal: wp(5), justifyContent: 'center', marginBottom: wp(25),
    }, innerView: {
        width: '100%', marginBottom: hp(1.5), borderRadius: wp('8'), justifyContent: 'center', alignItems: 'center',
    }, imgStyle: {
        width: wp(77), height: wp(70), borderRadius: hp(3), margin: hp(4),
    }, textStyle: {
        color: '#F7CD36', textAlign: 'center', fontSize: hp('5'),
    }, countsContainer: {
        width: wp(80), flexDirection: 'row', marginBottom: '5%', justifyContent: 'space-between',
    }, counts: {
        width: wp(41), height: 40, borderRadius: 30, flexDirection: 'row',
    }, participents: {
        width: wp(20),
        height: hp(5.4),
        backgroundColor: '#F5D174',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }, memes: {
        width: wp(20),
        height: hp(5.4),
        backgroundColor: '#FDE098',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }, memesAndcounts: {
        fontSize: hp('1.8'),
    },
});
