import MasonryList from '@react-native-seoul/masonry-list';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Search from '../../../../assets/svgs/search.svg';
import Header from '../../../components/Header';
import RandomImageCard from '../../../components/RandomImageCard';
import SearchInput from '../../../components/SearchInput';
import {fonts} from '../../../Themes/FontsConfig';

const SearchScreen = ({navigation}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    const {color} = useTheme();
    const [data, setData] = useState([{
        id: 'id123',
        post_image: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
        username: 'Kadin Dorwart',
        user_image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    }, {
        id: 'id124',
        post_image: 'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
        username: 'Chance Philips',
        user_image: 'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    }, {
        id: 'id125',
        post_image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
        username: 'Jaylon Botosh',
        user_image: 'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    }, {
        id: 'id126',
        post_image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
        username: 'Ahmad Philips',
        user_image: 'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    },]);

    return (<View style={{...styles.main, backgroundColor: color?.bgColor}}>
            <Header
                title={'Search'}
                marginRight={30}
                isLeftIcon
                isCenterText
                isRightIcon
                fontSize={hp(2.2)}
                navigation={navigation}
            />
            <View style={styles.innerContainer}>
                <SearchInput
                    svg={<Search alignSelf="center"/>}
                    placeholder="Search here"
                />
                {/* Random Images */}
                <MasonryList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={styles.randomContainer}
                    renderItem={({item, index}) => (<RandomImageCard
                            // onPressCard={() => onPressCard(item)}
                            item={item}
                            index={index}
                        />)}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>);
};

export default SearchScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }, innerContainer: {
        flex: 1, marginHorizontal: wp('2'), marginTop: '5%',
    }, randomContainer: {
        marginTop: hp(2), bottom: 10,
    },
});
