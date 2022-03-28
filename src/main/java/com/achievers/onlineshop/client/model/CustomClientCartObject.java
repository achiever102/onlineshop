package com.achievers.onlineshop.client.model;

import com.achievers.onlineshop.admin.model.Item;

import javax.persistence.Column;

public class CustomClientCartObject {

    private String itemName;

    private float itemPrice;

    private boolean itemOnSale;

    private float itemSaleValue;

    private String itemDescription;

    private String itemImage;

    private int itemCategory;

    private int itemPlatform;

    private String itemStatus;

    private long itemId;

    private int itemQuantity;

    private int itemExistingQuantity;

    private float cartItemTotalAmount;

    public CustomClientCartObject(long itemId, int itemQuantity) {
        this.itemId = itemId;
        this.itemQuantity = itemQuantity;
    }

    public CustomClientCartObject(String itemName, float itemPrice, boolean itemOnSale, float itemSaleValue, String itemDescription, String itemImage, int itemCategory, int itemPlatform, String itemStatus, long itemId, int itemQuantity, int itemExistingQuantity, float cartItemTotalAmount) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemOnSale = itemOnSale;
        this.itemSaleValue = itemSaleValue;
        this.itemDescription = itemDescription;
        this.itemImage = itemImage;
        this.itemCategory = itemCategory;
        this.itemPlatform = itemPlatform;
        this.itemStatus = itemStatus;
        this.itemId = itemId;
        this.itemQuantity = itemQuantity;
        this.itemExistingQuantity = itemExistingQuantity;
        this.cartItemTotalAmount = cartItemTotalAmount;
    }

    public CustomClientCartObject() {
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public float getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(float itemPrice) {
        this.itemPrice = itemPrice;
    }

    public boolean isItemOnSale() {
        return itemOnSale;
    }

    public void setItemOnSale(boolean itemOnSale) {
        this.itemOnSale = itemOnSale;
    }

    public float getItemSaleValue() {
        return itemSaleValue;
    }

    public void setItemSaleValue(float itemSaleValue) {
        this.itemSaleValue = itemSaleValue;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public int getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(int itemCategory) {
        this.itemCategory = itemCategory;
    }

    public int getItemPlatform() {
        return itemPlatform;
    }

    public void setItemPlatform(int itemPlatform) {
        this.itemPlatform = itemPlatform;
    }

    public String getItemStatus() {
        return itemStatus;
    }

    public void setItemStatus(String itemStatus) {
        this.itemStatus = itemStatus;
    }

    public float getCartItemTotalAmount() {
        return cartItemTotalAmount;
    }

    public void setCartItemTotalAmount(float cartItemTotalAmount) {
        this.cartItemTotalAmount = cartItemTotalAmount;
    }

    public int getItemExistingQuantity() {
        return itemExistingQuantity;
    }

    public void setItemExistingQuantity(int itemExistingQuantity) {
        this.itemExistingQuantity = itemExistingQuantity;
    }
}
