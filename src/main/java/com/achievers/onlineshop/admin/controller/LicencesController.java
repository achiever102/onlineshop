package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.CustomLicenceObject;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.model.Licence;
import com.achievers.onlineshop.admin.model.Platform;
import com.achievers.onlineshop.admin.service.ItemService;
import com.achievers.onlineshop.admin.service.LicencesService;
import com.achievers.onlineshop.admin.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/admin/licences")
public class LicencesController {

    @Autowired
    private LicencesService licencesService;

    @Autowired
    private ItemService itemService;

    @PutMapping(path = "/save/{gameId}")
    public ResponseEntity saveCategory(@PathVariable("gameId") long gameId, @RequestBody Licence licence){
        licencesService.add(licence);

        int gameLicencesCount = licencesService.getGameLicences(gameId).size();

        Item item = itemService.getById(gameId);
        item.setItemQuantity(gameLicencesCount);
        itemService.updateItemStatusOrQuantity(item);

        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Licence> getLicences(){
        List<Licence> licences = licencesService.getAll();
        return licences;
    }

    @GetMapping(path = "/getAll/{gameId}")
    public CustomLicenceObject getGameLicences(@PathVariable("gameId") long gameId){
        Item item = itemService.getById(gameId);
        List<Licence> licenceList = licencesService.getGameLicences(gameId);
        CustomLicenceObject customLicenceObject = new CustomLicenceObject();
        customLicenceObject.setItem(item);
        customLicenceObject.setLicenceList(licenceList);
        return customLicenceObject;
    }

    @GetMapping(path = "/getById/{id}")
    public Licence getLicenceById(@PathVariable("id") long id){
        Licence licence = licencesService.getById(id);
        return licence;
    }

    @DeleteMapping(path = "/delete/{gameId}/{id}")
    public ResponseEntity deleteLicenceById(@PathVariable("gameId") long gameId, @PathVariable("id") long id){
        licencesService.delete(id);

        int gameLicencesCount = licencesService.getGameLicences(gameId).size();

        Item item = itemService.getById(gameId);
        item.setItemQuantity(gameLicencesCount);
        itemService.updateItemStatusOrQuantity(item);

        return ResponseEntity.ok("");
    }
}
