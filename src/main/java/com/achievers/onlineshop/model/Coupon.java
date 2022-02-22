package com.achievers.onlineshop.model;

import javax.persistence.*;

@Entity
@Table(name = "Coupon")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "COUPON_ID")
    private String couponId;

    @Column(name = "PERCENTAGE")
    private float percentage;

    public Coupon(String couponId, float percentage) {
        this.couponId = couponId;
        this.percentage = percentage;
    }

    public Coupon() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", couponId='" + couponId + '\'' +
                ", percentage=" + percentage +
                '}';
    }
}
