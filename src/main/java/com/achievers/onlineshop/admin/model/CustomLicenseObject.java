package com.achievers.onlineshop.admin.model;

import java.util.List;

public class CustomLicenseObject {

    private Item item;

    private List<License> licenseList;

    public CustomLicenseObject(Item item, List<License> licenseList) {
        this.item = item;
        this.licenseList = licenseList;
    }

    public CustomLicenseObject() {
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public List<License> getLicenseList() {
        return licenseList;
    }

    public void setLicenseList(List<License> licenceList) {
        this.licenseList = licenceList;
    }
}
