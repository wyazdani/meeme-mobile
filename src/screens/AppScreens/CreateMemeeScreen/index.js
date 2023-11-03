import React, {useEffect, useState} from 'react';
import {
    Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import {PESDK} from 'react-native-photoeditorsdk';
import {VESDK} from 'react-native-videoeditorsdk';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Edit from '../../../../assets/svgs/edit.svg';
import {HitApi} from '../../../APIHits/APIHandler';
import {GETALLTAGS, POST, STORIES, UPDATEPOST} from '../../../APIHits/urls';
import Header from '../../../components/Header';
import RNButton from '../../../components/RNButton';
import RNDrive from '../../../components/RNDrive';
import RNInput from '../../../components/RNInputField';
import {fonts} from '../../../Themes/FontsConfig';

import {FlatList} from 'react-native';

const CreateMemee = ({navigation, route}) => {
    if (Platform.OS == 'android') {
        PESDK.unlockWithLicense(require('../../../utiles/imgly/pesdk_android_license.json'),);
        VESDK.unlockWithLicense(require('../../../utiles/imgly/vesdk_android_license.json'),);
    } else {
        PESDK.unlockWithLicense(require('../../../utiles/imgly/pesdk_ios_license.json'),);
        VESDK.unlockWithLicense(require('../../../utiles/imgly/vesdk_ios_license.json'),);
    }

    const {item} = route?.params;

    const {token} = useSelector((state) => state.authReducer);
    const {color} = useTheme();
    const {fontChange, theme_data} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const [isImage, setIsImage] = useState(item?.img);
    console.log("isImage",isImage)
    const [isLoading, setIsLoading] = useState(false);
    const [des, setDes] = useState(item?.des);
    const [isTags, setIsTags] = useState(item?.tags);
    const [isShowTags, setIsShowTags] = useState([]);
    const [tags, setTags] = useState('');

    const bgImage = theme_data?.bgImage;

    let type = item?.img?.type.split('/')[0];

    const selectAndEdittheImage = () => {
        // Set up sample image
        let image = {uri: isImage?.uri};
        let video = {uri: isImage?.uri};
        // Set up configuration

        let configuration = {
            // Configure sticker tool
            sticker: {
                // Enable personal stickers
                personalStickers: true, // Configure sticker library
                categories: [// Create sticker category with stickers
                    {
                        identifier: 'example_sticker_category_logos', name: 'Logos',
                    }, // Use existing sticker category
                    {identifier: 'imgly_sticker_category_emoticons'}, // Modify existing sticker category
                    {
                        identifier: 'imgly_sticker_category_shapes',
                        items: [{identifier: 'imgly_sticker_shapes_badge_01'}, {identifier: 'imgly_sticker_shapes_arrow_02'}, {identifier: 'imgly_sticker_shapes_spray_03'},],
                    },],
            }, enableZoom: true,
        };

        if (type == 'video') {
            VESDK.openEditor(video, configuration).then((result) => {
                if (result?.hasChanges) {
                    setIsImage({
                        type: 'video/mp4', uri: result?.video, name: 'video',
                    });
                }
            }, (error) => {
                Alert.alert(error);
                return error;
            },);
        } else {
            PESDK.openEditor(image, configuration).then((result) => {
                console.log("result >>",result);
                if (result?.hasChanges) {
                    console.log("result?.image",result?.image);
                    setIsImage({
                        type: 'image/jpeg', uri: result?.image, name: 'image',
                    });
                }
            }, (error) => {
                Alert.alert(error);
                return error;
            },);
        }
    };

    const createPost = () => {
        setIsLoading(true);
        let img = {
            type: type == 'video' ? 'video/mp4' : 'image/jpg',
            uri: isImage?.uri,
            name: type == 'video' ? 'video' : 'image',
        };
        console.log("img",img);
        if (isImage.uri == null) {
            Alert.alert('Alert', 'upload image');
            setIsLoading(false);
        } else {
            const data = new FormData();
            data.append('description', des);
            data.append('tag_list', isTags);
            data.append('post_image', img);
            let obj = {};

            if (item?.check == 'editMemee') {
                data.append('post_id', item?.postId);
                obj = {url: UPDATEPOST, method: 'PUT'};
            } else {
                obj = {url: POST, method: 'POST'};
            }

            HitApi(obj?.url, obj.method, data, token)
                .then((res) => {
                    console.log("res",res);
                    if (res?.status == 200) {
                        navigation.navigate('BottomTab', {screen: 'Home'});
                        Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
                    } else {
                        Alert.alert('Error>>>', res?.message);
                    }
                    setIsLoading(false);
                })
                .catch((e) => {
                    let {message} = e;
                    setIsLoading(false);
                    Alert.alert('Error', message);
                });
        }
    };

    const addStory = () => {
        setIsLoading(true);
        const data = new FormData();
        data.append('description', des);
        data.append('story_image', isImage);
        HitApi(STORIES, 'POST', data, token).then((res) => {
            if (res?.status == 200) {
                navigation.goBack();
            } else {
                Alert.alert('Error', res?.message);
            }
            setIsLoading(false);
        });
    };

    const deleteTag = (index) => {
        setIsTags([...isTags.slice(0, index), ...isTags.slice(index + 1)]);
    };

    const getAllTags = () => {
        HitApi(GETALLTAGS, 'GET', '', token).then((res) => {
            if (res?.status == 200) {
                let temp = [];
                res?.data?.tags?.map((i) => {
                    temp.push({tag: i, select: false});
                });
                setIsShowTags(temp);
            } else {
                Alert.alert('Error', res?.message);
            }
        });
    };

    useEffect(() => {
        getAllTags();
    }, []);

    const RenderSuggestionTags = () => {
        if (isShowTags.length != 0) {
            if (item?.check != 'story') {
                return (<>
                    <Text
                        style={{
                            marginTop: hp(3),
                            marginHorizontal: wp(5),
                            fontSize: wp(5),
                            fontFamily: font.bold,
                            color: color.white,
                        }}
                    >
                        Suggestion tags
                    </Text>
                    <View>
                        <FlatList
                            horizontal={true}
                            data={isShowTags}
                            keyExtractor={(item, index) => `key-${index}${item}`}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => (<View
                                style={{
                                    marginHorizontal: wp(1), marginVertical: hp(1),
                                }}
                            >
                                <RNButton
                                    clr1={item?.select ? color.linerClr1 : color.transparent}
                                    clr2={item?.select ? color.linerClr2 : color.transparent}
                                    textColor={item?.select ? color.bl1 : color.white}
                                    borderClr={item?.select ? 'transparent' : color.borderClr}
                                    onPress={() => {
                                        let tempArray = JSON.parse(JSON.stringify(isShowTags));
                                        if (!item.select) {
                                            tempArray[index].select = true;
                                            isTags.push(item?.tag);
                                            setIsTags(isTags);
                                            setIsShowTags([...tempArray]);
                                        } else {
                                            tempArray[index].select = false;
                                            setIsShowTags([...tempArray]);

                                            let temp = isTags?.filter((i, index) => i != item?.tag,);
                                            setIsTags(temp);
                                        }
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
                </>);
            }
        }
    };

    return (<View style={{flex: 1, backgroundColor: color.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={{flex: 1}}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={{flex: 1}}
                resizeMode="cover"
            >
                <Header
                    title={item?.check == 'story' ? 'Add Story' : item?.check == 'editMeme' ? 'Edit Memee' : 'Create Meme'}
                    marginRight={30}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    fontSize={hp(2.2)}
                    rightText="a"
                    isLoading={isLoading}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <>
                        <View style={styles.desView}>
                            <RNInput
                                marginBottom={0}
                                marginVertical={hp(-1)}
                                input={{
                                    placeholder: `${item?.check == 'Story' ? 'Story' : 'Post'} Description...`,
                                    onChangeText: (text) => setDes(text),
                                    editable: !isLoading,
                                    value: des,
                                    multiline: true,
                                    maxLength: 500,
                                }}
                            />
                        </View>
                        {item?.check == 'story' ? null : (<View style={{marginHorizontal: wp(5)}}>
                            <TextInput
                                placeholder="Tags"
                                placeholderTextColor={color.g17}
                                style={{
                                    color: color.white, fontFamily: font.regular, ...styles.tagInputStyle,
                                }}
                                numberOfLines={1}
                                editable={!isLoading}
                                onChangeText={(t) => {
                                    if (/\s/.test(t) && Platform.OS == 'ios') {
                                        setTags('');
                                    } else {
                                        setTags(t);
                                    }
                                }}
                                value={tags}
                                onKeyPress={(res) => {
                                    if (res.nativeEvent.key == ' ') {
                                        let temp = isTags;
                                        temp.push(`#${tags.trim('')}`);
                                        setIsTags(temp);
                                        setTags('');
                                    }
                                }}
                            />
                            <RNDrive borderClr={color.g10} borderWidth={0.7}/>

                            {isTags.length == 0 ? null : (<View style={styles.tagsShowView}>
                                {isTags.map((tag, index) => {
                                    return (<View
                                        key={`${tag}-${index}`}
                                        style={{
                                            ...styles.tagsView, borderColor: color.g8, backgroundColor: color.gr,
                                        }}
                                    >
                                        {/* <TouchableOpacity
                          disabled={true}
                          onPress={() => deleteTag(index)}
                          style={{ justifyContent: 'center' }}>
                          <Cross alignSelf="center" width={wp(3)} height={wp(3)} />
                        </TouchableOpacity> */}
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    alignSelf: 'center',
                                                    marginHorizontal: wp(3),
                                                    color: color.white,
                                                    fontFamily: font.regular,
                                                    fontSize: wp(3.4),
                                                }}
                                            >
                                                {tag}
                                            </Text>
                                        </View>
                                    </View>);
                                })}
                            </View>)}
                        </View>)}
                    </>
                    {RenderSuggestionTags()}

                    <View
                        style={{
                            ...styles.imageView, height: item?.check == 'story' ? hp(68) : hp(65),
                        }}
                    >
                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={selectAndEdittheImage}
                            style={styles.editBtnStyle}
                        >
                            <Edit alignSelf="center"/>
                            <Text
                                style={{
                                    ...styles.selectStyle, fontFamily: font.regular, color: color.white,
                                }}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>

                        {type == 'video' ? (<Video
                            source={{uri: isImage?.uri}}
                            poster={isImage?.uri}
                            style={styles.imageStyle}
                            paused={true}
                            muted={false}
                            resizeMode={'contain'}
                        />) : (<FastImage
                            source={{uri: isImage?.uri}}
                            style={[styles.imageStyle]}
                            resizeMode="contain"
                        />)}
                        <View style={styles.postBtnStyle}>
                            <RNButton
                                isLoading={isLoading}
                                clr1={color.linerClr1}
                                clr2={color.linerClr2}
                                textColor={color.bl1}
                                family={font.bold}
                                btnWidth={wp(90)}
                                btnHeight={hp(7.5)}
                                btnRadius={wp(10)}
                                title={item?.check == 'story' ? 'Post Story' : item?.check == 'editMeme' ? 'Edit Meme' : 'Post Meme'}
                                onPress={() => {
                                    setIsLoading(true);
                                    if (item?.check == 'story') {
                                        addStory();
                                    } else {
                                        createPost();
                                    }
                                }}
                                borderClr="transparent"
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default CreateMemee;

const styles = StyleSheet.create({
    imageView: {
        marginVertical: hp(0.5), justifyContent: 'center', width: wp(100)
    }, selectStyle: {
        alignSelf: 'center', fontSize: hp(1.8), marginHorizontal: wp(2.2),
    }, imageStyle: {
        alignSelf: 'center', zIndex: -1, width: undefined, height: undefined, aspectRatio: 0.95, flex: 1,
    }, desView: {
        marginHorizontal: wp(5), marginBottom: hp(1),
    }, tagInputStyle: {
        fontSize: hp(2), width: wp(73), height: hp(6),
    }, tagTextSylse: {
        marginVertical: hp(2), fontSize: hp(1.4),
    }, tagsShowView: {
        flexDirection: 'row', flexWrap: 'wrap',
    }, tagsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: wp(1.5),
        marginTop: hp(1),
        borderWidth: 1,
        padding: 4,
        marginHorizontal: wp(0.3),
    },

    editBtnStyle: {
        position: 'absolute',
        flexDirection: 'row',
        top: 5,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: wp(19),
        justifyContent: 'center',
        borderRadius: wp(15),
        height: hp(3.5),
        zIndex: 1,
    }, postBtnStyle: {position: 'absolute', bottom: 0, left: 0, right: 0},
});
