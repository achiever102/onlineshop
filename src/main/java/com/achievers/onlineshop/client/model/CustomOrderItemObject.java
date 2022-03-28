package com.achievers.onlineshop.client.model;

public class CustomOrderItemObject {

    private String itemName;

    private float itemPrice;

    private boolean itemOnSale;

    private float itemSaleValue;

    private String itemImage;

    private int itemPlatform;

    private long itemId;

    private int itemQuantity;

    public CustomOrderItemObject(String itemName, float itemPrice, boolean itemOnSale, float itemSaleValue, String itemImage, int itemPlatform, long itemId, int itemQuantity) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemOnSale = itemOnSale;
        this.itemSaleValue = itemSaleValue;
        this.itemImage = itemImage;
        this.itemPlatform = itemPlatform;
        this.itemId = itemId;
        this.itemQuantity = itemQuantity;
    }

    public CustomOrderItemObject() {
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

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public int getItemPlatform() {
        return itemPlatform;
    }

    public void setItemPlatform(int itemPlatform) {
        this.itemPlatform = itemPlatform;
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
}
