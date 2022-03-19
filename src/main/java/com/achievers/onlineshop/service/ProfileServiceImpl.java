package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.Profile;
import com.achievers.onlineshop.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<Profile> getAll() {
        return profileRepository.findAll();
    }

    @Override
    public Profile getById(Long id) {
        return profileRepository.findById(id).get();
    }

    @Override
    public void add(Profile profile) {
        profileRepository.save(profile);
    }

    @Override
    public void delete(long profileId) {
        profileRepository.delete(profileRepository.getById(profileId));
    }

    @Override
    public void update(Profile profile) {

    }
}
