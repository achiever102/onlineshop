package com.achievers.onlineshop.admin.model;

import java.util.List;

public class CustomLicenceObject {

    private Item item;

    private List<Licence> licenceList;

    public CustomLicenceObject(Item item, List<Licence> licenceList) {
        this.item = item;
        this.licenceList = licenceList;
    }

    public CustomLicenceObject() {
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public List<Licence> getLicenceList() {
        return licenceList;
    }

    public void setLicenceList(List<Licence> licenceList) {
        this.licenceList = licenceList;
    }
}
