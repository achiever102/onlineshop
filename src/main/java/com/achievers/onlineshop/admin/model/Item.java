package com.achievers.onlineshop.admin.model;

import javax.persistence.*;

@Entity
@Table(name = "ITEMS")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Column(name = "ITEM_PRICE")
    private float itemPrice;

    @Column(name = "QUANTITY")
    private int itemQuantity;

    @Column(name = "ON_SALE")
    private boolean itemOnSale;

    @Column(name = "SALE_VALUE")
    private float itemSaleValue;

    @Column(name = "DESCRIPTION")
    private String itemDescription;

    @Column(name = "ITEM_IMAGE")
    private String itemImage;

    @Column(name = "ITEM_CATEGORY")
    private int itemCategory;

    @Column(name = "ITEM_PLATFORM")
    private int itemPlatform;

    @Column(name = "ITEM_STATUS")
    private String itemStatus;

    public Item(String itemName, float itemPrice, int itemQuantity, boolean itemOnSale, float itemSaleValue, String itemDescription, String itemImage, int itemCategory
    , int itemPlatform, String itemStatus) {
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

    public Item() {
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

    public int getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(int itemCategory) {
        this.itemCategory = itemCategory;
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
}
