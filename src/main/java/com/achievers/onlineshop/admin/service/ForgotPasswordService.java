package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.security.model.User;

import java.util.List;

public interface ForgotPasswordService {

    public boolean resetPassword(User user);

    public void sendSuccessPasswordResetEmail(User user);

}


