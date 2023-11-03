import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import React,{useMemo,useRef,useState} from 'react';
import ImageIcon from '../../assets/svgs/image.svg';
import Send from '../../assets/svgs/send.svg';
import {useTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StoryContainer } from "../components/StoryModule";
import {useSelector} from 'react-redux';
import RandomImageCard from '../components/RandomImageCard';
import {SvgUri} from 'react-native-svg';
import MasonryList from '@react-native-seoul/masonry-list';
import {inputColor, textColor} from '../utiles/themeSelectot';
import {fonts} from '../Themes/FontsConfig';
import Modal from "react-native-modal";
const StoryModal = React.memo(({
                     isPosts ,
                     navigation,
                     isVisible,
                     allStories,
                     storyData,
                     onComplete,
                     crossPress,
                     storyLike
                   }) => {
                    // console.log(storyDatad,"isVisibleData",isVisibleData);
                    const {fontChange, coins, counts, tempCoins, theme_data, app_Theme} = useSelector((state) => state.appReducer);
                    const {color} = useTheme();
                    const font = fonts(fontChange);
                    const modelRef = useRef();
                    // const [storyData, setStoryData] = useState(storyDatad);
                    // const [isVisible, setIsVisible] = useState({ isVisibleData });
                    // const [isVisible, setIsVisible] = useState({ isVisible: false, index: 0 });
                    const [isOpen, setIsOpen] = useState(true);

                  
    return (
        <View >
            <Modal
            ref={modelRef}
            isVisible={isVisible?.isVisible}
            style={styles.openShare}
            animationIn="zoomIn"
            animationOut="zoomOut"
            swipeDirection="down"
            scrollHorizontal={false}
            swipeThreshold={0}
            // onBackButtonPress={() => {
            //     setIsVisible({ ...isVisible, isVisible: false });
            //     setIsOpen({ ...isOpen, isOpen: false });
            // }}
            // onSwipeStart={(s) => {
            //     if (s?.dx < 0 && s?.dy > 0 && isVisible.index < allStories.length - 1) {
            //         setStoryData(allStories[isVisible.index + 1]);
            //         setIsVisible({ ...isVisible, index: isVisible.index + 1 });
            //     } else if (s?.dx > 0 && s?.dy < 0 && isVisible.index > 0) {
            //         setStoryData(allStories[isVisible.index - 1]);
            //         setIsVisible({ ...isVisible, index: isVisible.index - 1 });
            //     }
            // }}
            // onSwipeComplete={() => setIsVisible({ ...isVisible, isVisible: false })}
        >
            {/* {isOpen?.isOpen ? (<View
                style={{
                    ...styles.isOpenStyle, borderColor: color.g1, backgroundColor: color.g6,
                }}
            >
                <TouchableOpacity
                    onPress={() => deleteStory(isOpen?.id, isOpen?.index)}
                >
                    <Text style={{ color: color.white }}>Delete</Text>
                </TouchableOpacity>
            </View>) : null} */}
            <StoryContainer
                visible={true}
                enableProgress={true}
                images={storyData?.stories}
                imageStyle={styles?.storyImageStyle}
                barStyle={{
                    barActiveColor: color.white,
                    barInActiveColor: 'rgba(255, 255, 255, 0.27)',
                    barWidth: 100,
                    barHeight: 1.8,
                }}
                setIsOpen={setIsOpen}
                duration={30}
                containerStyle={{ width: wp(100), height: hp(100) }}
                onComplete={onComplete}
                // onComplete={() => {
                //     setIsVisible({ ...isVisible, isVisible: false });
                //     setIsOpen({ ...isOpen, isOpen: false });
                // }}
                crossPress={crossPress}
                // crossPress={() => {
                //     setIsVisible({ ...isVisible, isVisible: false });
                //     setIsOpen({ ...isOpen, isOpen: false });
                // }}
                // storyLike={(id, index) => like_unlikeStory(id, index)}
                storyLike={storyLike}
                deletePress={(id, index) => {
                    setIsOpen({ isOpen: true, id: id, index: index });
                }}
                userProfile={{
                    userImage: storyData?.stories[0]?.user_image, userName: storyData?.stories[0]?.username,
                }}
            />
        </Modal>
           </View>
    );
});

export default StoryModal;

const styles = StyleSheet.create({
   
});