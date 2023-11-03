import Email from '../../../assets/svgs/email.svg';
import EmailW from '../../../assets/svgs/emailW.svg';
import WApple from '../../../assets/svgs/wApple.svg';
import Apple from '../../../assets/svgs/apple.svg';
import Google from '../../../assets/svgs/google.svg';
import Facebook from '../../../assets/svgs/facebook.svg';
import Twitter from '../../../assets/svgs/twitter.svg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const btns = [
    {
        id: 1,
        icon: <Email alignSelf="flex-end" marginRight={wp(4)}/>,
        icon2: <EmailW alignSelf="flex-end" marginRight={wp(4)}/>,
        title: 'Continue with Email',
    },
    {
        id: 2,
        icon: <Google alignSelf="flex-end" marginRight={wp(4)}/>,
        title: 'Continue with Google',
    },
    {
        id: 3,
        icon: <Facebook alignSelf="flex-end" marginRight={wp(4)}/>,
        title: 'Continue with Facebook',
    },
    {
        id: 3,
        icon: <Twitter alignSelf="flex-end" marginRight={wp(4)}/>,
        title: 'Continue with Twitter',
    },
    {
        id: 3,
        icon: <WApple alignSelf="flex-end" marginRight={wp(4)}/>,
        icon2: <Apple alignSelf="flex-end" marginRight={wp(4)}/>,
        title: 'Continue with Apple',
    },
];

export const groupBtn = [
    {
        id: 1,
        name: 'Following',
    },
    {
        id: 2,
        name: 'New Memes',
    },
    {
        id: 3,
        name: 'Trending',
    },
];

export const months = [
    {
        id: 1,
        month: 'Jan',
        ref: 'January',
    },
    {
        id: 2,
        month: 'Feb',
        res: 'February',
    },
    {
        id: 3,
        month: 'March',
        ref: 'March',
    },
    {
        id: 4,
        month: 'April',
        ref: 'April',
    },
    {
        id: 5,
        month: 'May',
        re: 'May',
    },
    {
        id: 6,
        month: 'June',
        ref: 'June',
    },
    {
        id: 7,
        month: 'July',
        ref: 'July',
    },
    {
        id: 8,
        month: 'Aug',
        ref: 'August',
    },
    {
        id: 9,
        month: 'sep',
        ref: 'September',
    },
    {
        id: 10,
        month: 'Oct',
        ref: '	October',
    },
    {
        id: 11,
        month: 'Nov',
        ref: 'November',
    },
    {
        id: 12,
        month: 'Dec',
        ref: 'December',
    },
];

export const categories = [
    {
        id: 0,
        label: 'Abuse',
        value: 'Abuse',
    },

    {
        id: 1,
        label: 'Payment',
        value: 'Payment',
    },
    {
        id: 2,
        label: 'Image',
        value: 'Image',
    },
    {
        id: 3,
        label: 'Profile',
        value: 'Profile',
    },
    {
        id: 4,
        label: 'Tournament Winner',
        value: 'Tournament_Winner',
    },
    {
        id: 5,
        label: 'Coins',
        value: 'Coins',
    },
    {
        id: 6,
        label: 'Plagiarism',
        value: 'Plagiarism',
    },
    {
        id: 7,
        label: 'Winner’s Feedback',
        value: 'Winner_Feedback',
    },
];

export const CustomProfileBtns = [
    {
        id: 1,
        name: 'Themes',
    },
    {
        id: 2,
        name: 'Fonts',
    },
    {
        id: 3,
        name: 'Profile Background',
    },
];

export const CustomProfileImage = [
    {
        id: 1,
        path: require('../../../assets/pngs/bgProfile1.png'),
        coin: 100,
        name: 'Profile Background 1',
    },
    {
        id: 2,
        path: require('../../../assets/pngs/bgProfile2.png'),
        coin: 100,
        name: 'Profile Background 2',
    },
    {
        id: 3,
        path: require('../../../assets/pngs/bgProfile3.png'),
        coin: 100,
        name: 'Profile Background 3',
    },
    {
        id: 4,
        path: require('../../../assets/pngs/bgProfile4.png'),
        coin: 100,
        name: 'Profile Background 4',
    },
];
export const CustomThemeImage = [
    {
        id: 1,
        path: require('../../../assets/pngs/spaceBar.png'),
        name: 'Space Theme',
        ref: 'space',
        coin: 100,
    },
    {
        id: 2,
        path: require('../../../assets/pngs/uniCronBar.png'),
        name: 'Unicorn Theme',
        coin: 100,
        ref: 'black',
    },
    {
        id: 3,
        path: require('../../../assets/pngs/CommonT1.png'),
        name: 'Roygbiv Yellow',
        coin: 100,
        ref: 'common1',
    },
    {
        id: 4,
        path: require('../../../assets/pngs/CommonT1.png'),
        name: 'Common Theme 2',
        coin: 100,
        ref: 'common2',
    },
    {
        id: 5,
        path: require('../../../assets/pngs/uniCronBar.png'),
        name: 'Common Theme 3',
        coin: 100,
        ref: 'common3',
    },
    {
        id: 6,
        path: require('../../../assets/pngs/uniCronBar.png'),
        name: 'Common Theme 4',
        coin: 100,
        ref: 'common4',
    },
];

export const CustomFontImage = [
    {
        id: 1,
        path: require('../../../assets/pngs/fontStyle2.png'),
        name: 'Font Style 1',
        ref: 'f3',
        coin: 100,
    },
    {
        id: 2,
        path: require('../../../assets/pngs/fontStyle1.png'),
        name: 'Font Style 2',
        coin: 100,
        ref: 'f2',
    },
    {
        id: 3,
        path: require('../../../assets/pngs/fontStyle3.png'),
        name: 'Font Style 3',
        coin: 100,
        ref: 'f1',
    },
];

export const ActivitiesBtn = [
    {
        id: 1,
        name: 'Messages',
    },
    {
        id: 2,
        name: 'Notifications',
    },
];

export const coinsBtn = [
    {
        id: 1,
        coins: '12,000',
        price: 10,
        package: 'MicroPackage',
    },
    {
        id: 2,
        coins: '30,000',
        price: 25,
        package: 'SmallPackage',
    },
    {
        id: 3,
        coins: '60,000',
        price: 50,
        package: 'largePackage',
    },
    {
        id: 4,
        coins: '120,000',
        price: 100,
        package: 'premiumPackage',
    },
];

export const stories = [
    'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Rvcnl8ZW58MHx8MHx8&w=1000&q=80',
    'https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418__480.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUFPdAVlp5X6Wkr8MAB_g7VqpRQmfYlG43cyXaFQQRspcKPBWLOtuLprvP6HgPq44kRXs&usqp=CAU',
];

export const bottomICons = [
    {
        name: 'space',
        src: require('../../../assets/pngs/spaceMemee.png'),
    },
    {
        name: 'black',
        src: require('../../../assets/pngs/blackMemee.png'),
    },
];

export const giftCardData = [
    {
        coin: 25,
        price: 11000,
    },
    {
        coin: 50,
        price: 12000,
    },
    {
        coin: 100,
        price: 14000,
    },
];

export const rarities = [
    {
        id: 0,
        rarity: 'All Rarities',
        ref: 'all',
    },
    {
        id: 1,
        rarity: 'Rarity: 1',
        ref: 'Rarity1',
    },
    {
        id: 2,
        rarity: 'Rarity: 2',
        ref: 'Rarity2',
    },
    {
        id: 3,
        rarity: 'Rarity: 3',
        ref: 'Rarity3',
    },
];


