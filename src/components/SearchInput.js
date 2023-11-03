import {
    StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchInput = ({svg, onPress, input, inputStyle, containerStyle}) => {
    return (<View activeOpacity={0.9} style={[styles.container, {...containerStyle}]}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.svgStyle}>{svg}</View>
        </TouchableOpacity>
        <TextInput {...input} style={inputStyle}/>
    </View>);
};

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        height: hp(7), flexDirection: 'row', alignItems: 'center', borderRadius: wp(8),
    }, svgStyle: {
        marginStart: '10%',
    },
});
