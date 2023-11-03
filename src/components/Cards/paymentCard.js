import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {fonts} from '../../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PaymentCard = ({
                         cardIcon,
                         rightIcon,
                         name,
                         info,
                         disabled,
                         onPress,
                         cardStyle,
                     }) => {
    const {CardView, cardNameStyle, cardInfoStyle} = styles;
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.8}
            style={[CardView, {backgroundColor: color.g8, ...cardStyle}]}
            onPress={onPress}
        >
            <View style={{flexDirection: 'row'}}>
                {cardIcon}
                <View style={{alignSelf: 'center', marginLeft: wp(5)}}>
                    <Text
                        style={[
                            cardNameStyle,
                            {fontFamily: font.bold, color: color.white},
                        ]}
                    >
                        {name}
                    </Text>
                    <Text
                        style={[cardInfoStyle, {fontFamily: font.light, color: color.y5}]}
                    >
                        {info}
                    </Text>
                </View>
            </View>
            {rightIcon}
        </TouchableOpacity>
    );
};

export default PaymentCard;

const styles = StyleSheet.create({
    CardView: {
        borderRadius: wp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardNameStyle: {
        fontSize: wp(4.3),
        marginBottom: hp(0.6),
    },
    cardInfoStyle: {
        fontSize: wp(3),
    },
});
