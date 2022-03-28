package com.achievers.onlineshop.admin.model;

import java.util.List;

public class CustomItemsObject {

    private List<Item> items;

    private List<Platform> platforms;


    private List<Category> categories;

    public CustomItemsObject(List<Item> items, List<Platform> platforms, List<Category> categories) {
        this.items = items;
        this.platforms = platforms;
        this.categories = categories;
    }

    public CustomItemsObject() {
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public List<Platform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<Platform> platforms) {
        this.platforms = platforms;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
