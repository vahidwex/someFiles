declare let PAYMENT_KEY;

/**
 * Static Address and Configs.
 */
export class Api {

  /**
   * Base Configure
   */
  public static readonly CLIENT_ID = '';

  /**
   * This variable will define limit in adding user CV item.
   * @type {string}
   */
  public static readonly CV_ITEM_LIMIT = 5;

  public static readonly COUNTRIES = 'https://restcountries.eu/rest/v2/all';

  public static readonly STRIPE_PUBLIC_KEY = !!PAYMENT_KEY ? PAYMENT_KEY : 'pk_test_njKYuSNCweLG89xhvwbMYdJ800wA3lLNCK';

  // public static readonly BASE_URL = 'http://5.9.42.241:3000/';
  public static readonly WEBSITE_URL = 'https://www.perfectlancer.com';
  public static readonly BASE_URL = 'https://node.perfectlancer.com/';
  public static readonly BASE_TEST_URL = 'http://p-lancer.com:3000/';
  public static readonly WORDPRESS = 'https://perfectlancer.com/blog/';
  public static readonly BASE_URL_OAUTH = 'https://auth.perfectlancer.com/api/';
  public static readonly BASE_PUBLIC_URL = 'https://node.perfectlancer.com/api/';
  public static readonly BASE_BILLING_URL = 'https://node.perfectlancer.com/billing/';
  public static readonly FILE_ADDRESS = Api.BASE_URL + 'file/download?filename=';
  public static readonly GOOGLE_SIGNIN = '';
  public static readonly GOOGLE_SIGNUP = '';

  /**
   * Statics
   */
  public static readonly STATICS = Api.BASE_URL + '/{{}}';

  public static readonly WORDPRESS_POST = Api.WORDPRESS + 'wp-json/wp/v2/posts';


  /**
   * Related to Billing
   * @type {string}
   */
  public static readonly BID_COUNT = Api.BASE_BILLING_URL + 'audit';


  public static readonly BOOKMARKS =  Api.BASE_URL + 'bookmarks';

  /**
   * Related to OAuth
   * @type {string}
   */
  public static readonly SIMPLE_POST = Api.BASE_URL + 'projects';
  public static readonly UPLOAD_FILE = Api.BASE_URL + 'file/upload';
  public static readonly SIMPLE_LOGIN = Api.BASE_URL + 'user/uplogin';
  public static readonly OAUTH_LOGIN = Api.BASE_URL + 'user/login';
  public static readonly OAUTH_REGISTER = Api.BASE_URL + 'user/signup';
  public static readonly SKILL = Api.BASE_URL + 'skill_user';
  public static readonly SEND_ACCOUNT_VERIFICATION = Api.BASE_URL + 'user/sendVerifyNotification';
  public static readonly SIMPLE_VERIFY_ACCOUNT = Api.BASE_URL + 'user/verifyUserIdentifiermobile';
  public static readonly VERIFY_ACCOUNT = Api.BASE_URL + 'user/verifyUserIdentifier';
  public static readonly SEND_RESET_PASSWORD = Api.BASE_URL + 'user/sendPasswordReset';
  public static readonly RESET_PASSWORD = Api.BASE_URL + 'user/resetPassword';

  /**
   * User Profile APIs
   * @type {string}
   */
  public static readonly USER_PROFILE = Api.BASE_URL + 'profile/';
  public static readonly USER_PUBLIC = Api.BASE_URL + 'user/others';
  public static readonly BOOKMARK = Api.BASE_URL + 'bookmarks';
  public static readonly LOGOUT_USER = Api.BASE_URL + 'profile/revokeRefreshToken';
  public static readonly CHANGE_USER_NAME = Api.USER_PROFILE + 'changeName';
  public static readonly ADD_IDENTIFIER = Api.USER_PROFILE + 'addIdentifier';
  public static readonly REMOVE_IDENTIFIER = Api.USER_PROFILE + 'removeIdentifier';
  public static readonly CHANGE_PASSSWORD = Api.USER_PROFILE + 'changePassword';
  public static readonly USER_AVATAR = Api.BASE_URL_OAUTH + 'avatar';


  /**
   * api postgrest on node
   * @type {string}
   */

  public static readonly BIDS = Api.BASE_URL + 'bids';
  public static readonly CATEGORIES = Api.BASE_URL + 'categories';
  public static readonly MILSTONE = Api.BASE_URL + 'milestone';
  public static readonly MILSTONE_MSG = Api.BASE_URL + 'milestonemessage';
  public static readonly PROJECTS = Api.BASE_PUBLIC_URL + 'search';
  public static readonly FREELANCERS = Api.BASE_PUBLIC_URL + 'freelancer_search';
  public static readonly OTHER_PROJECTS = Api.BASE_URL + 'projects/other';
  public static readonly MY_PROJECTS = Api.BASE_URL + 'projects';
  public static readonly BID_ON_PROJECT = Api.BASE_URL + 'bids';
  public static readonly MILESTONES_ON_PROJECT = Api.BASE_URL + 'milestone';
  public static readonly GLOBAL_LISTS = Api.BASE_PUBLIC_URL + 'global_lists';
  public static readonly SKILL_SUGGEST = Api.BASE_PUBLIC_URL + 'skills_suggestion';

  public static readonly LIVECHAT_USER_SESSIONS = Api.BASE_URL + 'livechat/user_sessions/';
  public static readonly LIVECHAT_HISTORY = Api.BASE_URL + 'livechat/history/';
  public static readonly LIVECHAT_SESSIONS_USER = Api.BASE_URL + 'livechat/sessions-user/';
  public static readonly LIVECHAT_SESSION = Api.BASE_URL + 'livechat/session/';
  public static readonly LIVECHAT_SEND = Api.BASE_URL + 'livechat/send/';
  public static readonly WEB_NOTIF = Api.BASE_URL + 'notification/add/';

  /**
   * Refers to public APIs
   * @type {string}
   */
  public static readonly PUBLIC_HOME = Api.BASE_URL + 'api/public';
  public static readonly PUBLIC_ADS = Api.BASE_URL + 'ads';
  public static readonly PUBLIC_APPS = Api.BASE_URL + 'apps';
  public static readonly PUBLIC_APPDETAIL = Api.BASE_TEST_URL + 'apps_detail';
  public static readonly PUBLIC_BANNERS = Api.BASE_URL + 'banners';
  public static readonly PUBLIC_CONFIGS = Api.BASE_URL + 'configs';
  public static readonly PUBLIC_DEVELOPERS = Api.BASE_URL + 'developers';
  public static readonly PUBLIC_FEATURES = Api.BASE_URL + 'feature';
  public static readonly PUBLIC_PAGES = Api.BASE_URL + 'pages';
  public static readonly PUBLIC_SETTINGS = Api.BASE_URL + 'settings';
  public static readonly PUBLIC_TOKENS = Api.BASE_URL + 'tokens';
  public static readonly PUBLIC_USERS = Api.BASE_URL + 'users';
  public static readonly PUBLIC_SEOCONTENT = Api.BASE_URL + 'api/seocontent/';

    /**
     * Payment Route
     */
    public static readonly ADD_PAYMENT = Api.BASE_BILLING_URL + 'charge';
    public static readonly ADD_CARD = Api.BASE_BILLING_URL + 'payment';


    // readonly VAPID_PUBLIC_KEY = 'BK6WKHK4NKAAU36y0qtCX4tGqnmixuZpY3p9bLLIze8fDO5YFa4c0Kyy1x5U9Vy_7ro96tmt-lvSXrnaJC-AYrw';
    // readonly VAPID_PUBLIC_KEY = 'BICWdnzJNvsJ7M_caexgh-TTa5m5BNSh7c7-QC0nMtznhHEicVhWSuTOaFYlVqe41jWq8Gk9pozlxYbJP58SvoU';
}
