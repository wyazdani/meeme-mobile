import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ImageBackground} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RankingCard from '../../../components/Cards/RankingCard';
import Header from '../../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

const PrizesRankScreen = ({navigation}) => {
    const {theme_data} = useSelector((state) => state.appReducer);
    const {color} = useTheme();

    const bgImage = theme_data?.bgImage;

    const [ranks, setRanks] = useState([{
        id: 0,
        position: '1st',
        icon: require('../../../../assets/pngs/amazon.png'),
        description: '£100 Amazon Gift Card',
    }, {
        id: 1,
        position: '2nd',
        icon: require('../../../../assets/pngs/amazon.png'),
        description: '£50 Amazon Gift Card',
    }, {
        id: 2,
        position: '3rd',
        icon: require('../../../../assets/pngs/amazon.png'),
        description: '£25 Amazon Gift Card',
    }, {
        id: 3, position: '4th', icon: require('../../../../assets/pngs/coin.png'), description: '5,000 Coins',
    }, {
        id: 4, position: '5th', icon: require('../../../../assets/pngs/coin.png'), description: '2,000 Coins',
    },]);

    return (<View style={{...styles.main, backgroundColor: color?.bgColor}}>
        <LinearGradient
            colors={[color.bgColor1, color.bgColor2]}
            style={styles.main}
            start={{y: 0, x: 0}}
            end={{y: 1, x: 0}}
        >
            <ImageBackground
                source={// theme_data ? require('../../../../assets/background.jpg') : null
                    {uri: bgImage}}
                style={styles.main}
                resizeMode="cover"
            >
                <Header
                    title={'Ranking Prizes'}
                    isLeftIcon
                    isCenterText
                    isRightIcon
                    navigation={navigation}
                    fontSize={hp(2.2)}
                />
                <FlatList
                    data={ranks}
                    keyExtractor={(item, index) => `key-${index}${item}`}
                    renderItem={({item, index}) => (<View style={styles.rankingCardContainer}>
                        <RankingCard item={item} textColor={color?.white}/>
                    </View>)}
                    showsVerticalScrollIndicator={false}
                />
            </ImageBackground>
        </LinearGradient>
    </View>);
};

export default PrizesRankScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flex: 1,
    }, rankingCardContainer: {
        marginVertical: hp(1.5), marginHorizontal: hp(1),
    },
});
