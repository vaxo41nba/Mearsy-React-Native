import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainPageScreen from '../screens/Main';
import PersonalProfileScreen from '../screens/UserProfile/PersonalProfile';
import ChosenProfileScreen from '../screens/UserProfile/ChosenUserProfile';
import CurrentPostScreen from '../screens/currentNewsPost';
import VideosScreen from '../screens/Videos';
import AudioPlayerScreen from '../screens/AudioPlayer';
import UserActivityScreen from '../screens/UserActivityInfo';
import PopularQuestionsScreen from '../screens/PopularQuestions';
import CurrentQuestionScreen from '../screens/CurrentQuestion';
import UserVideosScreen from '../screens/UserVideos';
import UserSubscribtionsScreen from '../screens/UserSubscribtions';
import UserSubscribersScreen from '../screens/UserSubscribers';
import UserTagsScreen from '../screens/UserTags';
import UserSettingsScreen from '../screens/UserSettings';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ChosenAudioScreen from '../screens/ChosenAudio';

const Navigator = createStackNavigator(
  {
    Home: MainPageScreen,
    PersonalProfile: PersonalProfileScreen,
    ChosenProfile: ChosenProfileScreen,
    CurrentPost: CurrentPostScreen,
    Videos: VideosScreen,
    Podcasts: AudioPlayerScreen,
    UserActivity: UserActivityScreen,
    PopularQuestions: PopularQuestionsScreen,
    CurrentQuestion: CurrentQuestionScreen,
    Video: UserVideosScreen,
    Subscriptions: UserSubscribtionsScreen,
    Subscribers: UserSubscribersScreen,
    Tags: UserTagsScreen,
    Settings: UserSettingsScreen,
    ForgotPassword: ForgotPasswordScreen,
    ChosenAudio: ChosenAudioScreen,
  },
  { headerMode: 'none' },
);

export default createAppContainer(Navigator);
