package com.example.conformevents.controller;

import com.example.conformevents.entity.Volunteer;
import com.example.conformevents.entity.PersonCredentials;
import com.example.conformevents.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;

    @PostMapping("/volunteers")
    public ResponseEntity<Volunteer> savevolunteer(@Validated @RequestBody Volunteer volunteer) {
        return new ResponseEntity<>(volunteerService.saveVolunteer(volunteer), HttpStatus.CREATED);
    }

    @GetMapping("/volunteers")
    public ResponseEntity<Volunteer> getvolunteerByMailAndPassword(@Validated @RequestBody PersonCredentials personCredentials){
        Optional<Volunteer> volunteer = volunteerService.getVolunteerByMailAndPassword(personCredentials.getMail(), personCredentials.getPassword());
        if(volunteer.isPresent()){
            return new ResponseEntity<>(volunteer.get(), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/volunteers/{id}")
    public ResponseEntity<HttpStatus> deletevolunteerById(@PathVariable("id") Long volunteerId){
        if(!volunteerService.volunteerExists(volunteerId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        volunteerService.deleteVolunteerById(volunteerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/volunteers/{id}")
    public ResponseEntity<Volunteer> updatevolunteer( @Validated @RequestBody Volunteer newvolunteer, @PathVariable("id") Long volunteerId){
        Optional<Volunteer> oldvolunteer = volunteerService.getVolunteerById(volunteerId);
        if(oldvolunteer.isPresent()){
            return new ResponseEntity<>(volunteerService.updateVolunteer(oldvolunteer.get(), newvolunteer), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
