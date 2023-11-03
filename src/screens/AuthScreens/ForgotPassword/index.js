import {Formik} from 'formik';
import React, {useState} from 'react';
import {
    Alert, Text, View,
} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';

let FormData = require('form-data');

import RNButton from '../../../components/RNButton';
import RNInput from '../../../components/RNInputField';
import {fonts} from '../../../Themes/FontsConfig';

import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {FORGOTPASSWORD} from '../../../APIHits/urls';
import Header from '../../../components/Header';

const ForgotPassword = ({navigation}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const [isLoading, setIsLoading] = useState(false);

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        email: '',
    };
    const validationSchema = yup.object({
        email: yup
            .string()
            .label('email')
            .email('Email must be a valid email address')
            .required('Email is required'),
    });
    // =================  END ======================================

    //forgot Password
    const ForgotPassword = (v, resetForm) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('email', v?.email.toLowerCase());
        HitApi(FORGOTPASSWORD, 'post', data)
            .then((res) => {
                if (res?.status == 200) {
                    navigation.navigate('VerifyEmail', {
                        item: {
                            email: v.email, otp: res?.data?.otp,
                        },
                    });
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    resetForm();
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

    return (<View style={{flex: 1, backgroundColor: 'black'}}>
        <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>
        <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(v, {resetForm}) => {
                ForgotPassword(v, resetForm);
            }}
        >
            {({
                  handleChange, handleBlur, handleSubmit, handleReset, values, touched, errors,
              }) => {
                const {email} = values;
                return (<>
                    <View style={{marginHorizontal: wp(5)}}>
                        <Text
                            style={{
                                ...styles.forgotStyle, color: 'white', fontFamily: font.bold,
                            }}
                        >
                            Forgot Password
                        </Text>
                        <Text
                            style={{
                                ...styles.textStyle, color: '#BABABA', fontFamily: font.regular,
                            }}
                        >
                            You’ll receive 4 digit code to verify email.
                        </Text>
                        <RNInput
                            title="YOUR EMAIL"
                            marginVertical={hp(1.5)}
                            editable={!isLoading}
                            input={{
                                placeholder: 'example@gmail.com',
                                onChangeText: (t) => handleChange('email')(t.trim()),
                                onBlur: handleBlur('email'),
                                value: email,
                                editable: !isLoading,
                            }}
                        />
                        {touched.email && errors.email && (<Text style={{...styles.warningStyle, color: '#FF4B55'}}>
                            {errors.email}
                        </Text>)}
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
                            title={'Continue'}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                </>);
            }}
        </Formik>
    </View>);
};

export default ForgotPassword;

const styles = {
    container: {flexGrow: 1},
    warningStyle: {
        marginTop: hp(0.1), fontSize: wp(2.8),

        marginBottom: hp(1),
    },
    forgotStyle: {fontSize: hp(4), marginTop: hp(1.5), marginBottom: hp(2)},
    textStyle: {fontSize: hp(2), marginBottom: hp(3.8)},
    arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
};
