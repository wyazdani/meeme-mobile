import {View, Text, Alert, Platform} from 'react-native';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import AppLogo from '../../../../assets/svgs/appLogo.svg';
import RNButton from '../../../components/RNButton';
import {btns} from '../../../utiles/dummyData';
import {fonts} from '../../../Themes/FontsConfig/index';
import {useTheme} from 'react-native-paper';
import {
    onAppleButtonPress, onGoogleButtonPress,onFacebookButtonPress
} from '../../../utiles/export';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation, route}) => {
    const dispatch = useDispatch();

    const [btnSelect, setBtnSelect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {color} = useTheme();
    const {fontChange, app_Theme} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const BtnCall = async (index) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');

        setIsLoading(true);
        setBtnSelect(index);
        if (index == 0) {
            navigation.navigate('SignInScreen');
            setIsLoading(false);
        } else if (index == 1) {
            onGoogleButtonPress(fcmToken, dispatch, setIsLoading, navigation);
        } else if (index == 2) {
            onAppleButtonPress(fcmToken, dispatch, setIsLoading, navigation);
        }
    };

    let socailBtns = Platform.select({
        ios: btns, android: btns.slice(0, 2),
    });
    return (<View style={{...styles.container, backgroundColor: 'black'}}>
        <View style={styles.logoStyle}>
            <AppLogo alignSelf="center"/>
        </View>
        <View style={styles.btnsContainerStyle}>
            {socailBtns.map((i, index) => (<RNButton
                isLoading={btnSelect == index ? isLoading : false}
                key={i?.id}
                clr1={index == btnSelect ? 'rgba(255, 226, 153, 1)' : 'transparent'}
                clr2={index == btnSelect ? 'rgba(246, 178, 2, 1)' : 'transparent'}
                textColor={index == btnSelect ? 'black' : 'white'}
                family={index == btnSelect ? font.bold : font.regular}
                borderClr={index == btnSelect ? 'transparent' : '#616161'}
                btnWidth={wp(90)}
                btnHeight={hp(8)}
                btnRadius={wp(10)}
                btnVertical={hp(1)}
                title={i.title}
                svg={index == 0 && btnSelect ? i?.icon2 : index == 2 && btnSelect == index ? i?.icon2 : i?.icon}
                onPress={() => BtnCall(index)}
            />))}
        </View>
        <View style={styles.footerStyle}>
            <Text
                style={{
                    ...styles.newStyle, fontFamily: font.medium, color: '#888888',
                }}
            >
                New to memee?{' '}
                <Text
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={{color: '#FFCD2F', fontFamily: font.bold}}
                >
                    Sign up
                </Text>
            </Text>
            <Text
                style={{
                    ...styles.continueStyle, color: '#888888', fontFamily: font.medium,
                }}
            >
                By continuing you agree Memee’s{' '}
                <Text
                    onPress={() => navigation.navigate('TermsAndCondition')}
                    style={{textDecorationLine: 'underline'}}
                >
                    Terms of Services
                </Text>{' '}
                &{' '}
                <Text
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    style={{textDecorationLine: 'underline'}}
                >
                    Privacy Policy.
                </Text>
            </Text>
        </View>
    </View>);
};

export default LoginScreen;

const styles = {
    container: {flex: 1},
    logoStyle: {flex: 0.15, justifyContent: 'center'},
    btnsContainerStyle: {flex: 0.65, justifyContent: 'center'},
    footerStyle: {
        flex: 0.15, alignSelf: 'center', justifyContent: 'center',
    },
    newStyle: {fontSize: hp(2), alignSelf: 'center'},
    continueStyle: {
        lineHeight: hp(3), alignSelf: 'center', width: wp(75), marginTop: hp(2), textAlign: 'center', fontSize: wp(3.1),
    },
};
