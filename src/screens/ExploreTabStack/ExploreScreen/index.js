import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {
    Alert, FlatList, Keyboard, RefreshControl, ScrollView, Text, View, ImageBackground,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Search from '../../../../assets/svgs/search.svg';
import MainHeader from '../../../components/MainHeader';
import MasonryList from '@react-native-seoul/masonry-list';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {HitApi} from '../../../APIHits/APIHandler';
import {GETALLTAGS, TAGEXPLORE} from '../../../APIHits/urls';
import RandomImageCard from '../../../components/RandomImageCard';
import RNButton from '../../../components/RNButton';
import {AppLoader} from '../../../components/RNLoader';
import {fonts} from '../../../Themes/FontsConfig';
import {coinConvert} from '../../../utiles/export';
import SearchInput from '../../../components/SearchInput';
import RNDrive from '../../../components/RNDrive';
import LinearGradient from 'react-native-linear-gradient';
import {inputColor, textColor} from '../../../utiles/themeSelectot';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import Explorecard from '../../../components/Explorecard';
import { log } from 'react-native-reanimated';

const ExploreScreen =React.memo( ({navigation}) => {
    // console.log(">>>>>>>>>>explore screen");
    const isFocused = useIsFocused();
    const {color} = useTheme();
    const {fontChange, coins, counts, tempCoins, theme_data, app_Theme} = useSelector((state) => state.appReducer);
    const {token} = useSelector((state) => state.authReducer);
    const font = fonts(fontChange);
    const [isSelectTags, setIsSelectTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isTags, setIsTags] = useState([]);
    const [isPosts, setIsPosts] = useState([]);
    // console.log("isPosts",JSON.stringify(isPosts,null,2));
    const [isAllPosts, setIsAllPosts] = useState([]);

    //Start Pagination
    const [pageSize, setPageSize] = useState(1);

    //End Pagination

    const [isAllTags, setIsAllTags] = useState([]);
    const [isAllExplorePost, setIsAllExplorePost] = useState([]);

    const bgImage = theme_data?.bgImage;
    const icons = theme_data?.nav_bar;

    // const onPressCard = (item) => {
    //     navigation.navigate('ExploreTabStack', {
    //         screen: 'MemeDetailScreen', params: {
    //             item: item,
    //         },
    //     });
    // };

    useEffect(() => {
        // if (isFocused) {
            setIsLoading(true);
            setIsSelectTags([]);
            setSearchText(null);
            getAllTags();
            GetAllExplorePost(1);
        // }
    }, []);

    const GetAllExplorePost = async (size) => {
        setIsLoading(true);
        const data = new FormData();
        data.append('tag', isSelectTags.toString());
        let res = await HitApi(`${TAGEXPLORE}?page=${size}`, 'post', data, token);
    //   console.log("resposne on explore ",JSON.stringify(res,null,2));
        if (res?.status == 200) {
            if (res?.data?.explore_posts?.length != 0) {
                if (size == 1) {
                    setIsAllExplorePost(res?.data?.explore_posts);
                    setIsAllPosts(res?.data?.explore_posts);
                    setIsPosts(res?.data?.explore_posts);
                } else {
                    setIsAllExplorePost([...isAllExplorePost, ...res?.data?.explore_posts,]);
                    setIsAllPosts([...isAllPosts, ...res?.data?.explore_posts]);
                    setIsPosts([...isPosts, ...res?.data?.explore_posts]);
                }
            }
            setIsLoading(false);
            setLoading(false);
        } else {
            Alert.alert('Error', res?.message);
            setIsLoading(false);
            setLoading(false);
        }
    };

    //Start paginasion
    // useFocusEffect(useCallback(() => {
    //     if (isFocused) {
    //         setIsLoading(true);
    //         setIsPosts([]);

    //         setPageSize(1);
    //     }
    // }, [isFocused]),);

    const isScrollviewCloseToDown = ({
                                         layoutMeasurement, contentOffset, contentSize,
                                     }) => {
        const paddingToBottom = 20;
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom);
    };

    //End paginasion

    const getAllTags = () => {
        HitApi(GETALLTAGS, 'GET', '', token).then((res) => {
            if (res?.status == 200) {
                let temp = [];
                res?.data?.tags?.map((i) => {
                    temp.push({tag: i, select: false});
                });
                setIsTags(temp);
                setIsAllTags(temp);
            } else {
                Alert.alert('Error', res?.message);
            }
        });
    };

    // const ExploreFilter = async () => {
    //     const data = new FormData();
    //     data.append('tag', isSelectTags.toString());
    //     let res = await HitApi(TAGEXPLORE, 'post', data, token);
    //     if (res?.status == 200) {
    //         setIsAllPosts(res?.data?.explore_posts);

    //         if (isSelectTags.length < 1 && searchText != null) {
    //             console.log("if called");
    //             let term = searchText?.toLowerCase();
    //             console.log("term",term);
    //             let obj = isAllExplorePost?.filter((item) => item?.post?.duplicate_tags?.indexOf(searchText) > -1 || item?.username?.toLowerCase()?.indexOf(term) > -1,);
    //             console.log("obj",obj);
    //             setIsPosts(obj);
    //             setIsLoading(false);
    //         } else {
    //             console.log("elase called");
    //             setIsPosts(res?.data?.explore_posts);
    //             setIsLoading(false);
    //         }
    //     } else {
    //         Alert.alert('Alert', res?.message);
    //         setIsLoading(false);
    //     }
    // };
    const ExploreFilter = async () => {
            if (isSelectTags.length > 0 ) {
                const obj = isAllExplorePost.filter(item => {
                    if (item?.post) {
                      return item?.post?.duplicate_tags?.some(value => isSelectTags.includes(value));
                    }
                    return false;
                  });
                setIsPosts(obj);
                setIsLoading(false);
            } else {
                setIsPosts(isAllPosts);
                setIsLoading(false);
            }
     
    };
    // const renderItem = useMemo(() => ({item, index}) => {
    //     return (<RandomImageCard
    //         onPressCard={() => onPressCard(item)}
    //         item={item}
    //         index={index}
    //     />);
    // }, [isPosts],);

    return (<LinearGradient
        colors={[color.bgColor1, color.bgColor2]}
        style={styles.mainContainer}
        start={{y: 0, x: 0}}
        end={{y: 1, x: 0}}
    >
        <ImageBackground
            source={// theme_data ? require('../../../../assets/background.jpg') : null
                {uri: bgImage}}
            style={styles.mainContainer}
            resizeMode="cover"
        >
            <View style={styles.headerStyle}>
                <MainHeader
                    plusOnPress={() => {
                        Keyboard.dismiss();
                        setTimeout(() => {
                            navigation.navigate('BuyCoins');
                        }, 200);
                    }}
                    text="Explore"
                    coins={coinConvert(tempCoins) || 0}
                    storeOnPress={() => {
                        Keyboard.dismiss();
                        setTimeout(() => {
                            navigation.navigate('StoreScreen');
                        }, 200);
                    }}
                    notiOnPress={() => {
                        Keyboard.dismiss();
                        setTimeout(() => {
                            navigation.navigate('ActivitiesScreen');
                        }, 200);
                    }}
                    showRedDot={counts ? true : false}
                />
            </View>
            <RNDrive borderClr={color.g10}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={(e) => {
                    if (isScrollviewCloseToDown(e.nativeEvent)) {
                        GetAllExplorePost(pageSize + 1);
                        setPageSize(pageSize + 1);
                    }
                }}
                refreshControl={<RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        setLoading(true);
                        setPageSize(1);
                        // GetAllExplorePost(pageSize+1);
                    }}
                />}
            >
                <View style={styles.searchStyle}>
                    <SearchInput
                        svg={icons?.search ? (<SvgUri
                            width={20}
                            height={20}
                            alignSelf={'center'}
                            uri={icons?.search}
                        />) : (<Search alignSelf="center"/>)}
                        input={{
                            placeholder: 'Search by Hashtags or UserNames',
                            placeholderTextColor: color.g9,
                            value: searchText,
                            onChangeText: (text) => {
                                setSearchText(text);
                                setIsSelectTags([]);
                                let term = text?.toLowerCase();
                                let obj1 = isAllTags.filter((item) => item?.tag?.toLowerCase()?.indexOf(term) > -1,);
                                let obj = isAllExplorePost.filter((item) => item?.post?.duplicate_tags?.indexOf(text) > -1 || item?.username?.toLowerCase()?.indexOf(term) > -1,);
                                setIsTags(obj1);
                                setIsPosts(obj);
                            },
                        }}
                        inputStyle={{
                            width: wp(75), color: inputColor(app_Theme), fontSize: hp(2),
                        }}
                        containerStyle={{
                            backgroundColor: textColor(app_Theme, color?.g10).serachColor,
                            marginHorizontal: wp(5),
                            borderRadius: wp(100),
                            borderWidth: 1,
                            borderColor: color.borderClr,
                        }}
                    />
                </View>
                <Text
                    style={{
                        ...styles.trendingStyle, color: color.g2, fontFamily: font.bold,
                    }}
                >
                    Trending Tags
                </Text>
                {/* Trending Tags */}
                <View>
                    <FlatList
                        horizontal={true}
                        data={isTags}
                        keyExtractor={(item, index) => `key-${index}${item}`}
                        style={{marginTop: hp(2), marginLeft: wp(5)}}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (<View
                            style={{marginHorizontal: wp(1), marginVertical: hp(1)}}
                        >
                            <RNButton
                                clr1={item?.select ? color.linerClr1 : color.transparent}
                                clr2={item?.select ? color.linerClr2 : color.transparent}
                                textColor={item?.select ? color.bl1 : color.white}
                                borderClr={item?.select ? 'transparent' : color.borderClr}
                                onPress={() => {
                                    let tempArray = JSON.parse(JSON.stringify(isTags));

                                    if (!item.select) {
                                        tempArray[index].select = true;
                                        setIsTags([...tempArray]);
                                        isSelectTags.push(item?.tag);
                                        setIsSelectTags(isSelectTags);
                                    } else {
                                        tempArray[index].select = false;
                                        setIsTags([...tempArray]);
                                        const ind = isSelectTags.indexOf(item?.tag);
                                       
                                        if (ind > -1) {
                                            // only splice array when item is found
                                            isSelectTags.splice(ind, 1); // 2nd parameter means remove one item only
                                           
                                        }

                                        setIsSelectTags(isSelectTags);
                                    }
                                    ExploreFilter(index, item?.tag);
                                }}
                                family={item?.select ? font.medium : font.regular}
                                btnHeight={hp(6)}
                                btnRadius={wp(10)}
                                title={item?.tag}
                                borderWidth={1}
                                padding={wp(3)}
                            />
                        </View>)}
                        onEndReachedThreshold={0.1}
                    />
                </View>
                {/* Random Images */}
                <Explorecard isPosts={isPosts} navigation={navigation}/>
                {/* {isPosts.length == 0 ? (<View style={{height: hp(45), justifyContent: 'center'}}>
                    <Text
                        style={{
                            alignSelf: 'center', color: color.g1, fontFamily: font.medium,
                        }}
                    >
                        Record not found
                    </Text>
                </View>) : (<MasonryList
                    data={isPosts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={styles.randomContainer}
                    renderItem={renderItem}
                />)} */}
            </ScrollView>
            <AppLoader loading={isLoading}/>
        </ImageBackground>
    </LinearGradient>);
});

export default ExploreScreen;

const styles = {
    mainContainer: {
        flex: 1,
    }, headerStyle: {
        height: hp(8), justifyContent: 'center', marginHorizontal: wp(5),
    }, searchStyle: {
        height: hp(10), justifyContent: 'center', borderRadius: wp(10),
    }, trendingStyle: {
        marginHorizontal: wp(5), marginTop: hp(0.7), fontSize: hp(2.1),
    }, btnStyle: {
        height: hp(6), borderRadius: wp(10), borderWidth: 0.5, marginHorizontal: wp(3), justifyContent: 'center',
    }, btnTextStyle: {
        marginHorizontal: wp(8), alignSelf: 'center', fontSize: hp(2),
    }, flatListViewStyle: {
        height: hp(10), justifyContent: 'center', alignSelf: 'center',
    }, randomContainer: {
        marginTop: hp(2), marginBottom: hp(10),
    }, contentContainerStyle: {
        flexGrow: 1,
    },
};
