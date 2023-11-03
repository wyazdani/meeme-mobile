import React, {useCallback, useState} from 'react';
import {
    Alert, Image, ScrollView, StyleSheet, Platform, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Dialog} from 'react-native-simple-dialogs';
import MasterCard from '../../../../assets/svgs/masterCard.svg';
import BuyCoinsCard from '../../../components/Cards/BuyCoinsCard';
import Header from '../../../components/Header';
import {useFocusEffect} from '@react-navigation/native';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {useDispatch, useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {
    BUYTHECOINS, GETALLCARDS, PURCHASING_HISTORY,
} from '../../../APIHits/urls';
import PaymentCard from '../../../components/Cards/paymentCard';
import PurchaseCoinHistoryCard from '../../../components/Cards/PurchaseCoinHistoryCard';
import Achievement from '../../../components/Modals/Achievement';
import RNButton from '../../../components/RNButton';
import {AppLoader} from '../../../components/RNLoader';
import {SetJudgeCount_Coins} from '../../../redux/Actions/appAction';
import {fonts} from '../../../Themes/FontsConfig';
import {coinsBtn} from '../../../utiles/dummyData';
import {
    requestSubscription, clearTransactionIOS, initConnection, getProducts,
} from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';

const BuyCoins = ({navigation}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.authReducer);

    const {fontChange, coins, theme_data} = useSelector((state) => state.appReducer,);
    const {color} = useTheme();
    const font = fonts(fontChange);
    const [isModal, setIsModal] = useState({
        isCheck: false, amount: null, isIndex: null, cardId: null, coins: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [allCards, setAllCards] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [allHistory, setAllHistory] = useState([]);

    const itemSubs = Platform.select({
        ios: ['MicroPackage', 'SmallPackage', 'premiumPackage', 'largePackage'], android: [], default: [],
    });

    const bgImage = theme_data?.bgImage;

    useFocusEffect(useCallback(() => {
        GetAllCards();
        if (Platform.OS === 'ios') {
            initializeIAPConnection();
        }
        PurchasingHistory();
    }, [navigation]),);

    // IAP connection
    const initializeIAPConnection = async () => {
        try {
            const isConnected = await initConnection();
            if (Platform.OS === 'ios' && isConnected) {
                await clearTransactionIOS();
                await getItems();
            }
        } catch (error) {
            console.log('connection error :', error);
        }
    };

    // get IAP items
    const getItems = async () => {
        try {
            await getProducts({skus: itemSubs});
        } catch (error) {
            console.log(error);
        }
    };

    // purchase request through IAP
    const requestPurchase = async (sku, price, coins) => {
        setIsLoading(true);
        try {
            await requestSubscription(sku)
                .then(async (result) => {
                    if (Platform.OS === 'ios') {
                        setIsLoading(false);
                        BuyCoins(price, coins);
                        // can do your API call here to save the purchase details of particular user
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(`IAP req ERROR %%%%% ${err.code}`, err.message);
                });
        } catch (error) {
            setIsLoading(false);
            console.log(`err ${error.code}`, error.message);
        }
    };

    const GetAllCards = async () => {
        setIsLoading(true);
        let res = await HitApi(GETALLCARDS, 'GET', '', token);
        if (res?.status == 200) {
            setAllCards(res?.data?.user_cards);
        } else if (res?.status == 404) {
            setAllCards([]);
        } else {
            Alert.alert('Error', res?.message);
        }
        setIsLoading(false);
    };

    const CardPopUp = () => {
        return (<Dialog
                visible={isModal.isCheck}
                dialogStyle={[styles.dialogStyle, {backgroundColor: color.bgColor}]}
                onTouchOutside={() => setIsModal({...isModal, isCheck: false})}
            >
                <>
                    <Text
                        style={{
                            color: color.white, fontFamily: font.bold, marginBottom: hp(1),
                        }}
                    >
                        SELECT YOUR CARD
                    </Text>
                    {allCards?.length == 0 ? (<Text
                            style={[styles.textStyle, {fontFamily: font.medium, color: color.g2},]}
                        >
                            No Card Available
                        </Text>) : (<ScrollView showsVerticalScrollIndicator={false}>
                            {allCards?.map((i, index) => {
                                return (<View key={index}>
                                        <PaymentCard
                                            cardIcon={<MasterCard alignSelf="center"/>}
                                            name={i?.brand}
                                            info={`****${i?.last4}`}
                                            disabled={false}
                                            cardStyle={{marginVertical: hp(1), padding: wp(3)}}
                                            onPress={() => {
                                                setIsModal({
                                                    ...isModal, isIndex: index, cardId: i?.card_id,
                                                });
                                            }}
                                        />
                                        {isModal.isIndex == index ? (<View
                                                style={{
                                                    flexDirection: 'row', justifyContent: 'flex-end',
                                                }}
                                            >
                                                <RNButton
                                                    isLoading={isLoading}
                                                    clr1={color.linerClr1}
                                                    clr2={color.linerClr2}
                                                    textColor={color.bl1}
                                                    borderClr={'transparent'}
                                                    family={font.bold}
                                                    btnWidth={wp(25)}
                                                    btnHeight={hp(5)}
                                                    btnRadius={wp(10)}
                                                    btnVertical={hp(1)}
                                                    fontSize={wp(3.5)}
                                                    title={'Confirm'}
                                                    onPress={() => {
                                                        setIsModal({...isModal, isCheck: false});
                                                        setIsVisible(true);
                                                    }}
                                                />
                                            </View>) : null}
                                    </View>);
                            })}
                        </ScrollView>)}
                </>
            </Dialog>);
    };

    const BuyCoins = async (price, coins) => {
        setIsLoading(true);

        const data = new FormData();
        if (Platform.OS == 'ios') {
            data.append('amount_to_be_paid', price);
            data.append('coins', coins);
            data.append('platform', Platform.OS);
        } else {
            data.append('amount_to_be_paid', isModal?.amount);
            data.append('card_id', isModal?.cardId);
        }
        setIsVisible(false);
        let res = await HitApi(BUYTHECOINS, 'POST', data, token);

        if (res?.status == 200) {
            dispatch(SetJudgeCount_Coins(res?.data?.coins, 0));
            setIsModal({...isModal, isCheck: false, coins: coins});
            setshowModal(true);
            PurchasingHistory();
            setTimeout(async () => {
                setshowModal(false);
                await clearTransactionIOS();
            }, 5000);
        }
        setIsLoading(false);
    };

    const RNModal = () => {
        return (<View style={[styles.modalView, {backgroundColor: color.bgColor}]}>
                <Image
                    source={require('../../../../assets/pngs/coin.png')}
                    style={{width: wp(50), height: hp(15), alignSelf: 'center'}}
                    resizeMode="contain"
                />
                <LinearGradientText
                    colors={[color?.linerClr2, color?.linerClr1]}
                    text={isModal?.coins}
                    start={{y: 1, x: 0}}
                    end={{y: 0.2, x: 0}}
                    textStyle={[styles.priceStyle, {fontFamily: font?.bold}]}
                />

                <Text
                    style={[styles.modalText, {fontFamily: font.bold, color: color.white},]}
                >
                    {`are you sure you want to buy ${isModal?.coins} coins for USD ${isModal?.amount}?`}
                </Text>

                <View style={[styles.btnsStyle, {justifyContent: 'space-between'}]}>
                    <RNButton
                        isLoading={false}
                        clr1={color.linerClr1}
                        clr2={color.linerClr2}
                        textColor={color.bl1}
                        family={font.bold}
                        btnWidth={wp(35)}
                        btnHeight={hp(7)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        title={'Buy'}
                        borderWidth={0}
                        borderClr={'transparent'}
                        onPress={BuyCoins}
                    />

                    <RNButton
                        isLoading={false}
                        clr1={color.white}
                        clr2={color.white}
                        textColor={color.black}
                        family={font.bold}
                        btnWidth={wp(35)}
                        btnHeight={hp(7.5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        title={'Deny'}
                        borderWidth={0}
                        borderClr={'transparent'}
                        onPress={() => setIsVisible(false)}
                    />
                </View>
            </View>);
    };

    const PurchasingHistory = async () => {
        let url = Platform.OS == 'ios' ? `${PURCHASING_HISTORY}?platform=ios` : PURCHASING_HISTORY;
        let res = await HitApi(url, 'GET', '', token);

        if (res?.status == 200) {
            setAllHistory(res?.data?.total_history?.reverse() || res?.data?.history?.reverse(),);
        } else {
            setAllHistory([]);
            Alert.alert('Error', res?.message);
        }
    };

    return (<View style={{...styles.main, backgroundColor: color?.bgColor}}>
            {CardPopUp()}

            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.main}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.main}
                >
                    <Header
                        title={'Buy Coins'}
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        goBack={() => {
                            if (isVisible) {
                                setIsVisible(false);
                            } else {
                                navigation.goBack();
                            }
                        }}
                        navigation={navigation}
                    />
                    {isVisible ? (RNModal()) : (<>
                            <ScrollView style={{flex: 1}}>
                                <View style={styles.innerContainer}>
                                    {coinsBtn?.map((i, index) => {
                                        return (<View key={index}>
                                                <BuyCoinsCard
                                                    key={index}
                                                    btnText={`USD ${i?.price}`}
                                                    coins={i?.coins}
                                                    disabled={false}
                                                    onPress={() => {
                                                        if (Platform.OS === 'android') {
                                                            setIsModal({
                                                                ...isModal,
                                                                isCheck: true,
                                                                amount: i?.price,
                                                                coins: i?.coins,
                                                            });
                                                        } else {
                                                            setIsModal({
                                                                ...isModal, amount: i?.price, coins: i?.coins,
                                                            });
                                                            requestPurchase({sku: i?.package}, i?.price, i?.coins,);
                                                        }
                                                    }}
                                                />
                                            </View>);
                                    })}
                                </View>
                            </ScrollView>

                            <View style={[styles.bottomView]}>
                                <View style={styles.innerBottomView}>
                                    <View style={styles.textContainer}>
                                        <Text
                                            style={{
                                                color: color.white, fontFamily: font.bold, fontSize: hp(2),
                                            }}
                                        >
                                            Purchasing History
                                        </Text>
                                        <TouchableOpacity activeOpacity={0.8}>
                                            <Text
                                                style={{
                                                    color: color.y1, fontFamily: font.bold, fontSize: hp(1.8),
                                                }}
                                            >
                                                View all
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* purchased coins card */}
                                    {allHistory?.length == 0 ? (<View style={styles.noRecordStyle}>
                                            <Text
                                                style={{
                                                    alignSelf: 'center', fontFamily: font.medium, color: color.g2,
                                                }}
                                            >
                                                No Record Found
                                            </Text>
                                        </View>) : (<ScrollView>
                                            {allHistory?.map((item, index) => {
                                                return (<View style={{marginVertical: hp(0.9)}} key={index}>
                                                        <PurchaseCoinHistoryCard item={item}/>
                                                    </View>);
                                            })}
                                        </ScrollView>)}
                                </View>
                            </View>
                        </>)}
                    {showModal && (<Achievement
                            show={showModal}
                            hide={setshowModal}
                            image={require('../../../../assets/pngs/bgIcon.png')}
                            title={'Successful'}
                            description={`You have purchased ${isModal.coins} coins successfully.`}
                        />)}
                    <AppLoader loading={isLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default BuyCoins;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flexDirection: 'row', flexWrap: 'wrap', marginVertical: hp(1), marginHorizontal: hp(1),
    }, bottomView: {
        flex: 1.1,
    }, innerBottomView: {
        flex: 1, marginHorizontal: hp(2),
    }, textContainer: {
        flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(2),
    }, dialogStyle: {
        maxHeight: hp(50), padding: 2, borderRadius: wp(3), borderColor: 'white', borderWidth: 0.5,
    }, btnsStyle: {
        flexDirection: 'row', alignSelf: 'center', width: wp(80),
    }, priceStyle: {
        fontSize: hp(5.5), alignSelf: 'center', marginVertical: hp(3),
    }, modalText: {
        alignSelf: 'center', fontSize: hp(2.9), marginBottom: hp(2), marginHorizontal: wp(4),
    }, noRecordStyle: {justifyContent: 'center', flex: 0.8}, textStyle: {
        alignSelf: 'center', fontSize: wp(3), marginVertical: hp(3),
    }, modalView: {
        justifyContent: 'center', flex: 1, marginHorizontal: wp(5),
    }, appleStyle: {
        width: '100%', height: 50,
    },
});
