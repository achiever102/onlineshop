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
    const PLACE_ORDER = '/placeAnOrder';

    const GET_ADMIN_ORDERS = '/getAdminOrders';
    const GET_USER_ORDERS = '/getUserOrders';

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

    switch (service) {

      case "CHECKOUT_USER_CART":
        return CART_API_URL + CHECKOUT_USER_CART;

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
      default:
        return "Service not found!";
    }
  };
}
