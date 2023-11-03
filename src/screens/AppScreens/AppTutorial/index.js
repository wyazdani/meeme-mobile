import {
    Text, ScrollView, Alert, ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {fonts} from '../../../Themes/FontsConfig';
import AppLogo from '../../../../assets/svgs/appLogo.svg';
import AppIntroCard from '../../../components/AppIntroCard';
import {HitApi} from '../../../APIHits/APIHandler';
import {APP_Tutorial} from '../../../APIHits/urls';
import {AppLoader} from '../../../components/RNLoader';
import Header from '../../../components/Header';

const AppTutorial = ({navigation}) => {
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isLoading, setIsLoading] = useState(false);
    const [appIntro, setAppIntro] = useState([]);

    const bgImage = theme_data?.bgImage;

    const AppIntroApi = async () => {
        setIsLoading(true);
        let res = await HitApi(APP_Tutorial, 'get');

        if (res?.status == 200) {
            setIsLoading(false);
            setAppIntro(res?.data?.tutorials);
        } else {
            setIsLoading(false);
            Alert.alert('Error', res?.message);
        }
    };

    useEffect(() => {
        AppIntroApi();
    }, []);

    return (<LinearGradient
            colors={['#0C0314', '#2F2836']}
            style={{flex: 1}}
            start={{y: 0, x: 0}}
            end={{y: 0.4, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={{flex: 1}}
                resizeMode="cover"
            >
                <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <AppLogo alignSelf="center" marginVertical={hp(5)}/>
                    <Text
                        style={[styles.headingStyle, {
                            color: color?.white, fontFamily: font.bold,
                        },]}
                    >
                        Welcome to Memee
                    </Text>

                    <Text
                        style={[styles.titleStyle, {
                            color: color?.white, fontFamily: font.bold,
                        },]}
                    >
                        Tournament Rules
                    </Text>
                    {appIntro.map((i) => {
                        return <AppIntroCard item={i}/>;
                    })}
                </ScrollView>
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>);
};

export default AppTutorial;

const styles = {
    headingStyle: {
        fontSize: wp(9), alignSelf: 'center', textAlign: 'center', marginHorizontal: wp(10), lineHeight: hp(4.5),
    }, titleStyle: {
        fontSize: wp(6.5), alignSelf: 'center', textAlign: 'center', marginHorizontal: wp(6), marginVertical: hp(4),
    },
};
