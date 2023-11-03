import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';
import {fonts} from '../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const SupportCard = (props) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    return (<TouchableOpacity
            style={{...styles.cardView, backgroundColor: color.g6}}
            onPress={props.onPress}
        >
            <View
                key={props.index}
                style={{
                    flexDirection: 'row', alignSelf: 'center',
                }}
            >
                <FastImage source={{uri: props.image}} style={styles.imageStyle}/>
                <View
                    style={{
                        alignSelf: 'center', width: wp(65),
                    }}
                >
                    <View style={styles.card1View}>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.dateStyle, color: color.white, fontFamily: font.bold,
                            }}
                        >
                            {props.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.statusStyle, color: color.o1, fontFamily: font.medium,
                            }}
                        >
                            {props.status}
                        </Text>
                    </View>

                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.codeStyle, color: color.o2, fontFamily: font.medium,
                        }}
                    >
                        {props.code}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={{
                            ...styles.messageStyle, color: color.white, fontFamily: font.light,
                        }}
                    >
                        {props.date}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>);
};

export default SupportCard;

const styles = {
    cardView: {
        height: hp(13),
        marginHorizontal: wp(5),
        borderRadius: wp(5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2),
    }, card1View: {flexDirection: 'row', justifyContent: 'space-between'}, dateStyle: {
        fontSize: hp(2.3),
    }, statusStyle: {
        fontSize: hp(1.5), marginRight: wp(-1),
    }, codeStyle: {
        fontSize: hp(1.8),

        marginVertical: hp(0.6),
    }, messageStyle: {
        fontSize: hp(1.8), marginBottom: hp(0.2),
    }, imageStyle: {
        width: wp(14), height: wp(14), borderRadius: wp(14), marginHorizontal: wp(2),
    },
};
