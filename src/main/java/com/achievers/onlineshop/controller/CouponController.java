package com.achievers.onlineshop.controller;

import com.achievers.onlineshop.model.Coupon;
import com.achievers.onlineshop.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/coupon")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PostMapping(path = "/save")
    public ResponseEntity saveCoupon(@RequestBody Coupon coupon){
        couponService.add(coupon);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Coupon> getCoupons(){
        List<Coupon> coupons = couponService.getAll();
        return coupons;
    }

    @DeleteMapping(path = "/deleteCoupon/{id}")
    public ResponseEntity deleteCouponBuId(@PathVariable("id") long id){
        System.out.println(id);
        couponService.delete(id);
        return ResponseEntity.ok("");
    }
}
