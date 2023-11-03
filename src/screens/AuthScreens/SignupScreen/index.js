import {Formik} from 'formik';
import React, {useState} from 'react';
import {
    Alert, ScrollView, Text, View,
} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';

import {useSelector} from 'react-redux';
import Hide from '../../../../assets/svgs/hide.svg';
import Show from '../../../../assets/svgs/show.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {EMAILVALIDATE} from '../../../APIHits/urls';
import RNButton from '../../../components/RNButton';
import RNInput from '../../../components/RNInputField';
import {fonts} from '../../../Themes/FontsConfig';
import Header from '../../../components/Header';

const SignUpScreen = ({navigation}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isSecure1, setIsSecure1] = useState(false);
    const [isSecure2, setIsSecure2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        name: '', email: '', password: '', confirmPassword: '',
    };
    const validationSchema = yup.object({
        name: yup.string().label('name').required('Name is required'), email: yup
            .string()
            .label('email')
            .email('Enter a valid email address ')
            .required('Email is required'), password: yup
            .string()
            .label('password')
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'), confirmPassword: yup
            .string()
            .label('confirmPassword')
            .required('Password is required')
            .oneOf([yup.ref('password')], "Passwords don't match")
            .min(8, 'Password must be at least 8 characters')
            .matches(/^[^-\s]+$/, '* This field cannot contain only blankspaces'),
    });
    // =================  END ======================================

    const EmailValidte = async (v, resetForm) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('email', v.email);
        let res = await HitApi(EMAILVALIDATE, 'POST', data);
        switch (res?.status) {
            case 200: {
                Alert.alert('Error', 'Email already present');
            }
                break;
            case 404: {
                navigation.navigate('UploadProfile', {item: v});
                //resetForm({ values: userInfo });
            }
                break;
            default: {
                Alert.alert('Error', res?.message);
            }
        }
        setIsLoading(false);
    };

    return (<View style={{flex: 1, backgroundColor: 'black'}}>
        <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>

        <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(v, {resetForm}) => {
                EmailValidte(v, resetForm);
            }}
        >
            {({
                  handleChange, handleBlur, handleSubmit, values, touched, errors,
              }) => {
                const {email, password, confirmPassword, name} = values;
                return (<>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginHorizontal: wp(5)}}>
                            <Text
                                style={{
                                    ...styles.signUpStyle, fontFamily: font.bold, color: 'white',
                                }}
                            >
                                Sign up
                            </Text>
                            <Text
                                style={{
                                    ...styles.textStyle, fontFamily: font.regular, color: '#BABABA',
                                }}
                            >
                                Enter email and password to sign up
                            </Text>
                            <RNInput
                                title="YOUR NAME"
                                marginVertical={hp(1.5)}
                                input={{
                                    placeholder: 'Name',
                                    onChangeText: handleChange('name'),
                                    onBlur: handleBlur('name'),
                                    value: name,
                                }}
                            />
                            {touched.name && errors.name && (<Text style={{...styles.warningStyle, color: '#FF4B55'}}>
                                {errors.name}
                            </Text>)}
                            <RNInput
                                title="YOUR EMAIL"
                                marginVertical={hp(1.5)}
                                input={{
                                    placeholder: 'example@gmail.com',
                                    onChangeText: (t) => handleChange('email')(t.trim()),
                                    onBlur: handleBlur('email'),
                                    value: email,
                                }}
                            />
                            {touched.email && errors.email && (<Text style={{...styles.warningStyle, color: '#FF4B55'}}>
                                {errors.email}
                            </Text>)}
                            <RNInput
                                title="CREATE PASSWORD"
                                marginVertical={hp(1.5)}
                                svg={isSecure1 ? (<Show alignSelf="center"/>) : (<Hide alignSelf="center"/>)}
                                onPress={() => setIsSecure1(!isSecure1)}
                                isSecure={!isSecure1}
                                editable={true}
                                input={{
                                    placeholder: 'password',
                                    onChangeText: handleChange('password'),
                                    onBlur: handleBlur('password'),
                                    value: password,
                                    editable: true,
                                }}
                            />
                            {touched.password && errors.password && (
                                <Text style={{...styles.warningStyle, color: '#FF4B55'}}>
                                    {errors.password}
                                </Text>)}
                            <RNInput
                                title="RE-TYPE PASSWORD"
                                svg={isSecure2 ? (<Show alignSelf="center"/>) : (<Hide alignSelf="center"/>)}
                                onPress={() => setIsSecure2(!isSecure2)}
                                isSecure={!isSecure2}
                                marginVertical={hp(1.5)}
                                editable={true}
                                input={{
                                    placeholder: 'password',
                                    onChangeText: handleChange('confirmPassword'),
                                    onBlur: handleBlur('confirmPassword'),
                                    value: confirmPassword,
                                }}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text style={{...styles.warningStyle, color: '#FF4B55'}}>
                                    {errors.confirmPassword}
                                </Text>)}
                        </View>
                    </ScrollView>
                    <View style={{justifyContent: 'flex-end'}}>
                        <RNButton
                            isLoading={isLoading}
                            clr1={'rgba(255, 226, 153, 1)'}
                            clr2={'rgba(246, 178, 2, 1)'}
                            borderClr={'transparent'}
                            textColor={'black'}
                            family={font.bold}
                            btnWidth={wp(90)}
                            btnHeight={hp(7.5)}
                            btnRadius={wp(10)}
                            btnVertical={hp(1)}
                            title={'Next'}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                </>);
            }}
        </Formik>
    </View>);
};

export default SignUpScreen;

const styles = {
    container: {flexGrow: 1},
    warningStyle: {
        fontSize: wp(2.8),
    },
    signUpStyle: {fontSize: hp(4), marginTop: hp(1.5), marginBottom: hp(1.5)},
    textStyle: {fontSize: hp(2), marginBottom: hp(3.5)},
    arrowStyle: {
        justifyContent: 'center', height: hp(4), width: wp(8),

        marginHorizontal: wp(5),
    },
};
