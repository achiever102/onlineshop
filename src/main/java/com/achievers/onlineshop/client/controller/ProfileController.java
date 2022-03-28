package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.service.ItemService;
import com.achievers.onlineshop.client.model.*;
import com.achievers.onlineshop.client.service.CartService;
import com.achievers.onlineshop.client.service.OrderItemService;
import com.achievers.onlineshop.client.service.OrderService;
import com.achievers.onlineshop.client.service.PaymentMethodService;
import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.payload.response.MessageResponse;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/profile")
public class ProfileController {

    @Autowired
    private PaymentMethodService paymentMethodService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/getAdminUserDetails/{username}")
    public CustomUserObject getAdminUserDetails(@PathVariable("username") String username){
        Optional<User> user = userRepository.findByUsername(username);

        CustomUserObject customUserObject = new CustomUserObject();
        customUserObject.setUsername(user.get().getUsername());
        customUserObject.setFullName(user.get().getFullName());

        return customUserObject;
    }


    @GetMapping("/getAll/{username}")
    public CustomProfileObject getAll(@PathVariable("username") String username){
        CustomProfileObject customProfileObject = new CustomProfileObject();

        Optional<User> user = userRepository.findByUsername(username);

        CustomUserObject customUserObject = new CustomUserObject();
        customUserObject.setFullName(user.get().getFullName());
        customUserObject.setUserId(user.get().getId());
        customUserObject.setEmail(user.get().getEmail());
        customUserObject.setUsername(user.get().getUsername());

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod = paymentMethodService.getByUserId(user.get().getId());



        customProfileObject.setPaymentMethod(paymentMethod);
        customProfileObject.setUserId(user.get().getId());
        customProfileObject.setCustomUserObject(customUserObject);

        return customProfileObject;
    }

    @PutMapping("/updatePaymentMethod/{userId}")
    public ResponseEntity updatePaymentMethod(@PathVariable("userId") long userId, @RequestBody PaymentMethod paymentMethod){
        PaymentMethod storedPaymentMethod = paymentMethodService.getByUserId(userId);

        if(storedPaymentMethod != null){
            storedPaymentMethod.setCardNumber(paymentMethod.getCardNumber());
            storedPaymentMethod.setCardName(paymentMethod.getCardName());
            storedPaymentMethod.setCardCcv(paymentMethod.getCardCcv());
            storedPaymentMethod.setCardExpDate(paymentMethod.getCardExpDate());
            storedPaymentMethod.setUserId(userId);
            paymentMethodService.update(storedPaymentMethod);
        } else {
            paymentMethod.setUserId(userId);
            paymentMethodService.add(paymentMethod);
        }

        return ResponseEntity.ok("");
    }

    @PutMapping("/updateUserDetails/{userId}")
    public ResponseEntity updateUserDetails(@PathVariable("userId") long userId, @RequestBody User user){

        User storedUser = userRepository.getById(userId);
        //Optional<User> storedUser = userRepository.findByUsername(username);

        storedUser.setEmail(user.getEmail());
        storedUser.setUsername(user.getUsername());
        storedUser.setFullName(user.getFullName());
        userRepository.save(storedUser);

        return ResponseEntity.ok("");
    }

    @PutMapping("/updateUserPassword/{userId}")
    public ResponseEntity updateUserPassword(@PathVariable("userId") long userId, @RequestBody ChangePasswordObject changePasswordObject){

        User storedUser = userRepository.getById(userId);

        if(encoder.matches(changePasswordObject.getCurrentPassword(), storedUser.getPassword())){
            storedUser.setPassword(encoder.encode(changePasswordObject.getNewPassword()));
            userRepository.save(storedUser);
            return ResponseEntity.ok("");
        }else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid current password!"));
        }

    }




}
