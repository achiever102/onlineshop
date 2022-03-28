package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.PaymentMethod;


public interface PaymentMethodService {

    public PaymentMethod getByUserId(Long id);

    public void add(PaymentMethod paymentMethod);

    public void update(PaymentMethod paymentMethod);

}

