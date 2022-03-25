package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.Profile;

import java.util.List;

public interface ProfileService {

    public List<Profile> getAll();

    public Profile getById(Long id);

    public void add(Profile profile);

    public void delete(long profileId);

    public void update(Profile profile);

}
