import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useState} from 'react';
import {
    Alert, FlatList, ScrollView, StyleSheet, Text, ActivityIndicator, View, ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Acknowledgements from '../../../components/Modals/Acknowledgements';
import {
    SetJudgeCount_Coins, setJudge_Request,
} from '../../../redux/Actions/appAction';
import HistoryCard from '../../../components/Cards/HistoryCard';
import {TextStroke} from '../../../components/ShadowText';
import {AppLoader} from '../../../components/RNLoader';
import {useDispatch, useSelector} from 'react-redux';
import {staticRules} from '../../../utiles/export';
import {HitApi} from '../../../APIHits/APIHandler';
import {fonts} from '../../../Themes/FontsConfig';
import {JUDGE_DATA} from '../../../APIHits/urls';
import Header from '../../../components/Header';

const JudgeScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.authReducer);
    const {is_judge} = useSelector((state) => state.appReducer);

    const {fontChange, theme_data, tempCoins} = useSelector((state) => state.appReducer,);
    const {color} = useTheme();
    const font = fonts(fontChange);
    const [isJudge, setIsJudge] = useState(is_judge);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tournamentData, setTournamentData] = useState(null);
    const [judgeData, setJudgeData] = useState(null);
    const [isCount, setIsCount] = useState(0);
    const [isBannerImage, setIsBannerImage] = useState(true);

    const bgImage = theme_data?.bgImage;
    let bannerImage = route?.params?.bannerImage;

    useFocusEffect(useCallback(() => {
        JudgeData();
    }, [navigation]),);

    // judge data
    const JudgeData = () => {
        setIsLoading(true);
        HitApi(JUDGE_DATA, 'GET', '', token)
            .then((res) => {
                if (res?.status == 200) {
                    if (res?.data) {
                        setTournamentData(res?.data);
                        let updateJudgedData = res?.data?.judged_posts?.map((item, index) => {
                            let days = index + 1;
                            return {...item, days};
                        },);
                        setJudgeData(updateJudgedData?.reverse());
                    }
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

    const onPressCard = (item, index) => {
        if (index == 0 && item?.status) {
            Alert.alert('Message', 'Your count limit has been reached');
        } else if (index == 0) {
            // isJudge
            //   ? setTimeout(() => {
            //       navigation?.navigate('TournamentTabStack', {
            //         screen: 'JudgeMemees',
            //       });
            //     }, 200)
            //   : setShowModal(!showModal);
            setShowModal(!showModal);
        } else {
            Alert.alert('Message', 'Your selected day has passed');
        }
    };

    const onPressAgree = () => {
        setShowModal(false);
        dispatch(SetJudgeCount_Coins(tempCoins, isCount));
        // setIsJudge(true);
        // dispatch(setJudge_Request(true));
        setTimeout(() => {
            navigation?.navigate('TournamentTabStack', {
                screen: 'JudgeMemees',
            });
        }, 200);
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
                <Header
                    title={'Judge'}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    marginRight={hp(6)}
                    fontSize={hp(2.2)}
                    navigation={navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.innerContainer}>
                        <LinearGradient
                            colors={[color?.linerClr3, color?.linerClr4]}
                            style={{...styles.innerView}}
                            start={{y: 0, x: 1}}
                            end={{y: 0.7, x: 1}}
                        >
                            <FastImage
                                style={styles.imgStyle}
                                source={bannerImage ? {uri: bannerImage} : require('../../../../assets/pngs/winnerCup.png')}
                                resizeMode="cover"
                                onLoadEnd={() => setIsBannerImage(false)}
                                onLoadStart={() => setIsBannerImage(true)}
                            />
                            {isBannerImage ? (<ActivityIndicator
                                color={'white'}
                                size="small"
                                style={{position: 'absolute'}}
                            />) : null}

                            {/* ShadowText Season */}
                            <TextStroke stroke={2} color={'white'}>
                                <Text
                                    style={{
                                        ...styles.textStyle, fontFamily: font.medium, color: color?.linerClr3,
                                    }}
                                >
                                    {tournamentData?.tournament_banner?.title?.toUpperCase()}
                                </Text>
                            </TextStroke>
                        </LinearGradient>

                        <Text
                            style={{
                                ...styles.history, color: color?.white, fontFamily: font?.bold,
                            }}
                        >
                            History
                        </Text>

                        {/* History Header */}
                        <LinearGradient
                            colors={[color?.linerClr5, color?.linerClr6]}
                            style={styles?.historyHeader}
                            start={{y: 0, x: 1}}
                            end={{y: 0.7, x: 1}}
                        >
                            <Text
                                style={{left: 5, fontFamily: font?.bold, color: color.bl1}}
                            >
                                Days
                            </Text>
                            <View style={styles.verticalLine}/>
                            <Text style={{fontFamily: font?.bold, color: color.bl1}}>
                                No. of Memes
                            </Text>
                            <View style={styles.verticalLine}/>
                            <Text
                                style={{right: 5, fontFamily: font?.bold, color: color.bl1}}
                            >
                                Status
                            </Text>
                        </LinearGradient>

                        {/* card */}
                        <FlatList
                            data={judgeData}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            renderItem={({item, index}) => (<View style={styles.rankingCardContainer}>
                                <HistoryCard
                                    index={index}
                                    item={item}
                                    onPressCard={() => {
                                        setIsCount(item?.judged_post_date_count);
                                        onPressCard(item, index);
                                    }}
                                />
                            </View>)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
                {showModal && (<Acknowledgements
                    title={'Judge'}
                    description={route?.params?.rules ? route?.params?.rules : staticRules}
                    show={showModal}
                    hide={setShowModal}
                    navigation={navigation}
                    onPressAgree={() => onPressAgree()}
                />)}

                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default JudgeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp(5), marginBottom: wp(25), justifyContent: 'center',
    }, innerView: {
        width: '100%', marginTop: '2%', borderRadius: wp('8'), justifyContent: 'center', alignItems: 'center',
    }, imgStyle: {
        width: wp(75), height: wp(60), borderRadius: hp(3), margin: hp(4),
    }, textStyle: {
        width: wp(80), fontSize: hp(4), textAlign: 'center', bottom: hp(2.3),
    }, history: {
        marginVertical: hp(2), fontSize: hp(2.3),
    }, historyHeader: {
        width: '100%',
        height: hp(7),
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: hp(10),
    }, verticalLine: {
        height: hp(7), width: 1, backgroundColor: 'black',
    }, rankingCardContainer: {
        marginTop: hp(1.5),
    },
});
