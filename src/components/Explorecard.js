import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import React,{useMemo} from 'react';
import ImageIcon from '../../assets/svgs/image.svg';
import Send from '../../assets/svgs/send.svg';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import RandomImageCard from '../components/RandomImageCard';
import {SvgUri} from 'react-native-svg';
import MasonryList from '@react-native-seoul/masonry-list';
import {inputColor, textColor} from '../utiles/themeSelectot';
import {fonts} from '../Themes/FontsConfig';
const Explorecard = React.memo(({
                     isPosts ,
                     navigation
                   }) => {
                    // console.log(">>>>>explore component");
                    const {fontChange, coins, counts, tempCoins, theme_data, app_Theme} = useSelector((state) => state.appReducer);
                    const {color} = useTheme();
                    const font = fonts(fontChange);

                    const onPressCard = (item) => {
                        navigation.navigate('ExploreTabStack', {
                            screen: 'MemeDetailScreen', params: {
                                item: item,
                            },
                        });
                    };

                    const renderItem = useMemo(() => ({item, index}) => {
                        return (<RandomImageCard
                            onPressCard={() => onPressCard(item)}
                            item={item}
                            index={index}
                        />);
                    }, [isPosts],);
    return (
        <View >
             {isPosts.length == 0 ? (<View style={{height: hp(45), justifyContent: 'center'}}>
                    <Text
                        style={{
                            alignSelf: 'center', color: color.g1, fontFamily: font.medium,
                        }}
                    >
                        Record not found
                    </Text>
                </View>) : (<View style={{width:wp(95),alignSelf:'center'}}>
                    <MasonryList
                    data={isPosts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={styles.randomContainer}
                    renderItem={renderItem}
                />
                </View>)}
           </View>
    );
});

export default Explorecard;

const styles = StyleSheet.create({
    randomContainer:{
        // backgroundColor:'red',
        
    }
});