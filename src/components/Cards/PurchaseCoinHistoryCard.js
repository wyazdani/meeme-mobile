import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useTheme} from "react-native-paper";
import {fonts} from "../../Themes/FontsConfig";
import {useSelector} from "react-redux";
import moment from "moment";

const PurchaseCoinHistoryCard = ({item}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const {color} = useTheme();
    const font = fonts(fontChange);
    let coins
    switch (item?.amount) {
        case 10: {
            coins = "12,000"
        }
            break
        case 25: {
            coins = '30,000'
        }
            break
        case 50: {
            coins = '60,000'
        }
            break
        case 100: {
            coins = '120,000'
        }
            break
        default: {
            coins = '0'
        }
    }

    return (
        <View style={[styles.cardContainer, {backgroundColor: color.g6}]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image
                    source={require("../../../assets/pngs/coin.png")}
                    style={{width: 20, height: 20, resizeMode: "contain"}}
                />
                <Text
                    style={{
                        marginStart: hp(1.5),
                        color: color.white,
                        fontFamily: font.bold,
                        fontSize: hp(2),
                        fontWeight: "bold",
                    }}
                >
                    {coins}
                </Text>
            </View>
            <Text
                style={{
                    color: color.g16,
                    fontFamily: font.medium,
                    fontSize: hp(1.5),
                }}
            >
                {moment(item?.updated_at).format('MMM DD , YYYY')}
            </Text>
        </View>
    );
};

export default PurchaseCoinHistoryCard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: hp(2),
        borderRadius: hp(2),
    },
});
