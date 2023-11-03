import {Formik} from 'formik';
import React, {useState} from 'react';
import {
    Keyboard, ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';

let FormData = require('form-data');

import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import BackArrow from '../../../../assets/svgs/arrow-left.svg';
import Hide from '../../../../assets/svgs/hide.svg';
import Show from '../../../../assets/svgs/show.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {CHANGEPASSWORD} from '../../../APIHits/urls';
import RNButton from '../../../components/RNButton';
import RNDrive from '../../../components/RNDrive';
import RNInput from '../../../components/RNInputField';
import {fonts} from '../../../Themes/FontsConfig';

const PasswordReset = ({navigation, route}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {color} = useTheme();
    const {item} = route?.params;

    const [isSecure1, setIsSecure1] = useState(false);
    const [isSecure2, setIsSecure2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        password: '', confirmPassword: '',
    };
    const validationSchema = yup.object({
        password: yup
            .string()
            .label('password')
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/^[^-\s]+$/, '* This field cannot contain only blank-spaces'), confirmPassword: yup
            .string()
            .label('confirmPassword')
            .required('Password is required')
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .min(8, 'Password must be at least 8 characters')
            .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'),
    });

    // =================  END ======================================

    //Create new password
    const CreateNewPassword = (v, resetForm) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('otp', item?.otp);
        data.append('password', v?.password);
        data.append('password_confirmation', v?.confirmPassword);
        data.append('email', item?.email);

        HitApi(CHANGEPASSWORD, 'post', data)
            .then((res) => {
                if (res?.status == 200) {
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    navigation.navigate('SignInScreen');
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
        <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(v, {resetForm}) => {
                CreateNewPassword(v, resetForm);
            }}
        >
            {({
                  handleChange, handleBlur, handleSubmit, handleReset, values, touched, errors,
              }) => {
                const {password, confirmPassword} = values;
                return (<>
                    <TouchableOpacity
                        style={styles.arrowStyle}
                        onPress={() => {
                            Keyboard.dismiss();
                            setTimeout(() => {
                                navigation.goBack();
                            }, 200);
                        }}
                    >
                        <BackArrow/>
                    </TouchableOpacity>
                    <RNDrive borderClr={'#2B2B2B'}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginHorizontal: wp(5), height: hp(70)}}>
                            <Text
                                style={{
                                    ...styles.passwordResetStyle, fontFamily: font.bold, color: 'white',
                                }}
                            >
                                Reset Password
                            </Text>
                            <Text
                                style={{
                                    ...styles.textStyle, fontFamily: font.regular, color: '#BABABA',
                                }}
                            >
                                Enter new password
                            </Text>
                            <RNInput
                                title="CREATE NEW PASSWORD"
                                marginVertical={hp(1.5)}
                                svg={isSecure1 ? (<Show alignSelf="center"/>) : (<Hide alignSelf="center"/>)}
                                onPress={() => setIsSecure1(!isSecure1)}
                                isSecure={!isSecure1}
                                editable={!isLoading}
                                input={{
                                    placeholder: 'password',
                                    onChangeText: handleChange('password'),
                                    onBlur: handleBlur('password'),
                                    value: password,
                                }}
                            />
                            {touched.password && errors.password && (<Text
                                style={{
                                    ...styles.warningStyle, color: '#FF4B55',
                                }}
                                x
                            >
                                {errors.password}
                            </Text>)}
                            <RNInput
                                title="RE-TYPE NEW PASSWORD"
                                svg={isSecure2 ? (<Show alignSelf="center"/>) : (<Hide alignSelf="center"/>)}
                                onPress={() => setIsSecure2(!isSecure2)}
                                isSecure={!isSecure2}
                                editable={!isLoading}
                                marginVertical={hp(1.5)}
                                input={{
                                    placeholder: 'password',
                                    onChangeText: handleChange('confirmPassword'),
                                    onBlur: handleBlur('confirmPassword'),
                                    value: confirmPassword,
                                }}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (<Text
                                style={{
                                    ...styles.warningStyle,

                                    color: '#FF4B55',
                                }}
                            >
                                {errors.confirmPassword}
                            </Text>)}
                        </View>
                    </ScrollView>
                    <RNButton
                        isLoading={isLoading}
                        clr1={'rgba(255, 226, 153, 1)'}
                        clr2={'rgba(246, 178, 2, 1)'}
                        textColor={'black'}
                        family={font.bold}
                        btnWidth={wp(90)}
                        btnHeight={hp(7.5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        borderWidth={0}
                        borderClr="transparent"
                        title={'Reset Password'}
                        onPress={() => handleSubmit()}
                    />
                </>);
            }}
        </Formik>
    </View>);
};

export default PasswordReset;

const styles = {
    container: {flexGrow: 1}, warningStyle: {
        marginTop: hp(0.1), fontSize: wp(2.8), marginBottom: hp(1),
    },

    passwordResetStyle: {
        fontSize: hp(4), marginTop: hp(1.5), marginBottom: hp(2),
    }, textStyle: {fontSize: hp(2), marginBottom: hp(3.5)}, arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
};
