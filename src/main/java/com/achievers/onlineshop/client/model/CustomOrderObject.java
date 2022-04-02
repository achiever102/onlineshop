package com.achievers.onlineshop.client.model;

import com.achievers.onlineshop.admin.model.Item;

import java.time.LocalDate;
import java.util.List;

public class CustomOrderObject {

    private String orderId;

    private String username;

    private String orderDate;

    private float orderTotalAmount;

    private List<CustomOrderItemObject> itemsList;

    private String appliedCoupons;

    private int orderItemsCount;

    private String licensesCsvFileDirectory;

    public CustomOrderObject(String orderId, String username, List<CustomOrderItemObject> itemsList, String orderDate, float orderTotalAmount, String appliedCoupons, int orderItemsCount, String licensesCsvFileDirectory) {
        this.orderId = orderId;
        this.username = username;
        this.itemsList = itemsList;
        this.orderDate = orderDate;
        this.orderTotalAmount = orderTotalAmount;
        this.appliedCoupons = appliedCoupons;
        this.orderItemsCount = orderItemsCount;
        this.licensesCsvFileDirectory = licensesCsvFileDirectory;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public float getOrderTotalAmount() {
        return orderTotalAmount;
    }

    public void setOrderTotalAmount(float orderTotalAmount) {
        this.orderTotalAmount = orderTotalAmount;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public List<CustomOrderItemObject> getItemsList() {
        return itemsList;
    }

    public void setItemsList(List<CustomOrderItemObject> itemsList) {
        this.itemsList = itemsList;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAppliedCoupons() {
        return appliedCoupons;
    }

    public void setAppliedCoupons(String appliedCoupons) {
        this.appliedCoupons = appliedCoupons;
    }

    public int getOrderItemsCount() {
        return orderItemsCount;
    }

    public void setOrderItemsCount(int orderItemsCount) {
        this.orderItemsCount = orderItemsCount;
    }

    public String getLicensesCsvFileDirectory() {
        return licensesCsvFileDirectory;
    }

    public void setLicensesCsvFileDirectory(String licensesCsvFileDirectory) {
        this.licensesCsvFileDirectory = licensesCsvFileDirectory;
    }
}
