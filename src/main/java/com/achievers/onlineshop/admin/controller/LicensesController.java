package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.CustomLicenseObject;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.service.ItemService;
import com.achievers.onlineshop.admin.service.LicensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/admin/licenses")
public class LicensesController {

    @Autowired
    private LicensesService licensesService;

    @Autowired
    private ItemService itemService;

    @PutMapping(path = "/save/{gameId}")
    public ResponseEntity saveLicense(@PathVariable("gameId") long gameId, @RequestBody License license){

        // check duplicate license ID
        boolean isDuplicateLicense = licensesService.isDuplicateLicense(license.getItemId(), license.getLicenseId());

        if(!isDuplicateLicense) {
            licensesService.add(license);

            int gameLicensesCount = licensesService.gitAvailableLicences(gameId).size();

            Item item = itemService.getById(gameId);
            item.setItemQuantity(gameLicensesCount);
            itemService.updateItemStatusOrQuantity(item);

            return ResponseEntity.ok().body("");
        } else {
            return ResponseEntity.badRequest().body("Duplicate license ID");
        }
    }

    @GetMapping(path = "/getAll/{gameId}")
    public CustomLicenseObject getGameLicenses(@PathVariable("gameId") long gameId){
        Item item = itemService.getById(gameId);
        List<License> licenseList = licensesService.getGameLicenses(gameId);
        CustomLicenseObject customLicenseObject = new CustomLicenseObject();
        customLicenseObject.setItem(item);
        customLicenseObject.setLicenseList(licenseList);
        return customLicenseObject;
    }

    @DeleteMapping(path = "/delete/{gameId}/{id}")
    public ResponseEntity deleteLicenseById(@PathVariable("gameId") long gameId, @PathVariable("id") long id){
        boolean deleted = licensesService.delete(id);

        if(deleted){
            int gameLicensesCount = licensesService.gitAvailableLicences(gameId).size();

            Item item = itemService.getById(gameId);
            item.setItemQuantity(gameLicensesCount);
            itemService.updateItemStatusOrQuantity(item);

            return ResponseEntity.ok("License deleted successfully!");
        } else {
            return ResponseEntity.ok("License was not found!");
        }

    }
}
