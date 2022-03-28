package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.client.model.Cart;

import java.util.List;

public interface CartService {

    public List<Cart> getAll();

    public Cart getById(Long id);

    public void add(Cart cart);

    public void delete(Long id);

    public void update(Cart cart);

    public List<Cart> getByUserId(long userId);

}

