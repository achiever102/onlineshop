package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean resetPassword(User user) {

        String resetPasswordToken = UUID.randomUUID().toString();

        long millis = System.currentTimeMillis();
        user.setPasswordResetToken(resetPasswordToken);
        user.setPasswordResetTokenValidUntil(millis + 60000 * 30);

        sendEmail(user);

        userRepository.save(user);

        return true;
    }

    private void sendEmail(User user) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("sw.project.2841324@gmail.com");

        msg.setSubject("LUDOS - RESET PASSWORD LINK");
        msg.setText("Hello " + user.getFullName() + ",\n\nClick on the below link to reset your password:" + "\n\nhttp://localhost:3000/resetPassword/" + user.getPasswordResetToken());

        javaMailSender.send(msg);

    }

    public void sendSuccessPasswordResetEmail(User user) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("sw.project.2841324@gmail.com");

        msg.setSubject("LUDOS - PASSWORD RESET SUCCESSFULLY");
        msg.setText("Hello " + user.getFullName() + ",\n\nYour password was reset successfully.");

        javaMailSender.send(msg);

    }

}
