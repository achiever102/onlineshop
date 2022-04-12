package com.achievers.onlineshop.admin.model;

public class CustomResetPasswordObject {

    private String newPassword;
    private String resetPasswordTokenId;

    public CustomResetPasswordObject(String newPassword, String resetPasswordTokenId) {
        this.newPassword = newPassword;
        this.resetPasswordTokenId = resetPasswordTokenId;
    }

    public CustomResetPasswordObject() {
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getResetPasswordTokenId() {
        return resetPasswordTokenId;
    }

    public void setResetPasswordTokenId(String resetPasswordTokenId) {
        this.resetPasswordTokenId = resetPasswordTokenId;
    }

    @Override
    public String toString() {
        return "CustomResetPasswordObject{" +
                "newPassword='" + newPassword + '\'' +
                ", resetPasswordTokenId='" + resetPasswordTokenId + '\'' +
                '}';
    }
}
