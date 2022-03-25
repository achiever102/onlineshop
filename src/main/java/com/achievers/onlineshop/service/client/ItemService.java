package com.achievers.onlineshop.service.client;

import com.achievers.onlineshop.model.client.Items;

import java.util.List;

public interface ItemService {
    public List<Items> getAll();

    public Items getById(Long id);

    public void add(Items item);

    public void delete(long itemId);

    public void update(Items item);
}
