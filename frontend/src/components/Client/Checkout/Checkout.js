import axios from "axios";
import React, { useState, useContext } from "react";
import { Button, FormControl, Badge, InputGroup } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

export default function Checkout(props) {

  const { setAppliedCoupons } = useContext(AuthContext);

  const navigate = useNavigate();

  const [state, setState] = useState({
    taxValue: 0,
    validCouponId: null,
    couponDetails: {},
    couponIdField: "",
    appliedCoupons: [],
    itemsTotalPriceWithCoupons: 0,
    showCouponFieldError: false
  });

  const handleInputChange = (event) => {
    setState({
      ...state,
      couponIdField: event.target.value,
      validCouponId: null,
      couponDetails: {}
    })    
  };

  const handleCheckout = () => {
    if (
      !localStorage.getItem("username") ||
      localStorage.getItem("username") === "" ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      navigate("/signin");
    } else if (
      localStorage.getItem("username") ||
      localStorage.getItem("username") !== "" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      navigate(`/clientCheckout`);
    }
  };

  const validateCouponId = () => {
    if (state.couponIdField !== "") {
      axios
        .get(`${UrlLocator.getApiUrl("GET_COUPON_BY_NAME")}/${state.couponIdField}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          if (res.data.couponId === state.couponIdField) {
            let tempAppliedCoupons = state.appliedCoupons;
            //tempAppliedCoupons.push(res.data);

            let duplicateCoupon = false;
            tempAppliedCoupons.forEach((element) => {
              if(element.id === res.data.id && element.couponId === res.data.couponId){
                duplicateCoupon = true;
              }
            })

            if(duplicateCoupon === false){
              tempAppliedCoupons.push(res.data)
            }


            let couponsSum = 0;

            tempAppliedCoupons.forEach((element) => {
              couponsSum = couponsSum + element.percentage;
            })

            let itemsTotalPriceWithCoupons = (props.itemsTotalPrice - props.itemsTotalPrice * couponsSum / 100).toFixed(2);

            setAppliedCoupons(tempAppliedCoupons);

            setState({
              ...state,
              appliedCoupons: tempAppliedCoupons,
              validCouponId: true,
              couponDetails: res.data,
              itemsTotalPriceWithCoupons: itemsTotalPriceWithCoupons,
              showCouponFieldError: false
            })


            
          } else {
            setState({
              ...state,
              validCouponId: false,
              couponDetails: {},
              showCouponFieldError: false
            })
          }
        });
    } else {
      setState({...state, showCouponFieldError: true})
    }
  };

  return (
    <div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 d-flex justify-content-end">
          <h5 className="text-center">
            <b>Subtotal:</b>
          </h5>
        </div>
        <div className="col-3 d-flex justify-content-start">
          ${state.appliedCoupons.length > 0 ? parseFloat(state.itemsTotalPriceWithCoupons).toFixed(2) : (parseFloat(props.itemsTotalPrice)).toFixed(2)}
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 d-flex justify-content-end">
          <h5 className="text-center">
            <b>Number of items:</b>
          </h5>
        </div>
        <div className="col-3 d-flex justify-content-start">{props.count}</div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3"></div>
        <div className="col-3">
          
        {state.validCouponId && state.couponIdField === state.couponDetails.couponId ? (
                null
              ) : state.validCouponId !== null &&
                state.validCouponId === false &&
                state.couponIdField !== "" &&
                state.couponIdField !== state.couponDetails.couponId ? (
                <Badge className="bg-danger">Invalid coupon</Badge>
              ) : null}

        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 d-flex justify-content-end">
          <h5 className="text-center">
            <b>Coupon:</b>
          </h5>
        </div>
        <div className="col-3 d-flex justify-content-start">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Enter Coupon"
              onChange={handleInputChange}
              name="couponId"
              size="sm"
              isInvalid={ state.showCouponFieldError }
            />
            {/*<InputGroup.Text id="basic-addon2">
              
                </InputGroup.Text>*/}

            <Button
              variant="outline-light"
              onClick={validateCouponId}
              size="sm"
              className="mx-1"
            >
              Apply
            </Button>
          </InputGroup>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3"></div>
        <div className="col-3">
          {state.appliedCoupons.map((item) => {
            return (


              <Badge key={item.id} bg="success" style={{marginRight: "5px"}}>{item.couponId}: {item.percentage}%</Badge>

              
            );
          })}
        </div>
        <div className="col-3"></div>
      </div>

      <div className="text-center mt-3">
        <Button
          variant="outline-light"
          style={{ width: "" }}
          size="md"
          onClick={() => handleCheckout()}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
