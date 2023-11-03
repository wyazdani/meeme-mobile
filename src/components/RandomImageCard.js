import {
    StyleSheet, View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import React, {useMemo, useState} from 'react';

import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const RandomCard = ({style, item, onPressCard}) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    const [loading, setLoading] = useState(true);

    let type = item.post_type?.slice(0, 5);
    const image = type == 'video' ? item?.post_thumbnail || 'https://www.realfinityrealty.com/wp-content/uploads/2018/08/video-poster.jpg' : item?.compress_image || item?.post_image;

    const dummyImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

    return (<>

        <TouchableOpacity activeOpacity={0.9} onPress={onPressCard} zIndex={0}>
            {/* {console.log("item on ",JSON.stringify(item,null,2))} */}
            <FastImage
                key={item.id}
                style={[{flex: 1, margin: 10, borderRadius: wp(5)}, style]}
                source={{
                    uri: image,
                }}
                resizeMode="cover"
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
                    style={{
                        borderRadius: wp(5), width: wp(45), height: randomBool ? 150 : 280, justifyContent: 'flex-end',
                    }}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                >
                    <View style={styles.inner}>
                        <View style={styles.userImg}>
                            <FastImage
                                source={{
                                    uri: item?.user_image ? item?.user_image : dummyImg,
                                    priority: FastImage.priority.normal,
                                    cache: FastImage.cacheControl.immutable,
                                }}
                                style={styles.img}
                            />
                        </View>
                        <Text style={styles.textStyle} numberOfLines={2}>
                            {item?.username}
                        </Text>
                    </View>
                </LinearGradient>
            </FastImage>
        </TouchableOpacity>
        {loading ? (<View style={styles.indicatorStyle}>
            <ActivityIndicator color="white" size="small"/>
        </View>) : null}
    </>);
};

export default RandomCard;

const styles = StyleSheet.create({
    userImg: {
        width: wp(6), height: wp(6),
    }, inner: {
        flexDirection: 'row', alignItems: 'center', bottom: 15, left: 15,
    }, textStyle: {
        marginStart: 5, marginTop: 3, color: 'white', width: wp(30),
    }, img: {
        width: wp(6), height: wp(6), borderRadius: wp(6), resizeMode: 'cover', borderWidth: 1, borderColor: 'white',
    }, indicatorStyle: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', zIndex: -1,
    },
});
