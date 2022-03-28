package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Licence;

import java.util.List;

public interface LicencesService {

    public List<Licence> getAll();

    public List<Licence> getGameLicences(long gameId);

    public Licence getById(Long id);

    public void add(Licence licence);

    public void delete(Long id);

    public void update(Licence licence);

}

