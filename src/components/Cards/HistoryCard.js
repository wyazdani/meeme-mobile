import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {fonts} from '../../Themes/FontsConfig';
import Cross from '../../../assets/svgs/cross.svg';
import {useSelector} from 'react-redux';

const HistoryCard = ({item, onPressCard, index}) => {
    const {color} = useTheme();
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    var currentDate = moment();
    var givenDate = moment(item?.post_date, 'YYYY-MM-DD');

    const checkImage = () => {
        if (currentDate.isSame(givenDate, 'day') && item?.status) {
            return (
                <Image
                    source={require('../../../assets/pngs/tick.png')}
                    style={{width: 15, height: 15}}
                />
            );
        } else if (!currentDate.isSame(givenDate, 'day') && item?.status) {
            return (
                <Image
                    source={require('../../../assets/pngs/tick.png')}
                    style={{width: 15, height: 15}}
                />
            );
        } else if (!currentDate.isSame(givenDate, 'day') && !item?.status) {
            return <Cross alignSelf="center"/>;
        } else {
            return null;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPressCard}
            activeOpacity={0.8}
            style={[styles.cardContainer, {backgroundColor: color?.g6}]}
        >
            <LinearGradient
                colors={[color.linerClr7, color.linerClr8]}
                style={styles.countsContainer}
                start={{y: 0, x: 0}}
                end={{y: 0.8, x: 0}}
            >
                <Text
                    style={[styles.count, {color: color.white, fontFamily: font?.bold}]}
                >
                    {`${item?.days}`}
                </Text>
            </LinearGradient>
            <Text
                style={[
                    styles.numbers,
                    {
                        fontFamily: font?.bold,
                        color: color.white,
                    },
                ]}
            >
                {`${item?.judged_post_date_count}/25`}
            </Text>
            <View style={[styles.checkBoxCircle, {backgroundColor: color?.g14}]}>
                {checkImage()}
            </View>
        </TouchableOpacity>
    );
};

export default HistoryCard;

const styles = StyleSheet.create({
    cardContainer: {
        height: hp(7),
        borderRadius: hp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkBoxCircle: {
        height: wp(10),
        width: wp(10),
        right: 20,
        borderRadius: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    countsContainer: {
        width: hp(12),
        height: hp(7),
        borderRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        fontStyle: 'italic',
        fontSize: hp(2.5),
    },
    numbers: {
        fontSize: hp(2.2),
        right: hp(2),
    },
});
