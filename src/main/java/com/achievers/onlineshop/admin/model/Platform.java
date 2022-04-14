package com.achievers.onlineshop.admin.model;

import javax.persistence.*;

@Entity
@Table(name = "Platforms")
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "PLATFORM_NAME")
    private String platformName;

    @Column(name = "PLATFORM_STATUS")
    private String platformStatus;

    public Platform(String platformName, String platformStatus) {
        this.platformName = platformName;
        this.platformStatus = platformStatus;
    }

    public Platform() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getPlatformStatus() {
        return platformStatus;
    }

    public void setPlatformStatus(String platformStatus) {
        this.platformStatus = platformStatus;
    }

    @Override
    public String toString() {
        return "Platform{" +
                "id=" + id +
                ", platformName='" + platformName + '\'' +
                ", platformStatus='" + platformStatus + '\'' +
                '}';
    }
}
