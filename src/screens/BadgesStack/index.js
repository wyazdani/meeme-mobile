import {useFocusEffect} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import React, {useCallback, useState} from 'react';
import {
    ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, ImageBackground,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import DownArrow from '../../../assets/svgs/downArrow.svg';
import Filter from '../../../assets/svgs/filter.svg';
import Cross from '../../../assets/svgs/lightCross.svg';
import Search from '../../../assets/svgs/search.svg';
import UpArrow from '../../../assets/svgs/upArrow.svg';
import {HitApi} from '../../APIHits/APIHandler';
import {EARNED_BADGES, GET_LOCKED_BADGES} from '../../APIHits/urls';
import LockedBadge from '../../components/Cards/LockedBadge';
import Header from '../../components/Header';
import RNButton from '../../components/RNButton';
import {AppLoader} from '../../components/RNLoader';
import SearchInput from '../../components/SearchInput';
import {fonts} from '../../Themes/FontsConfig';
import {rarities} from '../../utiles/dummyData';
import LinearGradient from 'react-native-linear-gradient';
import {textColor} from '../../utiles/themeSelectot';

const OrganizeBadges = ({navigation}) => {
    const {
        badgesMargin,
        badgesBackground,
        badgeStyle,
        activityIndicator,
        badgesText,
        dialogStyle,
        modelBadgeImage,
        badgemainStyle,
        modelTitleStyle,
        modelDesStyle,
    } = styles;
    const {color} = useTheme();
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const {token} = useSelector((state) => state.authReducer);
    const font = fonts(fontChange);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [isIndex, setIsIndex] = useState(null);
    const [isChecks, setIsChecks] = useState({
        filter: false, badges: true, lock: true,
    });
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [lockedBadges, setLockedBadges] = useState([]);
    const [allLockedBadges, setAllLockedBadges] = useState([]);
    const [rarityFilter, setRarityFilter] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModel, setIsModel] = useState({isVisible: false, item: ''});

    const bgImage = theme_data?.bgImage;

    useFocusEffect(useCallback(() => {
        getLockedBadges();
        getEarnedBadges();
    }, [navigation]),);

    // locked badges
    const getLockedBadges = async () => {
        setIsLoading(true);
        let res = await HitApi(`${GET_LOCKED_BADGES}`, 'GET', '', token);
        if (res?.status == 200) {
            if (res?.data?.user_badges) {
                setLockedBadges(res?.data?.user_badges);
                setAllLockedBadges(res?.data?.user_badges);
                setIsLoading(false);
            }
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    // earned badges
    const getEarnedBadges = async () => {
        setIsLoading(true);
        let res = await HitApi(`${EARNED_BADGES}`, 'GET', '', token);
        if (res?.status == 200) {
            if (res?.data) {
                setEarnedBadges(res?.data?.user_badges);
                setIsLoading(false);
            }
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
        }
    };

    const onSelectedRarity = (item, index) => {
        setIsIndex(index);
        if (searchText != '') {
            if (index == 0) {
                setLockedBadges(rarityFilter);
            } else {
                let obj = rarityFilter.filter((i) => i?.rarity?.toLowerCase()?.indexOf(item?.ref?.toLowerCase()) > -1,);
                setLockedBadges(obj);
            }
        } else {
            if (index == 0) {
                setLockedBadges(allLockedBadges);
            } else {
                let obj = allLockedBadges.filter((i) => i?.rarity?.toLowerCase()?.indexOf(item?.ref?.toLowerCase()) > -1,);
                setLockedBadges(obj);
            }
        }
    };

    const renderEarnedBadges = ({item, index}) => {
        return (<TouchableOpacity
                style={badgesMargin}
                key={index}
                onPress={() => setIsModel({isVisible: true, item: item})}
            >
                <View key={index} style={badgesBackground}>
                    <FastImage
                        source={{uri: item?.badge_image}}
                        style={badgeStyle}
                        resizeMode="contain"
                    />
                    <View style={activityIndicator}>
                        <ActivityIndicator size="small" color={'black'}/>
                    </View>
                </View>
                <Text
                    numberOfLines={1}
                    style={[badgesText, {
                        fontFamily: font.regular, color: textColor(app_Theme, color?.white).text,
                    },]}
                >
                    {/* {`${item?.title?.substring(0, 10)} ...`} */}
                    {item?.title}
                </Text>
            </TouchableOpacity>);
    };

    const BadgesModel = () => {
        const {badge_image, title} = isModel?.item;
        return (<Dialog
                visible={isModel?.isVisible}
                dialogStyle={[dialogStyle, {backgroundColor: color?.g6}]}
                onTouchOutside={() => setIsModel({...isModel, isVisible: false})}
            >
                <View style={badgemainStyle}>
                    <ActivityIndicator
                        style={styles.activityIndicator1}
                        size="small"
                        color="white"
                    />

                    <FastImage
                        source={{uri: badge_image}}
                        style={modelBadgeImage}
                        resizeMode="contain"
                        onLoadStart={() => setImageLoading(true)}
                        onLoadEnd={() => setImageLoading(false)}
                        onLoad={() => setImageLoading(false)}
                    />
                </View>

                <Text
                    style={[modelTitleStyle, {
                        color: color.white, fontFamily: font.bold,
                    },]}
                    numberOfLines={2}
                >
                    {title}
                </Text>
                <Text
                    style={[modelDesStyle, {
                        fontFamily: font.regular, color: color.white,
                    },]}
                >
                    {`Congratulations!!! You have succesfully unlocked ${title}.`}
                </Text>
                <RNButton
                    clr1={color.linerClr1}
                    clr2={color.linerClr2}
                    textColor={color.bl1}
                    borderClr={'transparent'}
                    family={font.medium}
                    btnHeight={hp(5)}
                    btnWidth={hp(18)}
                    btnRadius={wp(10)}
                    title="Done"
                    borderWidth={1}
                    fontSize={wp(3.5)}
                    onPress={() => setIsModel({...isModel, isVisible: false})}
                />
            </Dialog>);
    };
    const onChangeText = (val) => {
        setSearchText(val);
        if (val == '' && isIndex == null) {
            setLockedBadges(allLockedBadges);
        }
        if (val == '' && isIndex != null) {
            setIsIndex(null);
            let obj1 = allLockedBadges?.filter((i) => i?.rarity
                ?.toLowerCase()
                ?.indexOf(rarities[isIndex].ref?.toLowerCase()) > -1,);
            setLockedBadges(obj1);
            // setRarityFilter(obj1);
        }
        if (val != '') {
            if (isIndex == null) {
                let obj = allLockedBadges?.filter((i) => i?.title?.toLowerCase()?.indexOf(val?.toLowerCase()) > -1,);
                setLockedBadges(obj);
                setRarityFilter(obj);
            } else {
                let obj = allLockedBadges?.filter((i) => i?.title?.toLowerCase()?.indexOf(val?.toLowerCase()) > -1 && i?.rarity
                    ?.toLowerCase()
                    ?.indexOf(rarities[isIndex]?.ref?.toLowerCase()) > -1,);
                setLockedBadges(obj);
                setRarityFilter(obj);
            }
        }
    };

    const icons = theme_data?.nav_bar;

    const btnIcon = () => {
        if (isChecks?.filter) {
            if (icons?.filter_cross) {
                return <SvgUri alignSelf={'center'} uri={icons?.filter_cross}/>;
            } else {
                return <Cross alignSelf="center"/>;
            }
        } else {
            if (icons?.filter) {
                return <SvgUri alignSelf={'center'} uri={icons?.filter}/>;
            } else {
                return <Filter alignSelf="center"/>;
            }
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
                    {BadgesModel()}
                    <Header
                        title="Organize Badges"
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        navigation={navigation}
                        fontSize={hp(2.2)}
                    />
                    <View style={styles.searchView}>
                        <SearchInput
                            svg={icons?.search ? (<SvgUri
                                    width={20}
                                    height={20}
                                    alignSelf={'center'}
                                    uri={icons?.search}
                                />) : (<Search alignSelf="center"/>)}
                            input={{
                                placeholder: 'Search by Badges or Rarity',
                                placeholderTextColor: color.g9,
                                onChangeText: onChangeText,
                            }}
                            inputStyle={[styles.inputStyle, {
                                color: textColor(app_Theme, color?.white).black, fontSize: hp(2),
                            },]}
                            containerStyle={{
                                backgroundColor: textColor(app_Theme, color?.g10).serachColor,
                                borderWidth: 1,
                                borderColor: color.borderClr,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsChecks({...isChecks, filter: !isChecks?.filter})}
                            style={[styles.filterView, {
                                backgroundColor: color.filter,
                                borderColor: app_Theme == 'ultra_rare4' ? color.borderClr : 'transparent',
                            },]}
                        >
                            {btnIcon()}
                        </TouchableOpacity>
                    </View>

                    {isChecks?.filter ? (<View style={{marginBottom: hp(3.5)}}>
                            <Text
                                style={{
                                    ...styles.trendingStyle, color: color.g2, fontFamily: font.bold,
                                }}
                            >
                                Filter
                            </Text>

                            <FlatList
                                horizontal={true}
                                data={rarities}
                                keyExtractor={(item, index) => `key-${index}${item}`}
                                style={{marginTop: hp(2), marginLeft: wp(5)}}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item, index}) => (<View style={{marginHorizontal: wp(1)}}>
                                        <RNButton
                                            clr1={isIndex == index ? color.linerClr1 : color?.transparent}
                                            clr2={isIndex == index ? color.linerClr2 : color?.transparent}
                                            textColor={isIndex == index ? color.bl1 : color.white}
                                            borderClr={isIndex == index ? 'transparent' : color.borderClr}
                                            onPress={() => onSelectedRarity(item, index)}
                                            family={isIndex == index ? font.medium : font.regular}
                                            btnHeight={hp(5)}
                                            btnWidth={hp(12)}
                                            btnRadius={wp(10)}
                                            title={item?.rarity}
                                            borderWidth={1}
                                            fontSize={wp(3.5)}
                                        />
                                    </View>)}
                                onEndReachedThreshold={0.1}
                            />
                        </View>) : null}

                    <View style={styles.earnedView}>
                        <Text
                            style={[styles.earnedTextStyle, {
                                fontFamily: font.bold, color: color.white,
                            },]}
                        >
                            Earned Badges
                        </Text>
                        <TouchableOpacity
                            style={{justifyContent: 'center'}}
                            onPress={() => setIsChecks({...isChecks, badges: !isChecks?.badges})}
                        >
                            {isChecks?.badges ? (<DownArrow alignSelf="center" width={wp(4)} height={hp(4)}/>) : (
                                <UpArrow alignSelf="center" width={wp(4)} height={hp(4)}/>)}
                        </TouchableOpacity>
                    </View>
                    {isChecks?.badges ? (<View style={[styles.badgesView, {backgroundColor: color.g6}]}>
                            {earnedBadges?.length > 0 ? (<FlatList
                                    data={earnedBadges}
                                    keyExtractor={(item, index) => `key-${index}${item}`}
                                    style={{marginTop: hp(2), margin: wp(5)}}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={4}
                                    renderItem={renderEarnedBadges}
                                />) : (<View style={styles.noBadge}>
                                    <Text style={{color: color.g3, fontFamily: font.medium}}>
                                        No Badge Earned Yet
                                    </Text>
                                </View>)}
                        </View>) : null}
                    <View style={[styles.earnedView, {marginTop: hp(5)}]}>
                        <Text
                            style={[styles.earnedTextStyle, {
                                fontFamily: font.bold, color: color.white,
                            },]}
                        >
                            Locked Badges
                        </Text>
                        <TouchableOpacity
                            style={{justifyContent: 'center'}}
                            onPress={() => setIsChecks({...isChecks, lock: !isChecks?.lock})}
                        >
                            {isChecks?.lock ? (<DownArrow alignSelf="center" width={wp(4)} height={hp(4)}/>) : (
                                <UpArrow alignSelf="center" width={wp(4)} height={hp(4)}/>)}
                        </TouchableOpacity>
                    </View>
                    {isChecks?.lock ? (<FlatList
                            data={isIndex == null && searchText == '' ? allLockedBadges : lockedBadges}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            showsVerticalScrollIndicator={false}
                            style={{marginHorizontal: wp(1)}}
                            numColumns={2}
                            renderItem={({item, index}) => (<LockedBadge index={index} item={item}/>)}
                        />) : null}
                    <AppLoader loading={isLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default OrganizeBadges;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }, searchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(5),
        marginVertical: hp(2),
        alignItems: 'center',
    }, filterView: {
        justifyContent: 'center', width: wp(14.5), borderRadius: wp(14.5), height: wp(14.5), borderWidth: 1,
    }, trendingStyle: {
        marginHorizontal: wp(5), marginTop: hp(0.7), fontSize: hp(1.8),
    }, inputStyle: {
        width: wp(58), fontSize: hp(2.2),
    }, earnedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: wp(10),
        marginRight: wp(6),
        marginBottom: hp(2),
        marginTop: hp(1),
    }, earnedTextStyle: {
        alignSelf: 'center', fontSize: hp(2.4),
    }, badgesView: {
        maxHeight: hp(30), borderRadius: wp(10), width: wp(96), alignSelf: 'center',
    }, badgesMargin: {
        marginHorizontal: wp(.8), alignSelf: 'center', justifyContent: 'center',
    }, badgesBackground: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(15),
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }, badgesText: {
        fontSize: hp(1.5), opacity: 0.5, marginVertical: hp(2), width: wp(20), textAlign: 'center',
    }, noBadge: {
        height: hp(8), justifyContent: 'center', alignItems: 'center',
    }, badgeStyle: {
        width: wp(12), height: hp(7.5), zIndex: 1,
    }, activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 0, justifyContent: 'center',
    }, dialogStyle: {
        maxHeight: hp(50), borderRadius: wp(10), borderWidth: 0.6, borderColor: 'white',
    }, modelBadgeImage: {
        width: wp(40), height: hp(15), alignSelf: 'center', marginVertical: hp(2),
    }, modelTitleStyle: {
        fontSize: wp(5.8), alignSelf: 'center', marginVertical: hp(2), textAlign: 'center',
    }, modelDesStyle: {
        textAlign: 'center', opacity: 0.5, fontSize: wp(5), marginBottom: hp(4),
    }, activityIndicator1: {
        position: 'absolute', alignSelf: 'center', zIndex: -1,
    }, badgemainStyle: {
        width: wp(40), height: hp(15), justifyContent: 'center', alignSelf: 'center',
    },
});
