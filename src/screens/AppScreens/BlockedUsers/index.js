import {
    Alert, StyleSheet, Text, View, FlatList, ImageBackground,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../../components/Header';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import SearchInput from '../../../components/SearchInput';
import {inputColor, textColor} from '../../../utiles/themeSelectot';
import Search from '../../../../assets/svgs/search.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {fonts} from '../../../Themes/FontsConfig';
import FollList from '../../../components/FollList';
import {BLOCK_USER} from '../../../APIHits/urls';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';
import {AppLoader} from '../../../components/RNLoader';

const BlockedUsers = ({navigation}) => {
    const {token} = useSelector((state) => state.authReducer);
    const {theme_data, app_Theme, fontChange} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);
    const {color} = useTheme();
    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    const [isSearch, setIsSearch] = useState('');
    const [isList, setIsList] = useState({permList: [], tempList: []});
    const [isLoading, setIsLoading] = useState({
        mainLoading: false, listLoading: false,
    });
    const [isSize, setIsSize] = useState(1);

    useFocusEffect(useCallback(() => {
        getAllBlockedUsers(1);
    }, [navigation]),);

    const getAllBlockedUsers = async (size) => {
        setIsLoading({...isLoading, mainLoading: true});
        let res = await HitApi(`${BLOCK_USER}?page=${isSize}`, 'get', '', token);
        console.log('get blocked users--', res);
        if (res?.status == 200) {
            if (res?.data?.blocked_user_details?.length != 0) {
                if (size == 1) {
                    setIsList({
                        permList: res?.data?.blocked_user_details, tempList: res?.data?.blocked_user_details,
                    });
                } else {
                    setIsList({
                        permList: [...isList, ...res?.data?.blocked_user_details],
                        tempList: [...isList, ...res?.data?.blocked_user_details],
                    });
                }
            } else {
                setIsList({
                    permList: res?.data?.blocked_user_details, tempList: res?.data?.blocked_user_details,
                });
            }
            setIsLoading({...isLoading, mainLoading: false});
        } else {
            setIsLoading({...isLoading, mainLoading: false});
            Alert.alert('Error', res?.message);
        }
    };

    const onChangeText = (text) => {
        setIsSearch(text);
        let t = text.toLowerCase();
        let obj = isList?.permList?.filter((i) => i?.username?.toLowerCase()?.indexOf(t) > -1,);
        setIsList({...isList, tempList: obj});
    };

    const onPressUnBlock = async (id) => {
        setIsLoading({...isLoading, mainLoading: true});
        let res = await HitApi(`${BLOCK_USER}/${id}`, 'delete', '', token);
        if (res?.status == 200) {
            setIsLoading({...isLoading, mainLoading: false});
            getAllBlockedUsers(1);
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
        } else {
            setIsLoading({...isLoading, mainLoading: false});
            Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
        }
    };

    const onPressUserProfile = (id) => {
        navigation.navigate('OtherUserProfile', {
            item: id,
        });
    };

    const renderItem = ({item}) => {
        return (<FollList
                item={item}
                unBlockButton={true}
                disabled={true}
                onPressUnBlock={() => onPressUnBlock(item?.id)}
                onPressUserProfile={() => onPressUserProfile(item?.id)}
            />);
    };

    const onRefresh = () => {
        setIsLoading({...isLoading, listLoading: true});
        setIsSize(1);
        getAllBlockedUsers(1);
    };

    return (<View style={[styles.main, {backgroundColor: color?.bgColor}]}>
            <LinearGradient
                colors={[color.bgColor1, color.bgColor2]}
                style={styles.main}
                start={{y: 0, x: 0}}
                end={{y: 1, x: 0}}
            >
                <ImageBackground
                    source={// theme_data ? require('../../../../assets/background.jpg') : null
                        {uri: bgImage}}
                    style={styles.main}
                    resizeMode="cover"
                >
                    <Header
                        title={'Blocked Users'}
                        isLeftIcon
                        isCenterText
                        isRightIcon
                        fontSize={hp(2.2)}
                        navigation={navigation}
                    />
                    <View
                        style={[styles.searchStyle, {
                            backgroundColor: textColor(app_Theme, color?.g10).serachColor,
                            borderWidth: 1,
                            borderColor: app_Theme == 'ultra_rare4' ? color.borderClr : null,
                        },]}
                    >
                        <SearchInput
                            svg={icons?.search ? (<SvgUri
                                    width={20}
                                    height={20}
                                    alignSelf={'center'}
                                    uri={icons?.search}
                                />) : (<Search alignSelf="center"/>)}
                            input={{
                                placeholder: 'Search By UserName',
                                placeholderTextColor: color.g9,
                                value: isSearch,
                                onChangeText: onChangeText,
                            }}
                            inputStyle={[styles.inputStyle, {color: inputColor(app_Theme)}]}
                            containerStyle={[styles.containerStyle, {
                                backgroundColor: textColor(app_Theme, color?.g10).serachColor,
                                borderWidth: 1,
                                borderColor: app_Theme == 'ultra_rare4' ? color.borderClr : null,
                            },]}
                        />
                    </View>

                    {isList?.permList?.length == 0 ? (<View style={styles.messageViewStyle}>
                            <Text
                                style={[styles.messageTextStyle, {color: color.white, fontFamily: font.medium},]}
                            >
                                No record found
                            </Text>
                        </View>) : (<View style={styles.flatListStyle}>
                            <FlatList
                                data={isList?.tempList}
                                renderItem={renderItem}
                                onRefresh={onRefresh}
                                refreshing={isLoading.listLoading}
                                onEndReachedThreshold={0}
                                onEndReached={() => {
                                    if (isList?.tempList?.length > 20) {
                                        setIsSize(isSize + 1);
                                        getAllFollowings(isSize + 1);
                                    }
                                }}
                            />
                        </View>)}
                    <AppLoader loading={isLoading.mainLoading}/>
                </ImageBackground>
            </LinearGradient>
        </View>);
};

export default BlockedUsers;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, searchStyle: {
        height: hp(7), justifyContent: 'center', marginHorizontal: wp(5.5), borderRadius: wp(100), marginTop: hp(1),
    }, inputStyle: {
        width: wp(65), fontSize: hp(2.2),
    }, containerStyle: {
        marginHorizontal: wp(5), backgroundColor: 'yellow',
    }, flatListStyle: {
        marginTop: hp(3),
    }, messageViewStyle: {
        flex: 0.8, justifyContent: 'center',
    }, messageTextStyle: {
        alignSelf: 'center',
    },
});
