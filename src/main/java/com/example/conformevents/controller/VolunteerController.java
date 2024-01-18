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
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class VolunteerController {
    @Autowired
    private VolunteerService volunteerService;

    //method: POST, link: baseURL + "/volunteers", body: volunteer as a json, receive: 201
    @PostMapping("/volunteers")
    public ResponseEntity<Volunteer> savevolunteer(@Validated @RequestBody Volunteer volunteer) {
        return new ResponseEntity<>(volunteerService.saveVolunteer(volunteer), HttpStatus.CREATED);
    }

    //method: GET, link: baseURL + "/volunteers?mail=" + volunteerMail + "&password=" + volunteerPassword, receive: volunteer in a json(302) or 404
    //NOT SAFE USE PUT METHOD UPDATE SOON
    //COULDN'T UPDATE TOO SHORT TIME!!!!
    @GetMapping("/volunteers")
    public ResponseEntity<Volunteer> getvolunteerByMailAndPassword(@RequestParam("mail") String mail, @RequestParam("password") String password){
        Optional<Volunteer> volunteer = volunteerService.getVolunteerByMailAndPassword(mail, password);
        if(volunteer.isPresent()){
            return new ResponseEntity<>(volunteer.get(), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/volunteers/" + volunteerMail, receive: 302 or 404
    @GetMapping("/volunteers/{mail}")
    public ResponseEntity<HttpStatus> checkVolunteerByMail(@PathVariable("mail") String volunteerMail){
        if(!volunteerService.volunteerExistsByMail(volunteerMail))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(HttpStatus.FOUND);
    }

    //method: DELETE, link: baseURL + "/volunteers/" + volunteerID, receive: 200 or 404
    ////RECOMMENDED: DELETE EVENTS AND TICKETS FOR THE SPECIFIC VOLUNTEER FIRST!!!
    @DeleteMapping("/volunteers/{id}")
    public ResponseEntity<HttpStatus> deletevolunteerById(@PathVariable("id") Long volunteerId){
        if(!volunteerService.volunteerExists(volunteerId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        volunteerService.deleteVolunteerById(volunteerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //method: PUT, link: baseURL + "/volunteers/" + volunteerId, body: newVolunteer as json, receive: 302 or 404
    @PutMapping("/volunteers/{id}")
    public ResponseEntity<Volunteer> updatevolunteer( @Validated @RequestBody Volunteer newvolunteer, @PathVariable("id") Long volunteerId){
        Optional<Volunteer> oldvolunteer = volunteerService.getVolunteerById(volunteerId);
        if(oldvolunteer.isPresent()){
            return new ResponseEntity<>(volunteerService.updateVolunteer(oldvolunteer.get(), newvolunteer), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
