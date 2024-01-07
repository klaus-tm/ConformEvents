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

    //method: POST, link: baseURL + "/organizers", body: organizer in a json, receive: 201
    @PostMapping("/organizers")
    public ResponseEntity<Organizer> saveOrganizer(@Validated @RequestBody Organizer organizer) {
        return new ResponseEntity<>(organizerService.saveOrganizer(organizer), HttpStatus.CREATED);
    }

    //method: GET, link: baseURL + "/organizers?mail=" + organizerMail + "&password=" + organizerPassword, receive: organizer in a json(302) or 404
    @GetMapping("/organizers")
    public ResponseEntity<Organizer> getOrganizerByMailAndPassword(@RequestParam("mail") String mail, @RequestParam("password") String password){
        Optional<Organizer> organizer = organizerService.getOrganizerByMailAndPassword(mail, password);
        if(organizer.isPresent()){
            return new ResponseEntity<>(organizer.get(), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/organizers/" + organizerMail, receive: 302 or 404
    @GetMapping("/organizers/{mail}")
    public ResponseEntity<HttpStatus> checkOrganizerByMail(@PathVariable("mail") String organizerMail){
        if(!organizerService.organizerExistsByMail(organizerMail))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(HttpStatus.FOUND);
    }

    //method: DELETE, link: baseURL + "/organizers/" + organizerID, receive: 200 or 404
    ////RECOMMENDED: DELETE EVENTS FOR THE SPECIFIC ORGANIZER FIRST!!!
    @DeleteMapping("/organizers/{id}")
    public ResponseEntity<HttpStatus> deleteOrganizerById(@PathVariable("id") Long organizerId){
        if(!organizerService.organizerExists(organizerId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        organizerService.deleteOrganizerById(organizerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //method: PUT, link: baseURL + "/organizers/" + organizerId, body: newOrganizer as json, receive: 302 or 404
    @PutMapping("/organizers/{id}")
    public ResponseEntity<Organizer> updateOrganizer(@Validated @RequestBody Organizer neworganizer, @PathVariable("id") Long organizerId){
        Optional<Organizer> oldorganizer = organizerService.getOrganizerById(organizerId);
        if(oldorganizer.isPresent()){
            return new ResponseEntity<>(organizerService.updateOrganizer(oldorganizer.get(), neworganizer), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
}
