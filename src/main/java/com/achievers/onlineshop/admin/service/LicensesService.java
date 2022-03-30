package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.License;

import java.util.List;

public interface LicensesService {

    public List<License> getAll();

    public List<License> getGameLicenses(long gameId);

    public License getById(Long id);

    public License add(License license);

    public boolean delete(Long id);

    public void update(License license);

    public boolean isDuplicateLicense(long gameId, String licenceId);

}

