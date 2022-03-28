package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponServiceImpl implements CouponService{

    @Autowired
    private CouponRepository couponRepository;

    @Override
    public List<Coupon> getAll() {
        return couponRepository.findAll();
    }

    @Override
    public Coupon getById(Long id) {
        return couponRepository.findById(id).get();
    }

    @Override
    public void add(Coupon coupon) {
        couponRepository.save(coupon);
    }

    @Override
    public void delete(Long couponId) {
        couponRepository.delete(couponRepository.getById(couponId));
    }

    @Override
    public void update(Coupon coupon) {

    }

    @Override
    public Coupon getCouponByName(String couponId) {
        return couponRepository.getCouponByName(couponId);
    }
}
