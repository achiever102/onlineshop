export default class Helper {
  static getApiUrl = (service) => {
    const API_URL = "/api/coupon";
  const SAVE_COUPON = "/save";
  const GET_COUPONS = "/getAll";

  switch (service) {
    case "SAVE_COUPON":
      return API_URL + SAVE_COUPON;
    case "GET_COUPONS":
      return API_URL + GET_COUPONS;
    default:
      return "Service not found!";
  }
  };
}