import {
    StyleSheet, View, FlatList, Alert, Text, ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';

import FHeader from '../../../components/FHeader';
import BackIcon from '../../../../assets/svgs/arrow-left.svg';
import Search from '../../../../assets/svgs/search.svg';
import SearchInput from '../../../components/SearchInput';
import {fonts} from '../../../Themes/FontsConfig';
import FollList from '../../../components/FollList';
import {HitApi} from '../../../APIHits/APIHandler';
import {FOLLWER_LIST} from '../../../APIHits/urls';
import {AppLoader} from '../../../components/RNLoader';

import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';
import {inputColor, textColor} from '../../../utiles/themeSelectot';

const FollowingList = ({navigation}) => {
    const {
        inputStyle, containerStyle, searchStyle, container, flatlistStyle, messageViewStyle, messageTextStyle,
    } = styles;

    const {color} = useTheme();
    const {token} = useSelector((state) => state.authReducer);
    const {fontChange, theme_data, app_Theme} = useSelector((state) => state.appReducer,);
    const font = fonts(fontChange);

    const [isLoading, setIsLoading] = useState({
        mainLoading: false, listLoading: false,
    });
    const [isSize, setIsSize] = useState(1);
    const [isList, setIsList] = useState({permList: [], tempList: []});
    const [isSearch, setIsSearch] = useState('');

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    useEffect(() => {
        getAllFollowings(1);
    }, []);

    const getAllFollowings = async (size) => {
        setIsLoading({...isLoading, mainLoading: true});
        let res = await HitApi(`${FOLLWER_LIST + isSize}&key=followings`, 'get', '', token,);

        if (res?.status == 200) {
            if (res?.data?.followings?.length != 0) {
                if (size == 1) {
                    setIsList({
                        permList: res?.data?.followings, tempList: res?.data?.followings,
                    });
                } else {
                    setIsList({
                        permList: [...isList, ...res?.data?.followings],
                        tempList: [...isList, ...res?.data?.followings],
                    });
                }
            }
            setIsLoading({...isLoading, mainLoading: false});
        } else {
            setIsLoading({...isLoading, mainLoading: false});
            Alert.alert('Error', res?.message);
        }
    };

    const followingPress = (id) => {
        navigation.navigate('OtherUserProfile', {
            item: id,
        });
    };

    const renderItem = ({item}) => {
        return <FollList item={item} onPressUserProfile={() => followingPress(item?.following_user_detail?.id)}

        />;
    };

    const onChangeText = (text) => {
        setIsSearch(text);
        let t = text.toLowerCase();
        let obj = isList?.permList?.filter((i) => i?.following_user_detail?.username?.toLowerCase()?.indexOf(t) > -1,);
        setIsList({...isList, tempList: obj});
    };

    const onRefresh = () => {
        setIsLoading({...isLoading, listLoading: true});
        setIsSize(1);
        getAllFollowings(1);
    };

    return (<View style={[container, {backgroundColor: color.bgColor}]}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.container}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={styles.container}
                resizeMode="cover"
            >
                <FHeader
                    leftIcon={icons?.back ? (<SvgUri alignSelf="center" uri={icons?.back}/>) : (
                        <BackIcon alignSelf="center"/>)}
                    headerText="Following List"
                    navigation={navigation}
                />
                <View
                    style={[searchStyle, {
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
                        inputStyle={[inputStyle, {
                            color: inputColor(app_Theme),
                        },]}
                        containerStyle={[containerStyle, {
                            backgroundColor: textColor(app_Theme, color?.g10).serachColor,
                        },]}
                    />
                </View>
                {isList?.permList?.length == 0 ? (<View style={messageViewStyle}>
                    <Text
                        style={[messageTextStyle, {
                            color: color.white, fontFamily: font.medium,
                        },]}
                    >
                        No record found
                    </Text>
                </View>) : (<View style={flatlistStyle}>
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

export default FollowingList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, searchStyle: {
        height: hp(7), justifyContent: 'center',

        marginHorizontal: wp(4.5), borderRadius: wp(100),
    }, inputStyle: {
        width: wp(65), fontSize: hp(2.2),
    }, containerStyle: {
        marginHorizontal: wp(5),
    }, flatlistStyle: {
        marginTop: hp(3),
    }, messageViewStyle: {
        flex: 0.8, justifyContent: 'center',
    }, messageTextStyle: {
        alignSelf: 'center',
    },
});
