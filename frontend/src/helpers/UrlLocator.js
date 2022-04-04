export default class UrlLocator {
  static getApiUrl = (service) => {
    const AUTHENTICATION_API_URL = "/api/isAuthenticated";
    const COUPON_API_URL = "/api/admin/coupon";
    const CATEGORIES_API_URL = "/api/admin/category";
    const ADMIN_ITEMS_API_URL = "/api/admin/item";
    const HOME_API_URL = "/api/home";
    const SETTINGS_API_URL = "/api/admin/settings";
    const PLATFORM_API_URL = "/api/admin/platform";
    const LICENSES_API_URL = "/api/admin/licenses";
    const ORDERS_API_URL = "/api/orders";
    const CART_API_URL = "/api/cart";
    const CAROUSEL_API_URL = "/api/admin/carousel";

    const AUTH_API_URL="/api/auth";
    const SIGNUP_URL="/signup";
    const SIGNIN_URL="/signin";

    const GET_USER_CART="/getUserCart";
    const DELETE_USER_CART="/deleteCartItem"

    const UPDATE_USER_DETAILS="/updateUserDetails";

    const GET_ALL_USER_PROFILE="/getAll";

    const UPDATE_PAYMENT_METHOD = "/updatePaymentMethod"

    const CREATE_SINGLE_CART_RECORD='/createSingleCartRecord';

    const NEWSLETTER_API_URL="/api/newsletter";
    const SAVE_NEWLETTER = '/save';

    const UPDATE_USER_PASSWORD = "/updateUserPassword";

    const ADMIN_PROFILE_URL="/api/profile";

    const ADMIN_PROFILE_DETAILS="/getAdminUserDetails";

    const UPDATE_ADMIN_PROFILE_DETAILS = "/updateUserDetails";

    const HOME_CAROUSEL_API_URL = '/api/home/carousel';

    const GET_HOME_CAROUSEL_IMAGES = '/getAllCarouselImages';

    const PLACE_ORDER = '/placeAnOrder';

    const GET_CAROUSEL_IMAGES = '/getAll';
    const DELETE_CAROUSEL_IMAGE = '/delete';
    const SAVE_CAROUSEL_IMAGE = '/save';

    const GET_ADMIN_ORDERS = '/getAdminOrders';
    const GET_USER_ORDERS = '/getUserOrders';

    const GET_ADMIN_ORDERS_BY_DATE = '/getAdminOrdersByDate';
    const GET_ADMIN_ORDERS_BY_ORDER_ID = '/getAdminOrdersByOrderId';
    const GET_ADMIN_ORDERS_BY_CLIENT_NAME = '/getAdminOrdersByClientName';

    const GET_USER_ORDERS_BY_DATE = '/getUserOrdersByDate';
    const GET_USER_ORDERS_BY_ORDER_ID = '/getUserOrdersByOrderId';

    const SAVE_COUPON = "/save";
    const GET_COUPONS = "/getAll";
    const DELETE_COUPON = "/delete";
    const EDIT_COUPON = "/edit";
    const GET_COUPON_BY_ID = "/getById";
    const GET_COUPON_BY_NAME = "/getByCouponName";

    const SAVE_LICENSE = "/save";
    const GET_GAME_LICENSES = "/getAll";
    const DELETE_LICENSE = "/delete";
    const EDIT_LICENSE = "/edit";

    const SAVE_CATEGORY = "/save";
    const GET_CATEGORIES = "/getAll";
    const DELETE_CATEGORY = "/delete";
    const EDIT_CATEGORY = "/edit";
    const GET_CATEGORY_BY_ID = "/getById";

    const SAVE_PLATFORM = "/save";
    const GET_PLATFORMS = "/getAll";
    const DELETE_PLATFORM = "/delete";
    const EDIT_PLATFORM = "/edit";
    const GET_PLATFORM_BY_ID = "/getById";

    const GET_ADMIN_ITEMS = "/getAll";
    const SAVE_ADMIN_ITEM = "/save";
    const DELETE_ADMIN_ITEM = "/delete";
    const ACTIVATE_ADMIN_ITEM = "/activate";
    const GET_ITEM_BY_ID = "/getById";

    const GET_SETTINGS = "/getAll";
    const GET_SETTING_BY_ID = "/getById";
    const SAVE_SETTINGS = "/save";
    const GET_PARAM_VALUE_BY_NAME = "/getParamValueByName";

    const AUTHENTICATE_USER = "/client";
    const AUTHENTICATE_ADMIN = "/admin";

    const HOME_GET_ALL_ITEMS = "/getAll";
    const HOME_GET_ITEM_BY_ID = "/getById";
    const HOME_GET_CUSTOM_ITEM_BY_ID = "/getCustomItemById";
    const HOME_GET_ARRAY_OF_ITEMS = "/getList";

    const INC_CART_ITEM_QUANTITY = '/incCartItemQuantity';
    const DEC_CART_ITEM_QUANTITY = '/decCartItemQuantity';
    const CHECKOUT_USER_CART = '/checkoutUserCart'

    const CREATE_CART_RECORD="/createCartRecords";

    switch (service) {

      case "SAVE_NEWLETTER":
        return NEWSLETTER_API_URL + SAVE_NEWLETTER;

        case "CREATE_CART_RECORD":
        return CART_API_URL + CREATE_CART_RECORD;

        case "SIGNUP_URL":
        return AUTH_API_URL + SIGNUP_URL;

        case "SIGNIN_URL":
        return AUTH_API_URL + SIGNIN_URL;

        case "UPDATE_PAYMENT_METHOD":
        return ADMIN_PROFILE_URL + UPDATE_PAYMENT_METHOD;

        case "GET_ALL_USER_PROFILE":
        return ADMIN_PROFILE_URL + GET_ALL_USER_PROFILE;

      case "GET_HOME_CAROUSEL_IMAGES":
        return HOME_CAROUSEL_API_URL + GET_HOME_CAROUSEL_IMAGES;

        case "ADMIN_PROFILE_DETAILS":
        return ADMIN_PROFILE_URL + ADMIN_PROFILE_DETAILS;

        case "UPDATE_USER_PASSWORD":
        return ADMIN_PROFILE_URL + UPDATE_USER_PASSWORD;

        case "UPDATE_USER_DETAILS":
        return ADMIN_PROFILE_URL + UPDATE_USER_DETAILS;

        case "UPDATE_ADMIN_PROFILE_DETAILS":
        return ADMIN_PROFILE_URL + UPDATE_ADMIN_PROFILE_DETAILS;

      case "CHECKOUT_USER_CART":
        return CART_API_URL + CHECKOUT_USER_CART;

        case "CREATE_SINGLE_CART_RECORD":
        return CART_API_URL + CREATE_SINGLE_CART_RECORD;

        case "GET_USER_CART":
        return CART_API_URL + GET_USER_CART;

        case "DELETE_USER_CART":
        return CART_API_URL + DELETE_USER_CART;

        case "PLACE_ORDER":
        return ORDERS_API_URL + PLACE_ORDER;

      case "DEC_CART_ITEM_QUANTITY":
        return CART_API_URL + DEC_CART_ITEM_QUANTITY;

        case "INC_CART_ITEM_QUANTITY":
          return CART_API_URL + INC_CART_ITEM_QUANTITY;

      case "GET_ADMIN_ORDERS":
        return ORDERS_API_URL + GET_ADMIN_ORDERS;
        case "GET_USER_ORDERS":
          return ORDERS_API_URL + GET_USER_ORDERS;

          case "GET_USER_ORDERS_BY_DATE":
          return ORDERS_API_URL + GET_USER_ORDERS_BY_DATE;

          case "GET_USER_ORDERS_BY_ORDER_ID":
          return ORDERS_API_URL + GET_USER_ORDERS_BY_ORDER_ID;

          case "GET_ADMIN_ORDERS_BY_DATE":
          return ORDERS_API_URL + GET_ADMIN_ORDERS_BY_DATE;

          case "GET_ADMIN_ORDERS_BY_ORDER_ID":
          return ORDERS_API_URL + GET_ADMIN_ORDERS_BY_ORDER_ID;

          case "GET_ADMIN_ORDERS_BY_CLIENT_NAME":
          return ORDERS_API_URL + GET_ADMIN_ORDERS_BY_CLIENT_NAME;

          
      case "SAVE_COUPON":
        return COUPON_API_URL + SAVE_COUPON;
      case "GET_COUPONS":
        return COUPON_API_URL + GET_COUPONS;
      case "DELETE_COUPON":
        return COUPON_API_URL + DELETE_COUPON;
      case "EDIT_COUPON":
        return COUPON_API_URL + EDIT_COUPON;
      case "GET_COUPON_BY_ID":
        return COUPON_API_URL + GET_COUPON_BY_ID;

      case "GET_COUPON_BY_NAME":
        return COUPON_API_URL + GET_COUPON_BY_NAME;

      case "SAVE_CATEGORY":
        return CATEGORIES_API_URL + SAVE_CATEGORY;
      case "GET_CATEGORIES":
        return CATEGORIES_API_URL + GET_CATEGORIES;
      case "DELETE_CATEGORY":
        return CATEGORIES_API_URL + DELETE_CATEGORY;
      case "EDIT_CATEGORY":
        return CATEGORIES_API_URL + EDIT_CATEGORY;
      case "GET_CATEGORY_BY_ID":
        return CATEGORIES_API_URL + GET_CATEGORY_BY_ID;

      case "SAVE_LICENSE":
        return LICENSES_API_URL + SAVE_LICENSE;
        case "GET_GAME_LICENSES":
          return LICENSES_API_URL + GET_GAME_LICENSES;
      case "DELETE_LICENSE":
        return LICENSES_API_URL + DELETE_LICENSE;
      case "EDIT_LICENSE":
        return LICENSES_API_URL + EDIT_LICENSE;

      case "SAVE_PLATFORM":
        return PLATFORM_API_URL + SAVE_PLATFORM;
      case "GET_PLATFORMS":
        return PLATFORM_API_URL + GET_PLATFORMS;
      case "DELETE_PLATFORM":
        return PLATFORM_API_URL + DELETE_PLATFORM;
      case "EDIT_PLATFORM":
        return PLATFORM_API_URL + EDIT_PLATFORM;
      case "GET_PLATFORM_BY_ID":
        return PLATFORM_API_URL + GET_PLATFORM_BY_ID;

      case "GET_ADMIN_ITEMS":
        return ADMIN_ITEMS_API_URL + GET_ADMIN_ITEMS;
      case "SAVE_ADMIN_ITEM":
        return ADMIN_ITEMS_API_URL + SAVE_ADMIN_ITEM;
      case "DELETE_ADMIN_ITEM":
        return ADMIN_ITEMS_API_URL + DELETE_ADMIN_ITEM;
      case "ACTIVATE_ADMIN_ITEM":
        return ADMIN_ITEMS_API_URL + ACTIVATE_ADMIN_ITEM;
      case "GET_ITEM_BY_ID":
        return ADMIN_ITEMS_API_URL + GET_ITEM_BY_ID;
      case "GET_SETTINGS":
        return SETTINGS_API_URL + GET_SETTINGS;
      case "GET_SETTING_BY_ID":
        return SETTINGS_API_URL + GET_SETTING_BY_ID;
      case "SAVE_SETTINGS":
        return SETTINGS_API_URL + SAVE_SETTINGS;
      case "GET_PARAM_VALUE_BY_NAME":
        return HOME_API_URL + GET_PARAM_VALUE_BY_NAME;

      case "AUTHENTICATE_USER":
        return AUTHENTICATION_API_URL + AUTHENTICATE_USER;
      case "AUTHENTICATE_ADMIN":
        return AUTHENTICATION_API_URL + AUTHENTICATE_ADMIN;
      case "HOME_GET_ALL_ITEMS":
        return HOME_API_URL + HOME_GET_ALL_ITEMS;
      case "HOME_GET_ITEM_BY_ID":
        return HOME_API_URL + HOME_GET_ITEM_BY_ID;
      case "HOME_GET_CUSTOM_ITEM_BY_ID":
        return HOME_API_URL + HOME_GET_CUSTOM_ITEM_BY_ID;
      case "HOME_GET_ARRAY_OF_ITEMS":
        return HOME_API_URL + HOME_GET_ARRAY_OF_ITEMS;

        case "GET_CAROUSEL_IMAGES":
        return CAROUSEL_API_URL + GET_CAROUSEL_IMAGES;
        case "DELETE_CAROUSEL_IMAGE":
        return CAROUSEL_API_URL + DELETE_CAROUSEL_IMAGE;
        case "SAVE_CAROUSEL_IMAGE":
        return CAROUSEL_API_URL + SAVE_CAROUSEL_IMAGE;

      default:
        return "Service not found!";
    }
  };
}
