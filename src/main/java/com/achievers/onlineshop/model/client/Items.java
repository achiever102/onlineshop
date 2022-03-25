package com.achievers.onlineshop.model.client;

import javax.persistence.*;
@Entity
@Table(name = "Items")
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Column(name = "ITEM_PRICE")
    private long itemPrice;
    /*Will add more columns when we decide what exactly a game should have
      in their items
    */

    public Items(String itemName, long itemPrice) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }

    public Items() {

    }
    //Setters may only be in the admin view of items
    public long getId() { return id;}

    public void setId(long id) {this.id = id; }

    public String getItemName() { return itemName; }

    public void setItemName(String itemName) { this.itemName = itemName; }

    public long getItemPrice() { return itemPrice; }

    public void setItemPrice(long itemPrice) { this.itemPrice = itemPrice; }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", itemPrice=" + itemPrice +
                '}';
    }
}
