import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PrizesRankScreen from './PrizesRankScreen';
import JudgeScreen from './JudgeScreen';
import JudgeMemees from './JudgeMemees';

const Stack = createNativeStackNavigator();

function TournamentTabStack(props) {
    return (<Stack.Navigator
        initialRouteName="PrizesRankScreen"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="PrizesRankScreen" component={PrizesRankScreen}/>
        {/* Judge Screens */}
        <Stack.Screen name="JudgeScreen" component={JudgeScreen}/>
        <Stack.Screen name="JudgeMemees" component={JudgeMemees}/>
    </Stack.Navigator>);
}

export default TournamentTabStack;
