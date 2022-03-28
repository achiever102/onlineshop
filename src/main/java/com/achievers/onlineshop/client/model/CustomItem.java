package com.achievers.onlineshop.client.model;

public class CustomItem {

    private long id;

    private String itemName;

    private float itemPrice;

    private int itemQuantity;

    private boolean itemOnSale;

    private float itemSaleValue;

    private String itemDescription;

    private String itemImage;

    private String itemCategory;

    private String itemPlatform;

    private String itemStatus;

    public CustomItem(long id, String itemName, float itemPrice, int itemQuantity, boolean itemOnSale, float itemSaleValue, String itemDescription, String itemImage, String itemCategory, String itemPlatform, String itemStatus) {
        this.id = id;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
        this.itemOnSale = itemOnSale;
        this.itemSaleValue = itemSaleValue;
        this.itemDescription = itemDescription;
        this.itemImage = itemImage;
        this.itemCategory = itemCategory;
        this.itemPlatform = itemPlatform;
        this.itemStatus = itemStatus;
    }

    public CustomItem() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
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

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemPlatform() {
        return itemPlatform;
    }

    public void setItemPlatform(String itemPlatform) {
        this.itemPlatform = itemPlatform;
    }

    public String getItemStatus() {
        return itemStatus;
    }

    public void setItemStatus(String itemStatus) {
        this.itemStatus = itemStatus;
    }
}
