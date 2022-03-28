package com.achievers.onlineshop.client.model;

import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.security.model.User;

import java.util.List;

public class CustomProfileObject {

    private long userId;

    private PaymentMethod paymentMethod;

    private CustomUserObject customUserObject;

    public CustomProfileObject(long userId, PaymentMethod paymentMethod, CustomUserObject customUserObject) {
        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.customUserObject = customUserObject;
    }

    public CustomProfileObject() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public CustomUserObject getCustomUserObject() {
        return customUserObject;
    }

    public void setCustomUserObject(CustomUserObject customUserObject) {
        this.customUserObject = customUserObject;
    }
}
