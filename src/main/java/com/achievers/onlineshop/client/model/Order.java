package com.achievers.onlineshop.client.model;

import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "order_id")
    private String orderId;

    @Column(name = "ORDER_DATE")
    private String orderDate;

    @Column(name = "ORDER_TOTAL_AMOUNT")
    private float orderTotalAmount;

    @Column(name = "ORDER_ITEMS_COUNT")
    private int orderItemsCount;

    @Column(name = "APPLIED_COUPONS")
    private String orderAppliedCoupons;

    @OneToMany(mappedBy="order", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<OrderItem> items;

    public Order(long userId, String orderId, String orderDate, float orderTotalAmount, int orderItemsCount) {
        this.userId = userId;
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.orderTotalAmount = orderTotalAmount;
        this.orderItemsCount = orderItemsCount;
    }

    public Order() {
    }

    public int getOrderItemsCount() {
        return orderItemsCount;
    }

    public void setOrderItemsCount(int orderItemsCount) {
        this.orderItemsCount = orderItemsCount;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public float getOrderTotalAmount() {
        return orderTotalAmount;
    }

    public void setOrderTotalAmount(float orderTotalAmount) {
        this.orderTotalAmount = orderTotalAmount;
    }

    public String getOrderAppliedCoupons() {
        return orderAppliedCoupons;
    }

    public void setOrderAppliedCoupons(String orderAppliedCoupons) {
        this.orderAppliedCoupons = orderAppliedCoupons;
    }
}
