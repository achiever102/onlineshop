package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
        System.out.println(coupon.toString());
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

    @GetMapping(path = "/getByCouponName/{couponId}")
    public Coupon getCouponByName(@PathVariable("couponId") String couponId){
        Coupon coupon = couponService.getCouponByName(couponId);
        return coupon;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteCouponById(@PathVariable("id") long id){
        System.out.println(id);
        couponService.delete(id);
        return ResponseEntity.ok("");
    }
}
