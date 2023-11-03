import * as React from 'react';
import {
    TextInput, StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {fonts} from '../Themes/FontsConfig';
import RNDrive from './RNDrive';

const RNInput = ({
                     title, svg, onPress, isSecure, marginVertical, editable, input, marginBottom = hp(1),
                 }) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {color} = useTheme();
    return (<View style={{marginVertical: marginVertical}}>
        <Text
            style={{
                fontFamily: font.bold, fontSize: hp(1.2), color: color.g2, marginBottom: marginBottom,
            }}
            numberOfLines={1}
        >
            {title}
        </Text>
        <View
            style={{
                flexDirection: 'row', justifyContent: 'space-between',
            }}
        >
            <TextInput
                {...input}
                autoComplete="off"
                placeholderTextColor={color.g17}
                style={{
                    color: color.white, fontFamily: font.regular, fontSize: hp(2), width: wp(73), minHeight: hp(5),
                }}
                secureTextEntry={isSecure}
                editable={editable}
                autoCapitalize="words"
            />

            <TouchableOpacity
                onPress={onPress}
                style={{justifyContent: 'center', width: wp(10)}}
                disabled={!editable}
            >
                {svg}
            </TouchableOpacity>
        </View>
        <RNDrive borderClr={color.g10} borderWidth={0.7}/>
    </View>);
};
export default RNInput;

const styles = StyleSheet.create({});
