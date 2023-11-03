import React, {useState} from 'react';
import {
    ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

const VideoPlay = ({route, navigation}) => {
    const {color} = useTheme();
    const [state, setState] = useState({isPlay: false, isLoading: true});
    const {item} = route?.params;
    return (<View
        style={{
            flex: 1, backgroundColor: color.bgColor,
        }}
    >
        {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          right: wp(5),
          top: hp(5),
          justifyContent: 'center',
          width: wp(10),
          height: wp(10),
          borderRadius: wp(10),
        }}
      >
        <Cross alignSelf="center" />
      </TouchableOpacity> */}
        <View style={{alignSelf: 'flex-end', zIndex: 1}}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
        </View>

        <Video
            source={{uri: item}}
            style={styles.postImageStyle}
            paused={false}
            muted={false}
            onBuffer={() => {
                setState({...state, isLoading: true});
            }}
            resizeMode="contain"
            onLoad={() => {
                setState({...state, isLoading: false});
            }}
            controls={true}
            fullScreen={true}
        />

        <ActivityIndicator
            style={styles.activityIndicator}
            animating={state?.isLoading}
        />
    </View>);
};

export default VideoPlay;

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    }, root: {
        alignItems: 'flex-end',
    }, postImageStyle: {
        position: 'absolute', width: wp(100), height: hp(100), zIndex: 0,
    }, closeButton: {
        marginRight: 8,
        marginTop: 8,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: '#00000077',
    }, closeText: {
        lineHeight: 22, fontSize: 19, textAlign: 'center', color: '#FFF', includeFontPadding: false,
    },
});
