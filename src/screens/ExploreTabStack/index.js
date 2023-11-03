import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import MemeDetailScreen from './MemeDetailScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

function ExploreTabStack(props) {
    return (<Stack.Navigator
        initialRouteName="SearchScreen"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name="MemeDetailScreen" component={MemeDetailScreen}/>
    </Stack.Navigator>);
}

export default ExploreTabStack;
