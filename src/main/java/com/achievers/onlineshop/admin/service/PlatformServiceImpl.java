package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Platform;
import com.achievers.onlineshop.admin.repository.PlatformRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlatformServiceImpl implements PlatformService{

    @Autowired
    private PlatformRepository platformRepository;

    @Override
    public List<Platform> getAll() {
        return platformRepository.findAll();
    }

    @Override
    public Platform getById(Long id) {
        return platformRepository.findById(id).get();
    }

    @Override
    public void add(Platform platform) {
        platformRepository.save(platform);
    }

    @Override
    public void delete(Long id) {
        platformRepository.delete(platformRepository.getById(id));
    }

    @Override
    public void update(Platform platform) {
    }

    @Override
    public List<Platform> getPlatformByName(String platformName) {
        return platformRepository.getPlatformByName(platformName);
    }
}
