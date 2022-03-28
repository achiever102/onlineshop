package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Licence;
import com.achievers.onlineshop.admin.repository.LicencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicencesServiceImpl implements LicencesService{

    @Autowired
    private LicencesRepository licencesRepository;

    @Override
    public List<Licence> getAll() {
        return licencesRepository.findAll();
    }

    @Override
    public List<Licence> getGameLicences(long gameId) {
        return licencesRepository.getGameLicences(gameId);
    }

    @Override
    public Licence getById(Long id) {
        return licencesRepository.findById(id).get();
    }

    @Override
    public void add(Licence licence) {
        licencesRepository.save(licence);
    }

    @Override
    public void delete(Long id) {
        licencesRepository.delete(licencesRepository.getById(id));
    }

    @Override
    public void update(Licence licence) {

    }
}
