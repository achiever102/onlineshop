package com.achievers.onlineshop.client.model;

import java.util.List;

public class CustomCheckoutObject {

    private List<CustomClientCartObject> itemList;

    private float taxValue;

    private PaymentMethod paymentMethod;

    private float subTotal;

    private int itemsCount;

    private float totalAmount;

    private float subTotalTaxValue;

    private List<String> updatedItems;

    public CustomCheckoutObject(List<CustomClientCartObject> itemList, float taxValue, PaymentMethod paymentMethod) {
        this.itemList = itemList;
        this.taxValue = taxValue;
        this.paymentMethod = paymentMethod;
    }

    public CustomCheckoutObject() {
    }

    public List<String> getUpdatedItems() {
        return updatedItems;
    }

    public void setUpdatedItems(List<String> updatedItems) {
        this.updatedItems = updatedItems;
    }

    public float getSubTotalTaxValue() {
        return subTotalTaxValue;
    }

    public void setSubTotalTaxValue(float subTotalTaxValue) {
        this.subTotalTaxValue = subTotalTaxValue;
    }

    public float getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(float subTotal) {
        this.subTotal = subTotal;
    }

    public int getItemsCount() {
        return itemsCount;
    }

    public void setItemsCount(int itemsCount) {
        this.itemsCount = itemsCount;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CustomClientCartObject> getItemList() {
        return itemList;
    }

    public void setItemList(List<CustomClientCartObject> itemList) {
        this.itemList = itemList;
    }

    public float getTaxValue() {
        return taxValue;
    }

    public void setTaxValue(float taxValue) {
        this.taxValue = taxValue;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
