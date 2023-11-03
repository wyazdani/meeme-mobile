import {Formik} from 'formik';
import React, {useState} from 'react';
import {
    Alert, Text, TouchableOpacity, View,
} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Hide from '../../../../assets/svgs/hide.svg';
import Show from '../../../../assets/svgs/show.svg';
import Check from '../../../../assets/svgs/check.svg';
import UnCheck from '../../../../assets/svgs/uncheck.svg';

import {HitApi} from '../../../APIHits/APIHandler';
import {SIGNIN} from '../../../APIHits/urls';
import RNButton from '../../../components/RNButton';
import RNInput from '../../../components/RNInputField';
import {SetJudgeCount_Coins} from '../../../redux/Actions/appAction';
import {Login} from '../../../redux/Actions/authAction';
import {fonts} from '../../../Themes/FontsConfig/index';
import Header from '../../../components/Header';


const SignInScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const [isSecure, setIsSecure] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ================= Validation funtion with formik ==========================
    const userInfo = {
        email: '', password: '',
    };
    const validationSchema = yup.object({
        email: yup
            .string()
            .label('email')
            .email('Email must be a valid email address')
            .required('Email is required'), password: yup.string().label('password').required('Password is required'),
    });
    // =================  END ======================================

    //Login function
    const LoginUser = async (v, resetForm) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        setIsLoading(true);
        const data = new FormData();
        data.append('email', v?.email.toLowerCase());
        data.append('password', v?.password);
        data.append('mobile_token', fcmToken);
        HitApi(SIGNIN, 'post', data)
            .then((res) => {
                if (res?.status == 200) {
                    var userInfo = {
                        ...res?.data?.user, img: res?.data?.profile_image,
                    };
                    dispatch(Login(userInfo, res?.data?.token));
                    dispatch(SetJudgeCount_Coins(res?.data?.user?.coins, 0));
                    Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    resetForm({values: userInfo});
                    navigation.replace('After');
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
                LoginUser(v, resetForm);
            }}
        >
            {({
                  handleChange, handleBlur, handleSubmit, values, touched, errors,
              }) => {
                const {email, password} = values;
                return (<>
                    <View style={{marginHorizontal: wp(5)}}>
                        <Text
                            style={{
                                ...styles.signInStyle, fontFamily: font.bold, color: 'white',
                            }}
                        >
                            Sign in
                        </Text>
                        <Text style={{...styles.textStyle, fontFamily: font.regular}}>
                            Enter email and password to get signed in.
                        </Text>
                        <RNInput
                            title="YOUR EMAIL"
                            marginVertical={hp(1.5)}
                            input={{
                                placeholder: 'example@gmail.com',
                                onChangeText: (t) => handleChange('email')(t.trim()),
                                onBlur: handleBlur('email'),
                                value: email,
                                editable: !isLoading,
                            }}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.warningStyle}>
                                {errors.email}
                            </Text>)}
                        <RNInput
                            title="YOUR PASSWORD"
                            svg={isSecure ? (<Show alignSelf="center"/>) : (<Hide alignSelf="center"/>)}
                            onPress={() => setIsSecure(!isSecure)}
                            isSecure={!isSecure}
                            editable={!isLoading}
                            value={password}
                            input={{
                                placeholder: 'password',
                                onChangeText: handleChange('password'),
                                onBlur: handleBlur('password'),
                                value: password,
                            }}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.warningStyle}>
                                {errors.password}
                            </Text>)}
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: hp(0.5)}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                           <TouchableOpacity
                           onPress={()=>setChecked(!checked)}
                           style={{marginTop:hp(1)}}>
                               {!checked? <UnCheck />:<Check/>} 
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.forgotStyle,{marginLeft:wp(2),color:"#fff"}]}>Remember me</Text>
                            </View>
                           </View>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                            disabled={isLoading}
                            style={styles.fogetOuterView}
                        >
                            <Text style={styles.forgotStyle}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
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
                            title={'Sign in'}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                </>);
            }}
        </Formik>
    </View>);
};

export default SignInScreen;

const styles = {
    container: {flexGrow: 1},
    warningStyle: {
        fontSize: wp(2.8), marginBottom: hp(1), color: '#FF4B55'
    },
    signInStyle: {fontSize: hp(4), marginTop: hp(1.5), marginBottom: hp(2)},
    textStyle: {fontSize: hp(2), color: '#BABABA', marginBottom: hp(3.5)},
    arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
    forgotStyle: {alignSelf: 'flex-end', marginTop: hp(1), fontSize: wp(4),color: '#FFCD2F'},
    fogetOuterView:{alignSelf: 'flex-end'}
};
