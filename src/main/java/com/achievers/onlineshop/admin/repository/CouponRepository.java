package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    @Query(value = "SELECT * FROM COUPON WHERE COUPON_ID=:couponId", nativeQuery = true)
    Coupon getCouponByName(@Param("couponId") String couponId);

}
