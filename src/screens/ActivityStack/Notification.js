import React, {useCallback, useState} from 'react';
import {
    Alert, StyleSheet, Text, TouchableOpacity, View, SectionList, ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {useFocusEffect} from '@react-navigation/native';
import PlusProfile from '../../../assets/svgs/plusProfile.svg';
import RightArrow from '../../../assets/svgs/rightArrow.svg';
import {HitApi} from '../../APIHits/APIHandler';
import {
    ALL_NOTIFICATIONS, PENDING_REQUESTS, SEND_FOLLOW_REQUEST, UNFOLLOW_REQUEST,
} from '../../APIHits/urls';
import RNDrive from '../../components/RNDrive';
import {AppLoader} from '../../components/RNLoader';
import {fonts} from '../../Themes/FontsConfig';
import MessagesCard from '../../components/Cards/MessagesCard';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';

const Notification = ({navigation}) => {
    const {color} = useTheme();
    const {token} = useSelector((state) => state.authReducer);
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);

    const [isLoading, setIsLoading] = useState(false);
    const [requestsCounts, setRequestsCounts] = useState(0);
    const [isSuggestion, setIssuggestion] = useState([]);

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    useFocusEffect(useCallback(() => {
        getAllNotifi();
        getPendingRequestsCounts();
    }, [navigation]),);

    // get requests counts
    const getPendingRequestsCounts = async () => {
        setIsLoading(true);
        let res = await HitApi(PENDING_REQUESTS, 'GET', '', token);
        if (res?.status == 200) {
            setRequestsCounts(res?.data?.pending_followers_count);
            setIsLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    const getAllNotifi = async () => {
        let res = await HitApi(ALL_NOTIFICATIONS, 'get', '', token);

        if (res?.status == 200) {
            setIssuggestion(res?.data?.notifications);
        } else {
            Alert.alert('Error', res?.message);
        }
    };

    // send follow request
    const followRequest = async (id, index, section) => {
        let sectionIndex = isSuggestion?.indexOf(section);
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);
        let res = await HitApi(SEND_FOLLOW_REQUEST, 'POST', data, token);
        if (res?.status == 200) {
            setIsLoading(false);
            isSuggestion[sectionIndex].data[index].notification_type = 'request_accepted';
            setIssuggestion([...isSuggestion]);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // unfollow request
    const unFollowRequest = async (id, index, section) => {
        let sectionIndex = isSuggestion?.indexOf(section);
        setIsLoading(true);
        var data = new FormData();
        data.append('follower_user_id', id);

        let res = await HitApi(UNFOLLOW_REQUEST, 'POST', data, token);

        if (res?.status == 200) {
            setIsLoading(false);
            isSuggestion[sectionIndex].data[index].notification_type = 'unFollow';
            setIssuggestion([...isSuggestion]);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
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
                    <TouchableOpacity
                        style={styles.cardView}
                        onPress={() => navigation.navigate('FollowRequest')}
                    >
                        <View style={styles.innerContainer}>
                            {icons?.pending_requests ? (<SvgUri
                                    alignSelf="center"
                                    uri={icons?.pending_requests}
                                    marginRight={wp(3)}
                                />) : (<PlusProfile alignSelf="center" marginRight={wp(3)}/>)}
                            <View style={styles.requestApproval}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        ...styles.dateStyle, color: color.white, fontFamily: font.bold,
                                    }}
                                >
                                    Follow Requests
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={{
                                        ...styles.codeStyle, color: color.g2, fontFamily: font.medium,
                                    }}
                                >
                                    Approve or ignore requests
                                </Text>
                            </View>
                        </View>

                        <View style={styles.rightStyle}>
                            {requestsCounts > 0 && (<View
                                    style={{
                                        ...styles.blueStyle, backgroundColor: color.b1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: color.white, fontFamily: font.bold, ...styles.countStyle,
                                        }}
                                    >
                                        {requestsCounts}
                                    </Text>
                                </View>)}
                            {icons?.forward ? (<SvgUri alignSelf="center" uri={icons?.forward}/>) : (
                                <RightArrow alignSelf="center"/>)}
                        </View>
                    </TouchableOpacity>
                    <RNDrive borderClr={color.g5}/>

                    <View
                        style={{
                            marginHorizontal: wp(5), flex: 1,
                        }}
                    >
                        <SectionList
                            sections={isSuggestion}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item, index, section}) => (<View key={index}>
                                    <MessagesCard
                                        status={false}
                                        item={item}
                                        purpose={item?.notification_type != 'comment' ? 'btnShow' : 'btnNotShow'}
                                        navigation={navigation}
                                        onPress1={() => {
                                            if (item?.request || item?.notification_type == 'request_accepted') {
                                                unFollowRequest(item?.user_id, index, section);
                                            } else {
                                                followRequest(item?.user_id, index, section);
                                            }
                                        }}
                                    />
                                </View>)}
                            renderSectionHeader={({section}) => {
                                let temp = section.title.split(',');
                                let time = `${temp[2]}-${temp[1]}-${temp[0]}T12:42:59.294Z`;
                                let date = parseInt(moment(time).format('D'));
                                let year = parseInt(moment(time).format('YYYY'));

                                let currentDate = parseInt(moment(new Date()).format('D'));
                                let CurrentYear = parseInt(moment(new Date()).format('YYYY'));
                                let dateShow;

                                if (year == CurrentYear) {
                                    if (date == currentDate) {
                                        dateShow = 'Today';
                                    }
                                    if (date == currentDate - 1) {
                                        dateShow = 'Yesterday';
                                    }
                                    if (date != currentDate && date != currentDate - 1) {
                                        dateShow = moment(time).format('DD-MM-YYYY');
                                    }
                                }

                                return (<Text
                                        style={[styles.header, {color: color.g2, fontFamily: font.bold},]}
                                    >
                                        {dateShow}
                                    </Text>);
                            }}
                        />
                    </View>
                    <AppLoader loading={isLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default Notification;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, innerContainer: {
        flexDirection: 'row', alignSelf: 'center',
    }, cardView: {
        height: hp(13),
        marginHorizontal: wp(5),
        borderRadius: wp(5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2),
    }, card1View: {flexDirection: 'row', justifyContent: 'space-between'}, dateStyle: {
        fontSize: hp(2.3), marginBottom: hp(0.5),
    }, statusStyle: {
        marginRight: wp(1), fontSize: hp(1.7),
    }, codeStyle: {
        fontSize: hp(1.8), marginBottom: hp(0.2),
    }, messageStyle: {
        fontSize: hp(1.8), marginBottom: hp(0.2),
    }, rightStyle: {
        width: wp(20), flexDirection: 'row', justifyContent: 'center', alignSelf: 'center',
    }, blueStyle: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(7),
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(2),
    }, countStyle: {
        alignSelf: 'center', fontSize: hp(1.8),
    }, requestApproval: {
        alignSelf: 'center', width: wp(55),
    }, header: {
        fontSize: wp(3.5),
    },
});
