import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React from 'react'
import {useTheme} from 'react-native-paper'

const RNActiveIndicator = () => {
    const {color} = useTheme();
    return (
        <View style={{}}>
            <ActivityIndicator color={color.white}/>
        </View>
    )
}

export default RNActiveIndicator

const styles = StyleSheet.create({})