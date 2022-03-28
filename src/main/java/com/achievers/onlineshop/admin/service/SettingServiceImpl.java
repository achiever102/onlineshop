package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.model.Setting;
import com.achievers.onlineshop.admin.repository.CouponRepository;
import com.achievers.onlineshop.admin.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingServiceImpl implements SettingService{

    @Autowired
    private SettingRepository settingRepository;

    @Override
    public List<Setting> getAll() {
        return settingRepository.findAll();
    }

    @Override
    public Setting getById(Long id) {
        return settingRepository.findById(id).get();
    }

    @Override
    public void add(Setting setting) {
        settingRepository.save(setting);
    }

    @Override
    public void update(Setting setting) {
    }
}
