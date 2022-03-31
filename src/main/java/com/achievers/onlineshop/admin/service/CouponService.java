package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Coupon;

import java.util.List;

public interface CouponService {

    public List<Coupon> getAll();

    public Coupon getById(Long id);

    public void add(Coupon coupon);

    public void delete(Long couponId);

    public void update(Coupon coupon);

    public Coupon getCouponByName(String couponId);

    public List<Coupon> getCouponsFromJson(String couponsJson);

}

