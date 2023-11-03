import {
    BlackTheme,
    CommonT1,
    CommonT2,
    CommonT3,
    CommonT4,
    RareT1,
    RareT2,
    RareT3,
    RareT4,
    RareT5,
    SpaceTheme,
    UltraRareT1,
    UltraRareT2,
    UltraRareT3,
    UltraRareT4,
    UltraRareT5,
    UltraRareT6,
    UltraRareT7,
    UltraRareT8,
    UltraRareT9,
    UltraRareT10,
    UltraRareT11,
    UltraRareT12,
    UltraRareT13,
    UltraRareT14,
    UltraRareT15,
} from '../Themes';

export const themeSelector = (themeName) => {
    switch (themeName) {
        case 'black':
            return BlackTheme;
            break;
        case 'space':
            return SpaceTheme;
            break;
        case 'common1':
            return CommonT1;
            break;
        case 'common2':
            return CommonT2;
            break;
        case 'common3':
            return CommonT3;
            break;
        case 'common4':
            return CommonT4;
            break;
        case 'rare1':
            return RareT1;
            break;
        case 'rare2':
            return RareT2;
            break;
        case 'rare3':
            return RareT3;
            break;
        case 'rare4':
            return RareT4;
            break;
        case 'rare5':
            return RareT5;
            break;
        case 'ultra_rare1':
            return UltraRareT1;
            break;
        case 'ultra_rare2':
            return UltraRareT2;
        case 'ultra_rare3':
            return UltraRareT3;
        case 'ultra_rare4':
            return UltraRareT4;
        case 'ultra_rare5':
            return UltraRareT5;
        case 'ultra_rare6':
            return UltraRareT6;
        case 'ultra_rare7':
            return UltraRareT7;
            break;
        case 'ultra_rare8':
            return UltraRareT8;
            break;
        case 'ultra_rare9':
            return UltraRareT9;
            break;
        case 'ultra_rare10':
            return UltraRareT10;
            break;
        case 'ultra_rare11':
            return UltraRareT11;
            break;
        case 'ultra_rare12':
            return UltraRareT12;
            break;
        case 'ultra_rare13':
            return UltraRareT13;
            break;
        case 'ultra_rare14':
            return UltraRareT14;
            break;
        case 'ultra_rare15':
            return UltraRareT15;
            break;
        default:
            return BlackTheme;
            break;
    }
};

export const bottomTabActiveInActivecolor = (themeName) => {
    switch (themeName) {
        case 'black':
            return {active: '#FFCD2F', inActive: '#9B9B9B'};
            break;
        case 'space':
            return {active: '#FFCD2F', inActive: '#9B9B9B'};
            break;
        case 'common1':
            return {active: 'white', inActive: '#CEC54C'};
            break;
        case 'common2':
            return {active: 'white', inActive: '#373737'};
            break;
        case 'common3':
            return {active: '#9B9B9B', inActive: '#2E2E87'};
            break;
        case 'common4':
            return {active: 'white', inActive: '#C68866'};
            break;
        case 'rare1':
            return {active: 'white', inActive: '#997CD6'};
            break;
        case 'rare2':
            return {active: 'white', inActive: '#997CD6'};
            break;
        case 'rare3':
            return {active: 'white', inActive: '#997CD6'};
            break;

        case 'ultra_rare1':
            return {active: 'white', inActive: '#F4B84C'};
            break;
        case 'ultra_rare3':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;
        case 'ultra_rare6':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;

        case 'ultra_rare9':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;

        case 'ultra_rare10':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;

        case 'ultra_rare11':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;

        case 'ultra_rare12':
            return {active: 'white', inActive: 'rgba(255, 255, 255, 0.4)'};
            break;

        case 'ultra_rare13':
            return {active: 'black', inActive: '#b7c4c7'};
            break;

        case 'ultra_rare14':
            return {active: 'black', inActive: '#d2d2d2'};
            break;

        case 'ultra_rare15':
            return {active: 'black', inActive: '#d1cc99'};
            break;

        default:
            return {active: '#FFCD2F', inActive: '#9B9B9B'};
            break;
    }
};

export const textColor = (app_Theme, defaultColor) => {
    switch (app_Theme) {
        case 'rare2':
            return {
                text: 'white', serachColor: 'white', followBtn: 'white', black: 'white',
            };
            break;
        case 'rare1':
            return {
                text: 'white', serachColor: 'white', followBtn: 'white', black: 'white',
            };
            break;
        case 'ultra_rare1':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'black',
            };
            break;
        case 'ultra_rare7':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'white',
            };
            break;

        case 'ultra_rare10':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'black',
            };
            break;

        case 'ultra_rare11':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'black',
            };
            break;

        case 'ultra_rare12':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'black',
            };
            break;

        case 'ultra_rare13':
            return {
                followBtn: 'white', text: 'black', serachColor: defaultColor, black: 'black',
            };
            break;

        case 'ultra_rare14':
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'black',
            };
            break;

        case 'ultra_rare15':
            return {
                followBtn: 'white', text: 'black', serachColor: defaultColor, black: 'black',
            };
            break;

        default:
            return {
                followBtn: 'white', text: 'white', serachColor: defaultColor, black: 'white',
            };
            break;
    }
};

export const inputColor = (app_Theme) => {
    switch (app_Theme) {
        case 'black':
            return 'white';
            break;
        case 'space':
            return 'white';
            break;
        case 'common1':
            return 'white';
            break;
        case 'common3':
            return 'white';
            break;
        case 'common4':
            return 'white';
            break;
        case 'ultra_rare9':
            return '#FFF';
            break;
        case 'ultra_rare10':
            return '#000';
            break;
        case 'ultra_rare11':
            return '#000';
            break;
        case 'ultra_rare12':
            return '#000';
            break;
        case 'ultra_rare13':
            return '#000';
            break;
        case 'ultra_rare14':
            return '#000';
            break;
        case 'ultra_rare15':
            return '#000';
            break;
        default:
            return 'white';
            break;
    }
};
