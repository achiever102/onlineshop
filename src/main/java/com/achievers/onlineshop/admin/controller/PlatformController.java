package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.Category;
import com.achievers.onlineshop.admin.model.Platform;
import com.achievers.onlineshop.admin.service.CategoryService;
import com.achievers.onlineshop.admin.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/platform")
public class PlatformController {

    @Autowired
    private PlatformService platformService;

    @PutMapping(path = "/save")
    public ResponseEntity saveCategory(@RequestBody Platform platform){
        List<Platform> itemExists = platformService.getPlatformByName(platform.getPlatformName());
        if(itemExists.size() > 0){
            return ResponseEntity.badRequest().body("Platform already exists!");
        } else {
            platformService.add(platform);
            return ResponseEntity.ok("Created!");
        }
    }

    @GetMapping(path = "/getAll")
    public List<Platform> getCategories(){
        List<Platform> platforms = platformService.getAll();
        return platforms;
    }

    @GetMapping(path = "/getById/{id}")
    public Platform getPlatformById(@PathVariable("id") long id){
        Platform platform = platformService.getById(id);
        return platform;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deletePlatformById(@PathVariable("id") long id){
        platformService.delete(id);
        return ResponseEntity.ok("");
    }
}
