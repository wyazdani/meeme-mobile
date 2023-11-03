import React, {useCallback, useState} from 'react';
import {
    Alert, ScrollView, StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {HitApi} from '../../APIHits/APIHandler';
import {GET_ALL_SUPPORTS} from '../../APIHits/urls';
import Header from '../../components/Header';
import RNButton from '../../components/RNButton';
import {AppLoader} from '../../components/RNLoader';
import SupportCard from '../../components/SupportCard';
import {fonts} from '../../Themes/FontsConfig';
import LinearGradient from 'react-native-linear-gradient';

const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const SupportScreen = ({navigation}) => {
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const {token} = useSelector((state) => state.authReducer);
    const font = fonts(fontChange);
    const [isLoading, setIsLoading] = useState(false);
    const [isTickets, setIsTickets] = useState([]);

    const bgImage = theme_data?.bgImage;

    useFocusEffect(useCallback(() => {
        GetAllSupports();
    }, [navigation]),);

    const GetAllSupports = async () => {
        setIsLoading(true);
        let res = await HitApi(GET_ALL_SUPPORTS, 'GET', '', token);
        if (res?.status == 200) {
            console.log("get spoert",JSON.stringify(res?.data,null,2));
            setIsTickets(res?.data?.messages);
        } else if (res?.status == 404) {
            setIsTickets([]);
        } else {
            Alert.alert('Error', res?.message);
        }
        setIsLoading(false);
    };

    return (<View style={{...styles.mainContainer, backgroundColor: color.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.mainContainer}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={styles.mainContainer}
                resizeMode="cover"
            >
                <Header
                    title="Support"
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    fontSize={hp(2.2)}
                />

                {isTickets.length == 0 ? (<View
                    style={{
                        alignSelf: 'center', flex: 1, justifyContent: 'center',
                    }}
                >
                    <Text style={{color: color?.g3, fontFamily: font?.medium}}>
                        No Ticket Found
                    </Text>
                </View>) : (<ScrollView showsVerticalScrollIndicator={false}>
                    {isTickets.map((i, index) => {
                        return (<SupportCard
                            key={index}
                            index={index}
                            date={moment(i?.created_at).format('MMM DD, YYYY | h:mm a')}
                            status={i?.status}
                            name={i?.subject}
                            image={i?.sender_image || dummyImg}
                            code={i?.message_ticket}
                            message={'nope'}
                            onPress={() => {
                                navigation.navigate('SupportChat', {item: i});
                            }}
                        />);
                    })}
                </ScrollView>)}

                <View style={{marginBottom: hp(5)}}>
                    <RNButton
                        borderClr="transparent"
                        clr1={color.linerClr1}
                        clr2={color.linerClr2}
                        textColor={color.bl1}
                        family={font.bold}
                        btnWidth={wp(90)}
                        btnHeight={hp(7.5)}
                        btnRadius={wp(10)}
                        btnVertical={hp(1)}
                        å
                        title={'Send New Ticket'}
                        onPress={() => navigation.navigate('CreateNewTicket')}
                    />
                </View>
                <AppLoader loading={isLoading}/>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default SupportScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});
