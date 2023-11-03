import React from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const FooterIndicator = ({
                             visible,
                             noMoreData,
                             customStyle,
                             size = 'small',
                         }: {
    visible: boolean;
    noMoreData?: boolean;
    customStyle?: ViewStyle | any;
    size?: any;
}) => {
    return (
        <>
            {visible && (
                <View style={[styles.container, customStyle]}>
                    {noMoreData ? (
                        <View style={styles.line}/>
                    ) : (
                        <ActivityIndicator color={'white'} size={size}/>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        backgroundColor: 'red',
        height: hp(1),
        borderRadius: wp(5),
        width: '50%',
    },
});

export default FooterIndicator;
