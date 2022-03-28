package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Platform;

import java.util.List;

public interface PlatformService {

    public List<Platform> getAll();

    public Platform getById(Long id);

    public void add(Platform platform);

    public void delete(Long id);

    public void update(Platform platform);

}

