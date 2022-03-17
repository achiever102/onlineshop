package com.achievers.onlineshop.model;

import javax.persistence.*;

@Entity
@Table(name = "Profile")

public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "PROFILE_ID")
    private long profileId;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "USER_NAME")
    private String userName;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NOTIFICATIONS")
    private boolean notifications;

    public Profile(long profileId, String userName, String email, boolean notifications) {
        this.profileId = profileId;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.notifications = notifications;
    }

    public Profile() {
    }

    public long getId() {  return id;  }

    public void setId(long id) {
        this.id = id;
    }

    public long getProfileId() {
        return profileId;
    }

    public void setProfileId(long profileId) {
        this.profileId = profileId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { this.password = password; }

    public boolean getNotifications() { return notifications;   }

    public void setNotifications(String email) { this.notifications = notifications;  }

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                ", profileId='" + profileId + '\'' +
                ", userName=" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", notifications=" + notifications +
                '}';
    }
}