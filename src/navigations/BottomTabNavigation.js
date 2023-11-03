import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import {BottomTabCenterICon} from '../utiles/export';

// Local import
import {BottomTabColor, AppIcons} from '../../assets/svgs/index';
import ExploreScreen from '../screens/ExploreTabStack/ExploreScreen';
import {useNavigation} from '@react-navigation/native';
import TournamentScreen from '../screens/TournamentTabStack/TournamentScreen';
import {fonts} from '../Themes/FontsConfig';
import MediaSelectionPopup from '../components/Modals/MediaSelectionPopup';
import {bottomTabActiveInActivecolor} from '../utiles/themeSelectot';

const Tab = createBottomTabNavigator();

const BottomTabScreen =React.memo( () => {
    const {app_Theme, fontChange, theme_data} = useSelector((state) => state.appReducer,);

    const font = fonts(fontChange);
    const [mediaSelect, setMediaSelect] = useState(false);
    const icons = theme_data ? theme_data?.nav_bar : AppIcons(app_Theme);
    // const icons = AppIcons(app_Theme);
    const navigation = useNavigation();

    const Test = () => {
        return null;
    };

    const customTabBarStyle = {
        headerShown: false, tabBarShowLabel: true, tabBarStyle: {
            backgroundColor: BottomTabColor(app_Theme),
            borderTopLeftRadius: wp(8),
            borderTopRightRadius: wp(8),
            elevation: 20,
            height: hp(8),
            borderTopWidth: 0,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            flex: 1,
        },
    };

    const svgReturn = (data) => {
        if (typeof data == 'string') return <SvgUri width={25} height={25} alignSelf={'center'}
                                                    uri={data}/>; else return data;
    };

    const barTextColor = bottomTabActiveInActivecolor(app_Theme);

    return (<>
        <Tab.Navigator
            screenOptions={customTabBarStyle}
            // tabBar={(props) => <TabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return !focused ? svgReturn(icons.Home) : svgReturn(icons.HomeFill);
                    },
                     unmountOnBlur: false,
                    tabBarLabel: 'Home',
                    tabBarLabelStyle: {fontFamily: font.medium},
                    tabBarActiveTintColor: barTextColor.active,
                    tabBarInactiveTintColor: barTextColor.inActive,
                    tabBarItemStyle: [ styles.tabBarItemStyles],
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return !focused ? svgReturn(icons.Explore) : svgReturn(icons.ExploreFill);
                    },
                    unmountOnBlur: false,
                    tabBarLabel: 'Explore',
                    tabBarLabelStyle: {fontFamily: font.medium},
                    tabBarActiveTintColor: barTextColor.active,
                    tabBarInactiveTintColor: barTextColor.inActive,
                    tabBarItemStyle: [ styles.tabBarItemStyles],
                }}
            />
            <Tab.Screen
                name="CreateMemee"
                component={Test}
                options={{
                    tabBarActiveTintColor: 'white', tabBarIcon: ({focused}) => {
                        return (<BottomTabCenterICon
                            themeName={app_Theme}
                            icon={icons?.Memee}
                        />);
                    }, tabBarButton: (props) => (<TouchableOpacity
                        {...props}
                        onPress={() => setMediaSelect(true)}
                    />), tabBarLabel: '', tabBarItemStyle: [styles.tabStyle, {marginBottom: hp(2)}],
                }}
            />
            <Tab.Screen
                name="Tournament"
                component={TournamentScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return !focused ? svgReturn(icons.Tourment) : svgReturn(icons.TourmentFill);
                    },
                    tabBarLabel: 'Tournament',
                    tabBarLabelStyle: {fontFamily: font.medium},
                    tabBarActiveTintColor: barTextColor.active,
                    tabBarInactiveTintColor: barTextColor.inActive,
                    tabBarItemStyle: [ styles.tabBarItemStyles],
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({focused}) => {
                        return !focused ? svgReturn(icons.Profile) : svgReturn(icons.ProfileFill);
                    },
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: {fontFamily: font.medium},
                    tabBarActiveTintColor: barTextColor.active,
                    tabBarInactiveTintColor: barTextColor.inActive,
                    tabBarItemStyle: [ styles.tabBarItemStyles],
                }}
            />
        </Tab.Navigator>
        <MediaSelectionPopup
            isVisible={mediaSelect}
            navigation={navigation}
            setMediaSelect={setMediaSelect}
            screenName="createMemee"
            mediaType="any"
            crop={true}
        />
    </>);
});

export default BottomTabScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, gradient: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    }, tabStyle: {
        borderRadius: 15,
        height: hp('7%'),
        alignSelf: 'center',
        marginLeft: wp('3%'),
        marginRight: wp('3%'),
        alignItems: 'center',
        alignContent: 'center',
    }, tabBarStyle: {
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        elevation: 20,
        height: hp(10),
        borderTopWidth: 0,
        justifyContent: 'center',
        position: 'absolute',
    }, main: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, imageStyle: {
        width: '100%',
        height: hp(9),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -3.9,
    }, createTaskBtn: {
        alignSelf: 'center', position: 'absolute', bottom: 0,
    }, mainButton: {
        flex: 1, justifyContent: 'center', alignSelf: 'center',
    },
    tabBarItemStyles:{
        borderRadius: 15,
        height: hp(6),
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
});
