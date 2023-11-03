import Home from './home.svg';
import Explore from './explore.svg';
import Profile from './profile.svg';
import Tourment from './tourment.svg';
import HomeFill from './homeFill.svg';
import ExploreFill from './exploreFill.svg';
import ProfileFill from './profileFill.svg';
import TourmentFill from './tourmentFill.svg';
import SpaceHome from './spaceHome.svg';
import SpaceExplore from './spaceExplore.svg';
import SpaceProfile from './spaceProfile.svg';
import SpaceTourment from './spaceTourment.svg';
import SProfile from './sProfile.svg';
import SMsg from './sMsg.svg';
import SMail from './sMail.svg';
import SBilling from './sBilling.svg';
import SSupport from './sSupport.svg';
import SBell from './sBell.svg';
import DeleteAccount from './deleteAccount.svg';
import TutotialIcon from './appTutorial.svg';
import Roles from './roles.svg';
import { color } from '../colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

let settingIcons = {
  SettingProfile: <SProfile alignSelf="center" />,
  SettingBilling: <SBilling alignSelf="center" />,
  SettingMsg: <SMsg alignSelf="center" />,
  SettingMail: <SMail alignSelf="center" />,
  SettingNoti: <SBell alignSelf="center" />,
  SettingSupport: <SSupport alignSelf="center" />,
  DeleteAccount: <DeleteAccount alignSelf="center" width={25} height={25} />,
  AppTutorial: <TutotialIcon alignSelf="center" width={wp(14)} />,
  Roles: <Roles alignSelf="center" width={wp(14)} />,
};

export const DefaultIcon = {
  Home: <Home alignSelf="center" />,
  Explore: <Explore alignSelf="center" />,
  Profile: <Profile alignSelf="center" />,
  Tourment: <Tourment alignSelf="center" />,
  HomeFill: <HomeFill alignSelf="center" />,
  ExploreFill: <ExploreFill alignSelf="center" />,
  ProfileFill: <ProfileFill alignSelf="center" />,
  TourmentFill: <TourmentFill alignSelf="center" />,
  ...settingIcons,
};

export const SpaceIcon = {
  Home: <SpaceHome alignSelf="center" />,
  Explore: <SpaceExplore alignSelf="center" />,
  Profile: <SpaceProfile alignSelf="center" />,
  Tourment: <SpaceTourment alignSelf="center" />,
  HomeFill: <SpaceHome alignSelf="center" />,
  ExploreFill: <SpaceExplore alignSelf="center" />,
  ProfileFill: <SpaceProfile alignSelf="center" />,
  TourmentFill: <SpaceTourment alignSelf="center" />,
  ...settingIcons,
};

export const AppIcons = (name) => {
  switch (name) {
    case 'black':
      return DefaultIcon;
      break;
    case 'space':
      return SpaceIcon;
      break;
    default:
      return DefaultIcon;
      break;
  }
};

export const BottomTabColor = (name) => {
  switch (name) {
    case 'black':
      return color.g6;
      break;
    case 'space':
      return 'rgba(93, 51, 173, 1)';
      break;
    case 'common1':
      return '#B9AC00';
      break;
    case 'common2':
      return '#373737';
      break;
    case 'common3':
      return '#00007F';
      break;
    case 'common4':
      return '#C68866';
      break;
    case 'rare1':
      return '#865BE0';
      break;
    case 'rare2':
      return '#AF4EDA';
      break;
    case 'rare3':
      return 'rgba(88, 129, 87, 0.8)';
    case 'rare4':
      return 'rgba(255, 255, 255, 0.1)';
    case 'rare5':
      return 'rgba(255, 255, 255, 0.1)';
    case 'ultra_rare1':
      return '#EF9900';
    case 'ultra_rare2':
      return 'rgba(0, 0, 0, 0.5)';
    case 'ultra_rare3':
      return 'rgba(0, 0, 0, 0.2)';
    case 'ultra_rare4':
      return 'rgba(0, 0, 0, 0.2)';
    case 'ultra_rare5':
      return 'rgba(77, 94, 95, 0.2)';
    case 'ultra_rare6':
      return '#FCC1C7';
    case 'ultra_rare7':
      return '#314931';
    case 'ultra_rare8':
      return '#BA6286';
    case 'ultra_rare9':
      return '#80544d';
    case 'ultra_rare10':
      return '#EC0039';
    case 'ultra_rare11':
      return '#4D5E5F80';
    case 'ultra_rare12':
      return '#AA3621';
    case 'ultra_rare13':
      return '#EEFDFF';
    case 'ultra_rare14':
      return '#FFFFFF';
    case 'ultra_rare15':
      return '#FFF6B6';
    default:
      return color.g6;
      break;
  }
};
