package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.PaymentMethod;
import com.achievers.onlineshop.client.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethod getByUserId(Long id) {
        return paymentMethodRepository.getByUserId(id);
    }

    @Override
    public void add(PaymentMethod paymentMethod) {
        paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public void update(PaymentMethod paymentMethod) {
        paymentMethodRepository.save(paymentMethod);
    }
}
