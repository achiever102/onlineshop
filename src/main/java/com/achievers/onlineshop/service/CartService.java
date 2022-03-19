package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.Cart;

import java.util.List;

public interface CartService {

    public List<Cart> getAll();

    public Cart getById(Long id);

    public void add(Cart cart);

    public void delete(long cartId);

    public void update(Cart cart);

}
