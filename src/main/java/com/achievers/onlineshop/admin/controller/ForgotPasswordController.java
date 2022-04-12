package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.service.ForgotPasswordService;
import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/forgotPassword")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot/{email}")
    public ResponseEntity forgotPasswordRequest(@PathVariable("email") String email){
        boolean IsValidUser = userRepository.existsByEmail(email);

        boolean passwordResetTokenCreatedSuccessfully = false;
        if(IsValidUser){
            Optional<User> user = userRepository.findByEmailAddress(email);
            passwordResetTokenCreatedSuccessfully = forgotPasswordService.resetPassword(user.get());
        }

        return ResponseEntity.ok("");
    }

    @PostMapping("/reset")
    public ResponseEntity resetPasswordRequest(@RequestParam("newPassword") String newPassword, @RequestParam("resetPasswordTokenId") String resetPasswordTokenId){


        ResponseEntity responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);

        Optional<User> user = Optional.of(userRepository.getUserByResetTokenId(resetPasswordTokenId).orElse(new User()));

        if(user.get().getFullName() != null){
            User storedUser = user.get();

            if(storedUser.getPasswordResetTokenValidUntil() == 0){
                return ResponseEntity.badRequest().body("ERR: Your request to reset the password is not valid any more. You can submit a new password reset request!");
            } else if(System.currentTimeMillis() > storedUser.getPasswordResetTokenValidUntil()){
                storedUser.setPasswordResetToken("");
                storedUser.setPasswordResetTokenValidUntil(0);
                userRepository.save(storedUser);
                return ResponseEntity.badRequest().body("ERR: Your request to reset the password is not valid any more. You can submit a new password reset request!");
            } else {
                storedUser.setPassword(encoder.encode(newPassword));
                storedUser.setPasswordResetToken("");
                storedUser.setPasswordResetTokenValidUntil(0);
                userRepository.save(storedUser);
                forgotPasswordService.sendSuccessPasswordResetEmail(storedUser);
                return ResponseEntity.ok("");
            }


        } else {
            return ResponseEntity.badRequest().body("ERR: Invalid reset password request!");
        }

    }

}
