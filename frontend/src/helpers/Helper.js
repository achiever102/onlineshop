export default class Helper {
  static getApiUrl = (service) => {
  const COUPON_API_URL = "/api/admin/coupon";
  const SAVE_COUPON = "/save";
  const GET_COUPONS = "/getAll";
  const DELETE_COUPON = '/delete';
  const EDIT_COUPON = '/editCoupon';
  const GET_COUPON_BY_ID = '/getById';

  switch (service) {
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
    default:
      return "Service not found!";
  }
  };
}