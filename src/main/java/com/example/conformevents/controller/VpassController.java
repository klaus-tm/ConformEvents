package com.example.conformevents.controller;

import com.example.conformevents.entity.*;
import com.example.conformevents.repository.VpassRepository;
import com.example.conformevents.service.VpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VpassController {

    @Autowired
    private VpassService vpassService;

    @PostMapping("/vpasses")
    public ResponseEntity<Vpass> addVpass(@Validated @RequestBody Vpass vpass) {
        return new ResponseEntity<>(vpassService.saveVpass(vpass), HttpStatus.CREATED);
    }

    @GetMapping("/vpasses/volunteer")
    public ResponseEntity<List<Vpass>> getVpassesByVolunteer(@Validated @RequestBody Volunteer volunteer) {
        if (vpassService.getVpassesByVolunteer(volunteer).isPresent())
            return new ResponseEntity<>(vpassService.getVpassesByVolunteer(volunteer).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/vpasses/event")
    public ResponseEntity<List<Vpass>> getVpassesByEvent(@Validated @RequestBody Event event) {
        if (vpassService.getVpassesByEvent(event).isPresent())
            return new ResponseEntity<>(vpassService.getVpassesByEvent(event).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/vpasses/{id}")
    public ResponseEntity<Vpass> getVpassesById(@PathVariable("id") Long vpassId) {
        if (vpassService.getVpassById(vpassId).isPresent())
            return new ResponseEntity<>(vpassService.getVpassById(vpassId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/vpasses/{id}")
    public ResponseEntity<HttpStatus> deleteVpassById(@PathVariable("id") Long vpassId){
        if(!vpassService.vpassExists(vpassId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        vpassService.deleteVpassById(vpassId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

