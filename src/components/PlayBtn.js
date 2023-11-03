import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const PlayBtn = ({btnStyle, imgStyle, isPlay, onPress}) => {
    return (
        <TouchableOpacity style={{...btnStyle}} onPress={onPress}>
            {isPlay ? (
                <Image
                    source={require('../../assets/pngs/playBtn.png')}
                    style={{...imgStyle}}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    source={require('../../assets/pngs/pause.png')}
                    style={{...imgStyle}}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );
};

export default PlayBtn;

const styles = StyleSheet.create({});
