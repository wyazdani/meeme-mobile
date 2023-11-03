import {useFocusEffect} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useCallback, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {FORGOTPASSWORD, VERIFY_OTP} from '../../../APIHits/urls';
import RNButton from '../../../components/RNButton';
import RNDrive from '../../../components/RNDrive';
import {fonts} from '../../../Themes/FontsConfig';
import Header from '../../../components/Header';

var FormData = require('form-data');

const VerifyEmail = ({navigation, route}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {item} = route?.params;
    const [otpCode, setOtpCode] = useState('');
    const [newOTP, setNewOTP] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(true);
    var isSecond = 60;
    var x;
    const [counter, setCounter] = useState(60);

    useFocusEffect(
        useCallback(() => {
            if (timer) {
                x = setInterval(() => {
                    let temp = isSecond - 1;
                    isSecond = temp;
                    if (isSecond < 10) {
                        setCounter('0' + isSecond);
                    } else {
                        setCounter(isSecond);
                    }

                    if (isSecond == 0) {
                        clearInterval(x);
                        setTimer(false);
                        setCounter(60);
                    }
                }, 1000);
            }
        }, [timer]),
    );

    //VerifyOTP
    const VerifyOTP = async () => {
        setIsLoading(true);
        const data = new FormData();
        data.append('email', item?.email);
        data.append('otp', otpCode);

        if (otpCode.length != 4) {
            Alert.alert('Error', 'Enter the OTP first');
            setIsLoading(false);
        } else {
            let res = await HitApi(VERIFY_OTP, 'POST', data);
            if (res?.status == 200) {
                clearInterval(x);

                navigation.replace('PasswordReset', {
                    item: {
                        otp: otpCode,
                        email: item?.email,
                    },
                });
            } else {
                Alert.alert('Error', res?.message);
            }
            setIsLoading(false);
        }
    };

    //forgot Password
    const ResendOtp = (v) => {
        setTimer(true);
        setIsLoading(true);
        const data = new FormData();
        data.append('email', item?.email);
        HitApi(FORGOTPASSWORD, 'post', data)
            .then((res) => {
                if (res?.status == 200) {
                    setNewOTP(res?.data?.otp);
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                } else {
                    Alert.alert('Error', res?.message);
                }
                setIsLoading(false);
            })
            .catch((e) => {
                let {message} = e;
                setIsLoading(false);
                Alert.alert('Error', message);
            });
    };

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>
            <RNDrive borderClr={'#2B2B2B'}/>

            <View style={{marginHorizontal: wp(5), height: hp(75)}}>
                <Text
                    style={{
                        ...styles.verifyStyle,
                        fontFamily: font.bold,
                        color: 'white',
                    }}
                >
                    Verify Email
                </Text>
                <Text
                    style={{
                        ...styles.textStyle,
                        fontFamily: font.regular,
                        color: '#BABABA',
                    }}
                >
                    Code is sent to{' '}
                    <Text
                        style={{
                            color: 'white',
                            textDecorationLine: 'underline',
                        }}
                    >
                        {item?.email}
                    </Text>
                </Text>

                <View style={styles.otpCodeFullView}>
                    <OTPInputView
                        selectionColor={'black'}
                        keyboardType="number-pad"
                        pinCount={4}
                        codeInputFieldStyle={{
                            ...styles.otpCodeFieldStyle,
                            color: 'white',
                            backgroundColor: 'black',
                            borderColor: 'white',
                        }}
                        autoFocusOnLoad={false}
                        onCodeFilled={(code) => {
                            setOtpCode(code);
                        }}
                    />
                </View>
                <View style={{marginTop: hp(3)}}>
                    {!timer ? (
                        <>
                            <Text
                                style={{
                                    ...styles.otpResendTextStyle,
                                    color: '#BABABA',
                                    fontFamily: font.medium,
                                }}
                            >
                                Didn’t recive code?
                            </Text>
                            <TouchableOpacity onPress={ResendOtp} disabled={isLoading}>
                                <Text
                                    style={{
                                        ...styles.otpResendTextStyle,
                                        color: 'white',
                                        fontFamily: font.medium,
                                        textDecorationLine: 'underline',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Resend OTP
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text
                            style={{
                                ...styles.otpResendTextStyle,
                                color: 'white',
                                fontFamily: font.medium,
                            }}
                        >{`00:${counter}`}</Text>
                    )}
                </View>
            </View>

            <View style={{justifyContent: 'flex-end', flex: 1}}>
                <RNButton
                    isLoading={isLoading}
                    clr1={'rgba(255, 226, 153, 1)'}
                    clr2={'rgba(246, 178, 2, 1)'}
                    textColor={'black'}
                    borderClr={'transparent'}
                    family={font.bold}
                    btnWidth={wp(90)}
                    btnHeight={hp(7.5)}
                    btnRadius={wp(10)}
                    btnVertical={hp(1)}
                    title={'Verify'}
                    onPress={VerifyOTP}
                />
            </View>
        </View>
    );
};

export default VerifyEmail;

const styles = {
    container: {flexGrow: 1},

    otpCodeFullView: {
        height: hp(10),
        marginBottom: hp(4),
    },

    otpCodeFieldStyle: {
        borderRadius: wp(5),
        height: wp(15),
        width: wp(15),
        borderWidth: 1,
        fontSize: hp(3),
    },

    otpResendTextStyle: {
        fontSize: wp(3.5),
        alignSelf: 'center',
        marginBottom: hp(0.5),
    },
    verifyStyle: {fontSize: hp(4), marginTop: hp(2), marginBottom: hp(2)},
    textStyle: {fontSize: hp(2), marginBottom: hp(4)},
    arrowStyle: {
        justifyContent: 'center',
        height: hp(8),
        marginHorizontal: wp(5),
    },
};
