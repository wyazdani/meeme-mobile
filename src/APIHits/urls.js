export const SIGNUP = 'users';
export const EMAILVALIDATE = 'users/email_validate';
export const SIGNIN = 'auth/login';
export const VERIFY_OTP = 'users/verify_otp';
export const FORGOTPASSWORD = 'users/forgot_password';
export const CHANGEPASSWORD = 'users/reset_user_password';
export const POST = 'posts';
export const GETALLPOSTS = 'users/all_posts';
export const SOCIALLOGIN = 'social/social_login';
export const LIKEPOST = 'likes';
// comments route
export const GETALLCOMMENTS = 'comments';
export const CREATE_CHILD_COMMENT = 'comments/create_child_comment';
export const GETCURRENTUSERINFO = 'users/open_current_user';
export const UPDATEUSER = 'users/update_user';
export const GETOTHERUSERINFO = 'users/open_some_other_user?id=';
export const STORIES = 'stories';
export const LIKE_UNLIKESTORIES = 'stories/like_dislike_a_story';
export const DELETEPOST = 'posts/:id';
export const UPDATEPOST = 'posts/update_posts';
export const GETALLTAGS = 'posts/tags';
export const TAGEXPLORE = 'posts/explore';
export const MORE_LIKE_THIS = 'posts/other_posts';
export const TRANDINGPOSTS = 'posts/trending_posts';
export const FOLLOWINGPOSTS = 'posts/following_posts';
export const RECENTPOSTS = 'posts/recent_posts';
export const FOLLWER_LIST = 'followers?page=';

// tournaments and judge route
export const GET_LATEST_TOURNAMENTS = 'tournament_banners';
export const GET_TOURNAMENT_RULES = 'tournament_banners/show_tournament_rules';
export const ENROLL_TOURNAMENT = 'tournament_banners/enroll_in_tournament';
export const TOURNAMENT_POST = 'tournament_banners';
export const GET_TOURNAMENT_POSTS = 'tournament_banners/tournament_posts';
export const LIKE_TOURNAMENT_POST =
  'tournament_banners/like_unlike_a_tournament_post';
export const DISLIKE_TOURNAMENT_POST =
  'tournament_banners/dislike_a_tournament_post';
export const JUDGE_DATA = 'tournament_banners/judge';

// follow and following route
export const ACCEPT_REJECT_REQUEST = 'followers/update_follower';
export const SEND_FOLLOW_REQUEST = 'followers/send_a_follow_request_to_user';
export const PENDING_REQUESTS = 'followers/show_pending_requests';
export const UNFOLLOW_REQUEST = 'followers/un_follow_user';
export const CANCEL_FOLLOW_REQUEST = 'followers/cancel_follow_request';

//Payments route
export const GETALLCARDS = 'users/payments/fetch_all_card';
export const REGISTERUSERONSTRIPS = 'users/payments/add_user_to_stripe';
export const ADDCARD = 'users/payments/add_a_card';
export const DELETEACARD = 'users/payments/delete_a_card';
export const BUYTHECOINS = '/users/payments/charge_a_customer';
export const PURCHASING_HISTORY = 'users/payments/show_transactions_history';
export const PAYMENT_INTENT = 'users/payments/payment_intent';
export const APPLE_PAY = 'users/payments/apple_pay';

//Store route
export const BUY_AN_ITEM = 'stores';

// one to one chat route
export const SEARCH_USER = 'messages/fetch_all_users';
export const CREATE_CONVERSATION = 'conversations';
export const CREATE_MESSAGES = 'messages';
export const GET_INDIVIDUAL_MESSAGES = 'messages/individual_messages';

//Support route
export const CREATE_NEW_TICKET = 'messages/support_ticket';
export const GET_ALL_SUPPORTS = 'messages/all_support_chats';
export const GET_ALL_SUPPORTS_Messages = 'messages/individual_admin_messages';
export const CREATE_NEW_SUPPORT_MESSAGE = 'messages/support_chat';

// Badges section route
export const GET_LOCKED_BADGES = 'badges/current_user_locked_badges';
export const EARNED_BADGES = 'badges/current_user_badges';
export const SEARCH_BADGES = 'badges/badge_rarity_search';
export const RARITIES_FILTER = 'badges/all_badges';
export const USER_STATUS = 'users/active_status_change';
export const USER_NOTIFICATION_SETTING = 'users/notification_settings';
export const USER_PRIVATE_SETTING = 'users/private_account';

export const SUGGESTION_USER = 'followers/suggestions';
export const SHARE_POST_COUNT = 'posts/share_post';
export const ALL_NOTIFICATIONS = 'notifications/user_notifications';

//Block route
export const BLOCK_USER = 'block_users';

//Privacy policy
export const PRIVACY_POLICY = 'privacy_policies';

export const FARWORD_MEMEE =
  'tournament_banners/forwarding_memee_to_tournament';
export const APP_Tutorial = 'tutorials';

//Themes

export const THEME = 'themes';
export const SETTHEME = `${THEME}/set_theme`;
