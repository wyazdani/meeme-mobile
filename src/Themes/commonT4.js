import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const CommonT4 = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: '#E1B298',
        bgColor1: '#E1B298',
        bgColor2: '#E1B298',
        appTutorialColor: '#4D4554',
        linerClr1: '#FFE299',
        linerClr2: '#F6B202',
        // yellow and orange
        linerClr3: '#73FF66',
        linerClr4: '#19850F',
        // light yellow and orange
        linerClr5: '#FFDF8D',
        linerClr6: '#F4B30E',
        // purple and black
        linerClr7: '#B461F4',
        linerClr8: '#671BA3',
        // green and white
        linerClr9: '#74FF67',
        linerClr10: '#1D8B14',
        // gradient text
        linerClr11: '#FFEBB8',
        linerClr12: '#FFB800',
        // light purple and black
        linerClr13: '#C67DFF',
        linerClr14: '#8A26D8',

        borderClr: '#F3E0D6',
        black: 'black',
        white: '#FFFFFF',

        //black
        bl1: 'black',
        bl2: '#000000CC',
        bl3: '#1B1B1B',
        bl4: 'white',

        //blue
        blue: '#74BBF3',
        b1: '#695CFF',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //gray
        g1: '#F6E8E0',
        g2: 'white',
        g3: 'rgba(65, 65, 65, 1)',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#EAC9B7',
        g6: '#292929',
        g7: 'white',
        g8: '#E5BEA7',
        g9: 'white',
        g10: '#EAC9B7',
        g11: 'white',
        g12: 'white',
        g13: '#454545',
        g14: '#FFFFFF1A',
        g15: '#7D7D7D',
        g16: '#7C7C7C',
        g17: 'white',
        g18: '#A1A1A1',
        g19: 'white',
        g20: '#A4A4A4',
        //yellow
        y1: '#FFCD2F',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',
        y6: '#FFF62A',
        calander: '#201E23',
        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',
        filter: '#FCE085',

        //orange

        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: '#E1B298',
        notiBtn: 'black',
        msgTextColor: '#FBF8FF',
    },
};
