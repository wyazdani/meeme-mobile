import {configureFonts, DefaultTheme} from 'react-native-paper';
import {font} from './FontsConfig';

export const CommonT1 = {
    ...DefaultTheme,
    font: configureFonts(font),

    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    color: {
        //Primary Colr
        bgColor: '#E1D30B',
        bgColor1: '#E1D30B',
        bgColor2: '#E1D30B',
        appTutorialColor: '#4D4554',
        linerClr1: '#B9AC00',
        linerClr2: '#B9AC00',
        calander: '#B9AC00',
        // yellow and orange
        linerClr3: '#B9AC00',
        linerClr4: '#B9AC00',
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

        borderClr: '#EAE054',
        black: 'black',
        white: 'white',

        //black
        bl1: 'white',
        bl2: '#000000CC',
        bl3: '#1B1B1B',
        bl4: 'white',

        //blue
        blue: 'white',
        b1: '#FF0000',

        //green
        green: '#00853D',
        gr: 'rgba(253, 213, 111, 0.5)',
        gr1: '#4FBF67',

        //gray
        g1: '#F6F1B6',
        g2: 'white',
        g3: 'white',
        g4: 'rgba(255, 255, 255, 0.09)',
        g5: '#EDE56D',
        g6: '#292929',
        g7: '#757036',
        g8: '#EDE56D',
        g9: 'white',
        g10: '#EDE56D',
        g11: '#9B9B9B',
        g12: 'white',
        g13: '#454545',
        g14: '#FFFFFF1A',
        g15: '#7D7D7D',
        g16: '#7C7C7C',
        g17: 'white',
        g18: 'white',
        g19: 'white',
        g20: '#A4A4A4',
        //yellow
        y1: '#FFCD2F',
        y2: 'rgba(254, 220, 132, 1)',
        y3: 'rgba(247, 180, 7, 1)',
        y4: '#FFCD2F',
        y5: '#FBCB50',
        y6: '#FFF62A',

        //red
        r1: '#FF4B55',
        r2: 'rgba(255, 0, 0, 0.37)',
        filter: '#B9AC00',
        //orange
        o1: '#FEBB59',
        o2: '#FFE73C',
        transparent: '#E1D30B',
        notiBtn: 'black',
        msgTextColor: 'rgba(255, 255, 255, 0.3)',
    },
};