package com.achievers.onlineshop.service.client;


import com.achievers.onlineshop.model.client.Cart;

import java.util.List;

public interface CartService {

    public List<Cart> getAll();

    public Cart getById(Long id);

    public void add(Cart cart);

    public void delete(long cartId);

    public void update(Cart cart);

    public List<Cart> getByUserId(long ownerId);

}