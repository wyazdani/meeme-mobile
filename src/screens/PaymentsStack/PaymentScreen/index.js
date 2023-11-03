import {useFocusEffect} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useCallback, useRef, useState} from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Dialog} from 'react-native-simple-dialogs';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import MasterCard from '../../../../assets/svgs/masterCard.svg';
import RedMi from '../../../../assets/svgs/redMi.svg';
import RightArrow from '../../../../assets/svgs/rightArrow.svg';
import Tick from '../../../../assets/svgs/tick.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {ADDCARD, DELETEACARD, GETALLCARDS} from '../../../APIHits/urls';
import PaymentCard from '../../../components/Cards/paymentCard';
import Header from '../../../components/Header';
import RNDrive from '../../../components/RNDrive';
import RNInput from '../../../components/RNInputField';
import {AppLoader} from '../../../components/RNLoader';
import {CardInfo} from '../../../redux/Actions/appAction';
import {fonts} from '../../../Themes/FontsConfig';
import LinearGradient from 'react-native-linear-gradient';

const PaymentScreen = ({navigation}) => {
    const {paymentMainView, paymentMethodeTextStyle, addPaymentView, infoCard} = styles;
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const {color} = useTheme();
    const {token} = useSelector((state) => state.authReducer);
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheck, setIsCheck] = useState('main');
    const [allCards, setAllCards] = useState([]);
    const [isTemp, setIsTemp] = useState(null);

    const bgImage = theme_data?.bgImage;

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        number: '', expires: '', cvv: '', fName: '', lName: '', country: '',
    };
    const validationSchema = yup.object({
        number: yup
            .string()
            .label('number')
            .required('Card number is required')
            .min(15, 'Number must be 15 to 16 digit long')
            .max(16, 'Number must be 15 to 16 digit long')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'), expires: yup
            .string()
            .label('expires')
            .required('Expire date is required')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'), cvv: yup
            .string()
            .label('cvv')
            .required('Cvv code is required')
            .max(3, 'Cvv code must be 3 numbers')
            .min(3, 'Cvv code must be 3 numbers')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'), fName: yup
            .string()
            .label('fName')
            .required('First name is required')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'), lName: yup
            .string()
            .label('lName')
            .required('Surname is required')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'), country: yup
            .string()
            .label('country')
            .required('Country name is required')
            .matches(/^[^-\s]+$/, 'This field cannot contain only blankspaces'),
    });

    // =================  END ======================================

    const renderItem = (data) => {
        return (<PaymentCard
            cardIcon={<MasterCard alignSelf="center"/>}
            // rightIcon={
            //   <RightArrow
            //     alignSelf="center"
            //     marginRight={wp(1)}
            //     width={wp(2.5)}
            //     height={hp(2.3)}
            //   />
            // }
            name={data?.item?.brand}
            info={`****${data?.item?.last4}`}
            disabled={true}
            cardStyle={{padding: wp(2)}}
        />);
    };

    const deleteRow = () => {
        DeleteACard(isTemp?.card_id);
        if (allCards.length == 0) {
            dispatch(CardInfo([]));
        }
    };

    const renderHiddenItem = (rowData, rowMap) => {
        const data = rowData;

        return (<View key={data?.index} style={styles.rowBack}>
            <TouchableOpacity
                style={{justifyContent: 'center', marginLeft: wp(3)}}
                // onPress={() => deleteRow(rowMap, data?.item?.card_id, data.index)}
                onPress={() => setIsTemp({
                    isVisible: true,
                    rowMap: rowMap,
                    card_id: data?.item?.card_id,
                    index: data?.index,
                    last4: data?.item?.last4,
                })}
            >
                <RedMi alignSelf="center"/>
            </TouchableOpacity>
        </View>);
    };

    const PaymentMain = () => {
        return (<>
            {allCards.length == 0 ? (<View style={{height: hp(20), justifyContent: 'center'}}>
                <Text
                    style={{
                        alignSelf: 'center', color: color.g3, fontFamily: font.medium,
                    }}
                >
                    No Card found
                </Text>
            </View>) : (<View style={[paymentMainView, {backgroundColor: color.g8}]}>
                <SwipeListView
                    data={allCards}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-wp(45)}
                    disableLeftSwipe
                    closeOnScroll
                    onRowOpen={(rowKey, rowMap) => {
                        let key = rowKey;
                        if (key === rowKey) return;
                        setTimeout(() => {
                            rowMap[rowKey].closeRow();
                        }, 2000);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>)}
        </>);
    };

    const AddCard = () => {
        return (<View style={{marginVertical: hp(2), marginHorizontal: wp(6)}}>
            <PaymentCard
                rightIcon={<Tick alignSelf="center"/>}
                name="Credit/Debit Card"
                info="Visa, MasterCard, American Express"
                cardStyle={{padding: wp(5)}}
            />
        </View>);
    };

    const submitForm = () => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    };

    const AddCardInfo = () => {
        return (<View style={{marginHorizontal: wp(6), marginTop: hp(3)}}>
            <PaymentCard
                cardIcon={<MasterCard alignSelf="center"/>}
                //rightIcon={<RightArrow alignSelf="center" />}
                name="Card"
                info="Credit / Debit Card"
                cardStyle={{padding: wp(3)}}
            />
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                innerRef={formikRef}
                onSubmit={(values) => {
                    CardAdd(values);
                    //setIsCheck('main');
                }}
            >
                {({
                      handleChange, handleBlur, handleSubmit, handleReset, values, touched, errors,
                  }) => {
                    const {number, cvv, expires, fName, lName, country} = values;
                    return (<>
                        <Text
                            style={[infoCard, {fontFamily: font.bold, color: color.white},]}
                        >
                            Info About Your Card
                        </Text>
                        <RNInput
                            title="NUMBER"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'Required',
                                onChangeText: handleChange('number'),
                                onBlur: handleBlur('number'),
                                value: number,
                                maxLength: 16,
                                keyboardType: 'number-pad',
                            }}
                        />
                        {touched.number && errors.number && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.number}
                        </Text>)}
                        <RNInput
                            title="EXPIRES"
                            marginVertical={hp(1.5)}
                            value={expires}
                            input={{
                                placeholder: 'MM / YYYY',
                                onChangeText: (text) => handleChange('expires')(text.length === 3 && !text.includes('/') ? `${text.substring(0, 2)}/${text.substring(2)}` : text,),
                                onBlur: handleBlur('expires'),

                                value: expires,
                                maxLength: 7,
                                keyboardType: 'number-pad',
                            }}
                        />
                        {touched.expires && errors.expires && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.expires}
                        </Text>)}
                        <RNInput
                            title="CVV"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'Security Code',
                                onChangeText: handleChange('cvv'),
                                onBlur: handleBlur('cvv'),

                                value: cvv,
                                maxLength: 3,
                                keyboardType: 'number-pad',
                            }}
                        />
                        {touched.cvv && errors.cvv && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.cvv}
                        </Text>)}
                        <Text
                            style={[infoCard, {fontFamily: font.bold, color: color.white},]}
                        >
                            Info About You
                        </Text>
                        <RNInput
                            title="FIRST NAME"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'Required',
                                onChangeText: handleChange('fName'),
                                onBlur: handleBlur('fName'),
                                value: fName,
                            }}
                        />
                        {touched.fName && errors.fName && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.fName}
                        </Text>)}
                        <RNInput
                            title="SURNAME"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'Required',
                                onChangeText: handleChange('lName'),
                                onBlur: handleBlur('lName'),
                                value: lName,
                            }}
                        />
                        {touched.lName && errors.lName && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.lName}
                        </Text>)}
                        <RNInput
                            title="COUNTRY"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'Required',
                                onChangeText: handleChange('country'),
                                onBlur: handleBlur('country'),
                                value: country,
                            }}
                        />
                        {touched.country && errors.country && (<Text style={{...styles.warningStyle, color: color.r1}}>
                            {errors.country}
                        </Text>)}
                    </>);
                }}
            </Formik>
        </View>);
    };

    const PresentTheScreen = () => {
        switch (isCheck) {
            case 'main':
                return PaymentMain();
                break;
            case 'addCard':
                return AddCard();
                break;
            case 'addInfo':
                return AddCardInfo();
                break;
            case 'editCard':
                return AddCardInfo();
        }
    };

    const rightText = () => {
        switch (isCheck) {
            case 'main':
                return '';
                break;
            case 'addCard':
                return 'Next';
                break;
            case 'editCard':
                return 'Save';
                break;
            default:
                return 'Done';
        }
    };

    const onPress = () => {
        switch (isCheck) {
            case 'addCard':
                return setIsCheck('addInfo');
                break;
            default:
                return submitForm();
        }
    };

    const GetAllCards = async () => {
        setIsLoading(true);
        let res = await HitApi(GETALLCARDS, 'GET', '', token);

        if (res?.status == 200) {
            setAllCards(res?.data?.user_cards);
            dispatch(CardInfo(res?.data?.user_cards));
        } else if (res?.status == 404) {
            setAllCards([]);
            dispatch(CardInfo([]));
        } else {
            Alert.alert('Error', res?.message);
        }
        setIsLoading(false);
    };

    const CardAdd = async (v) => {
        setIsLoading(true);
        const data = new FormData();
        let date = v?.expires.split('/');
        let d1 = moment(new Date()).format('MM/YYYY').split('/');

        if (parseInt(date[1]) >= parseInt(d1[1]) && parseInt(date[0]) <= 12) {
            data.append('number', v?.number);
            data.append('country', v?.country);
            data.append('exp_month', date[0]);
            data.append('exp_year', date[1]);
            data.append('cvc', v?.cvv);
            data.append('first_name', v?.fName);
            data.append('last_name', v?.lName);
            let res = await HitApi(ADDCARD, 'POST', data, token);

            if (res?.status == 200) {
                setIsCheck('main');
                GetAllCards();
            } else {
                Alert.alert('Error', res?.message);
            }
            setIsLoading(false);
        } else {
            Alert.alert('Error ', 'Invalid expire date');
            setIsLoading(false);
        }
    };

    const DeleteACard = async (id) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('card_id', id);

        let res = await HitApi(DELETEACARD, 'DELETE', data, token);
        if (res?.status == 200) {
            GetAllCards();
        } else {
            Alert.alert('Error', res?.message);
        }

        setIsLoading(false);
    };

    useFocusEffect(useCallback(() => {
        GetAllCards();
    }, [navigation]),);

    const DeleteCardPopUp = () => {
        return (<Dialog
            visible={isTemp?.isVisible}
            dialogStyle={[styles.dialogStyle, {backgroundColor: color.white}]}
            onTouchOutside={() => setIsTemp({...isTemp, isVisible: false})}
            title="Remove Card"
            titleStyle={[styles.titleStyle, {
                color: color.black, fontFamily: font?.bold,
            },]}
        >
            <Text
                style={[styles.headingStyle, {
                    color: color.black, fontFamily: font?.regular,
                },]}
            >
                Do you want to remove this card with ending
                <Text
                    style={[styles.headingStyle, {color: '#004A97'}]}
                >{` **** ${isTemp?.last4} `}</Text>
                ?
            </Text>
            <RNDrive
                borderClr="rgba(60, 60, 67, 0.36)"
                borderWidth={0.3}
                marginHorizontail={wp(-8)}
            />
            <View style={styles.btnStyle1}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => setIsTemp({...isTemp, isVisible: false})}
                >
                    <Text
                        style={[styles.btntextStyle, {color: '#007AFF', fontFamily: font.regular},]}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
                <View style={styles.centerBarStyle}/>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => {
                        deleteRow();
                        setIsTemp({...isTemp, isVisible: false});
                    }}
                >
                    <Text
                        style={[styles.btntextStyle, {color: '#007AFF', fontFamily: font.bold},]}
                    >
                        Remove
                    </Text>
                </TouchableOpacity>
            </View>
        </Dialog>);
    };

    return (<View style={[styles.mainContainer, {backgroundColor: color.bgColor}]}>
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
                {DeleteCardPopUp()}
                <Header
                    title={isCheck == 'main' ? 'Payment' : isCheck == 'addCard' || isCheck == 'addInfo' ? 'Add Card' : null}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    rightText={rightText()}
                    textColor={color.y5}
                    goBack={() => {
                        if (isCheck == 'main') {
                            navigation.goBack();
                        }
                        setIsCheck('main');
                    }}
                    fontSize={hp(2.1)}
                    onPress={onPress}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isCheck != 'addInfo' ? (<Text
                        style={[paymentMethodeTextStyle, {fontFamily: font.bold, color: color.white},]}
                    >
                        Payment Methods
                    </Text>) : null}
                    {PresentTheScreen()}

                    {isCheck == 'addCard' || isCheck == 'addInfo' || isCheck == 'editCard' ? null : (<TouchableOpacity
                        style={[addPaymentView, {backgroundColor: color.g8}]}
                        onPress={() => setIsCheck('addCard')}
                    >
                        <Text
                            style={{
                                fontFamily: font.medium, fontSize: wp(3.8), color: color.white,
                            }}
                        >
                            Add Payment Method
                        </Text>
                        <RightArrow
                            alignSelf="center"
                            marginRight={wp(1)}
                            width={wp(2.5)}
                            height={hp(2.3)}
                        />
                    </TouchableOpacity>)}
                </ScrollView>
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default PaymentScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, rowBack: {
        flex: 1, flexDirection: 'row',
    }, paymentMainView: {
        marginHorizontal: wp(6), borderRadius: wp(2), marginTop: hp(2), marginBottom: hp(1.4),
    }, paymentMethodeTextStyle: {
        fontSize: wp(4.3), marginHorizontal: wp(6), marginTop: hp(3), marginBottom: hp(1), borderRadius: wp(2),
    }, addPaymentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(6),
        padding: wp(3),
        borderRadius: wp(1.5),
    }, addCardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(6),
        marginVertical: hp(4),
        padding: wp(5),
    }, addCardStyle: {
        alignSelf: 'center', marginLeft: wp(5),
    }, infoCard: {
        marginTop: hp(3), fontSize: wp(5), marginBottom: hp(2.5),
    }, warningStyle: {
        fontSize: wp(3),
    }, dialogStyle: {
        borderRadius: wp(3), width: wp(80), alignSelf: 'center',
    }, titleStyle: {
        alignSelf: 'center', fontSize: hp(2.5), marginTop: hp(3),
    }, headingStyle: {
        alignSelf: 'center', textAlign: 'center', fontSize: hp(1.8), marginTop: hp(-2), marginBottom: hp(3),
    }, flexView: {
        flexDirection: 'row', height: hp(6), backgroundColor: 'green', borderRadius: wp(3), marginBottom: hp(-3.2),
    }, btnStyle: {
        width: wp(40), height: hp(6), justifyContent: 'center',
    }, btntextStyle: {
        color: '#007AFF', fontSize: hp(2.2), alignSelf: 'center',
    }, centerBarStyle: {
        borderRightWidth: 1, borderRightColor: 'rgba(60, 60, 67, 0.36)',
    }, btnStyle1: {
        width: wp(80),
        height: hp(6),
        alignSelf: 'center',
        marginBottom: hp(-3.1),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
