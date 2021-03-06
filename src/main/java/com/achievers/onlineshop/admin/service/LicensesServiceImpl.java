package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.repository.LicensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicensesServiceImpl implements LicensesService{

    @Autowired
    private LicensesRepository licensesRepository;

    @Override
    public List<License> getAll() {
        return licensesRepository.findAll();
    }

    @Override
    public List<License> getGameLicenses(long gameId) {
        return licensesRepository.getGameLicenses(gameId);
    }

    @Override
    public License getById(Long id) {
        return licensesRepository.findById(id).get();
    }

    @Override
    public License add(License licence) {
        return licensesRepository.save(licence);
    }

    @Override
    public boolean delete(Long id) {
        License license = licensesRepository.getById(id);
        if(license != null){
            if(license.getStatus().equals("AVAILABLE")){
                licensesRepository.delete(license);
                return true;
            } else {
                return false;
            }
        }else {
            return false;
        }
    }

    @Override
    public void update(License license) {

    }

    @Override
    public boolean isDuplicateLicense(long gameId, String licenceId) {
        List<License> licenses = licensesRepository.getLicenseByLicenseIdAndGameId(gameId, licenceId);
        if(licenses.size()>0){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<License> getTopNLicences(long gameId, int num) {
        return licensesRepository.getTopNLicences(gameId, num);
    }

    @Override
    public List<License> gitAvailableLicences(long gameId) {
        return licensesRepository.gitAvailableLicences(gameId);
    }
}
