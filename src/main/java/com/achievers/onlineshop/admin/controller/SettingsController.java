package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.Setting;
import com.achievers.onlineshop.admin.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/settings")
public class SettingsController {

    @Autowired
    private SettingService settingsService;

    @PutMapping(path = "/save")
    public ResponseEntity saveSettings(@RequestBody Setting setting){
        settingsService.add(setting);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Setting> getSettings(){
        List<Setting> settings = settingsService.getAll();
        return settings;
    }

    @GetMapping(path = "/getById/{id}")
    public Setting getSettingById(@PathVariable("id") long id){
        Setting setting = settingsService.getById(id);
        return setting;
    }
}
