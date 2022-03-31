package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.repository.CouponRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Override
    public List<Coupon> getCouponsFromJson(String couponsJson) {
        List<Coupon> appliedCoupons = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(couponsJson);
            appliedCoupons = objectMapper.convertValue(jsonNode, new TypeReference<List<Coupon>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return appliedCoupons;
    }
}
