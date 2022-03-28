package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    public List<Item> getAll();

    public Item getById(Long id);

    public void add(String itemName, String itemPrice, String itemQuantity, MultipartFile itemImage,
                    int itemCategory, boolean itemOnSale, float itemSaleValue, String itemDescription, int itemPlatform, String itemStatus);

    public void update(long id, String itemName, String itemPrice, String itemQuantity, MultipartFile itemImage,
                       int itemCategory, boolean itemOnSale, float itemSaleValue, String itemDescription, int itemPlatform, String itemStatus);

    public void updateItemStatusOrQuantity(Item item);

}
