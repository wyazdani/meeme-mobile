import React, {useState, useEffect} from 'react';
import {
    ScrollView, Text, View, Alert, useWindowDimensions,
} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {fonts} from '../../../Themes/FontsConfig';
import {HitApi} from '../../../APIHits/APIHandler';
import {PRIVACY_POLICY} from '../../../APIHits/urls';
import {AppLoader} from '../../../components/RNLoader';
import Header from '../../../components/Header';

const PrivacyPolicy = ({navigation}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const [isPp, setIsPp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const font = fonts(fontChange);
    const {width} = useWindowDimensions();

    useEffect(() => {
        getPP();
    }, []);

    const getPP = async () => {
        setIsLoading(true);
        let res = await HitApi(PRIVACY_POLICY, 'get');
                if (res?.status == 200) {
            setIsPp(res?.data?.privacy?.description);
            setIsLoading(false);
        } else {
                        Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    const source = {
        html: `${isPp}`,
    };

    return (<View style={{...styles.mainContainer, backgroundColor: 'black'}}>
        <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>

        <Text
            style={{
                ...styles.headingStyle, color: 'white', fontFamily: font.bold,
            }}
        >
            Privacy & Policy
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal: wp(5)}}>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                    tagsStyles={styles.mixedStyle}
                />
            </View>
        </ScrollView>
        <AppLoader loading={isLoading}/>
    </View>);
};

export default PrivacyPolicy;

const styles = {
    mainContainer: {
        flex: 1,
    }, container: {
        marginTop: hp(2), marginHorizontal: wp(8),
    }, mixedStyle: {
        strong: {
            fontSize: wp(4), marginTop: hp(1), lineHeight: hp(3), marginHorizontal: wp(5),

            color: 'white',
        },

        div: {
            color: 'fff', opacity: 0.8, justifyContent: 'center', textAlign: 'left',
        },
    }, headingStyle: {
        fontSize: wp(7), marginHorizontal: wp(5), marginVertical: hp(1),
    },

    arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
};
