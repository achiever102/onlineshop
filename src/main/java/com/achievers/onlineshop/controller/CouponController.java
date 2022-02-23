package com.achievers.onlineshop.controller;

import com.achievers.onlineshop.model.Coupon;
import com.achievers.onlineshop.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/admin/coupon")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @PutMapping(path = "/save")
    public ResponseEntity saveCoupon(@RequestBody Coupon coupon){
        couponService.add(coupon);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Coupon> getCoupons(){
        List<Coupon> coupons = couponService.getAll();
        return coupons;
    }

    @GetMapping(path = "/getById/{id}")
    public Coupon getCouponById(@PathVariable("id") long id){
        Coupon coupon = couponService.getById(id);
        return coupon;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteCouponBuId(@PathVariable("id") long id){
        System.out.println(id);
        couponService.delete(id);
        return ResponseEntity.ok("");
    }
}
