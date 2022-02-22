
export function getApiUrl (service){
    const API_URL = "/api";
    const SAVE_COUPON = "/saveCoupon";
  
    switch (service) {
      case "SAVE_COUPON":
        return API_URL + SAVE_COUPON;
      default:
        return "Service not found!";
    }
  };