package com.example.conformevents.controller;

import com.example.conformevents.entity.Organizer;
import com.example.conformevents.entity.PersonCredentials;
import com.example.conformevents.service.OrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrganizerController {
    
    @Autowired
    private OrganizerService organizerService;

    @PostMapping("/organizers")
    public ResponseEntity<Organizer> saveOrganizer(@Validated @RequestBody Organizer organizer) {
        return new ResponseEntity<>(organizerService.saveOrganizer(organizer), HttpStatus.CREATED);
    }

    @GetMapping("/organizers")
    public ResponseEntity<Organizer> getOrganizerByMailAndPassword(@RequestParam String mail, @RequestParam String password){
        Optional<Organizer> organizer = organizerService.getOrganizerByMailAndPassword(mail, password);
        if(organizer.isPresent()){
            return new ResponseEntity<>(organizer.get(), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/organizers/{mail}")
    public ResponseEntity<HttpStatus> checkOrganizerByMail(@PathVariable("mail") String organizerMail){
        if(!organizerService.organizerExistsByMail(organizerMail))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(HttpStatus.FOUND);
    }

    @DeleteMapping("/organizers/{id}")
    public ResponseEntity<HttpStatus> deleteOrganizerById(@PathVariable("id") Long organizerId){
        if(!organizerService.organizerExists(organizerId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        organizerService.deleteOrganizerById(organizerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/organizers/{id}")
    public ResponseEntity<Organizer> updateOrganizer(@Validated @RequestBody Organizer neworganizer, @PathVariable("id") Long organizerId){
        Optional<Organizer> oldorganizer = organizerService.getOrganizerById(organizerId);
        if(oldorganizer.isPresent()){
            return new ResponseEntity<>(organizerService.updateOrganizer(oldorganizer.get(), neworganizer), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
}
