package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Setting;

import java.util.List;

public interface SettingService {

    public List<Setting> getAll();

    public Setting getById(Long id);

    public void add(Setting setting);

    public void update(Setting setting);

}

