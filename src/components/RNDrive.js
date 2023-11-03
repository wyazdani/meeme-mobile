import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const RNDrive = ({
                     marginVertical, borderClr, borderWidth, marginHorizontail,
                 }) => {


    const {isLogin} = useSelector((state) => state.authReducer);
    return (<View
        style={{
            borderWidth: borderWidth || 0.5,
            borderColor: isLogin ? borderClr : '#151515',
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontail,
        }}
    />);
};

export default RNDrive;

const styles = StyleSheet.create({});
