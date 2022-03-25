package com.achievers.onlineshop.controller;

import com.achievers.onlineshop.model.Profile;
import com.achievers.onlineshop.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/admin/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PutMapping(path = "/save")
    public ResponseEntity saveProfile(@RequestBody Profile profile){
        System.out.println(profile.toString());
        profileService.add(profile);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Profile> getProfile(){
        List<Profile> profile = profileService.getAll();
        return profile;
    }

    @GetMapping(path = "/getById/{id}")
    public Profile getProfileById(@PathVariable("id") long id){
        Profile profile = profileService.getById(id);
        return profile;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteProfileBuId(@PathVariable("id") Long id){
        System.out.println(id);
        profileService.delete(id);
        return ResponseEntity.ok("");
    }
}
