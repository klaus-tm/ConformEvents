package com.example.conformevents.controller;

import com.example.conformevents.entity.*;
import com.example.conformevents.service.EventService;
import com.example.conformevents.service.VolunteerService;
import com.example.conformevents.service.VpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class VpassController {

    @Autowired
    private VpassService vpassService;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private EventService eventService;

    //method: POST, link: baseURL + "/vpasses", body: vpass as a json, receive: 201
    @PostMapping("/vpasses")
    public ResponseEntity<Vpass> addVpass(@Validated @RequestBody Vpass vpass) {
        return new ResponseEntity<>(vpassService.saveVpass(vpass), HttpStatus.CREATED);
    }

    //method: GET, link: baseURL + "/vpasses/volunteer?volunteer=" + volunteerID, receive: list inside a json(volunteer's vpassess)(302) or 404
    @GetMapping("/vpasses/volunteer")
    public ResponseEntity<List<Vpass>> getVpassesByVolunteer(@RequestParam("volunteer") Long id) {
        Optional<Volunteer> volunteer = volunteerService.getVolunteerById(id);
        if(volunteer.isPresent()){
            if (vpassService.getVpassesByVolunteer(volunteer.get()).isPresent())
                return new ResponseEntity<>(vpassService.getVpassesByVolunteer(volunteer.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/vpasses/event?event=" + eventID, receive: list inside a json(volunteer's vpassess)(302) or 404
    @GetMapping("/vpasses/event")
    public ResponseEntity<List<Vpass>> getVpassesByEvent(@RequestParam("event") Long id) {
        Optional<Event> event = eventService.getEventById(id);
        if(event.isPresent()){
            if (vpassService.getVpassesByEvent(event.get()).isPresent())
                return new ResponseEntity<>(vpassService.getVpassesByEvent(event.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/vpasses/" + vpassId, receive: vpass as json(302) or 404
    @GetMapping("/vpasses/{id}")
    public ResponseEntity<Vpass> getVpassById(@PathVariable("id") Long vpassId) {
        if (vpassService.getVpassById(vpassId).isPresent())
            return new ResponseEntity<>(vpassService.getVpassById(vpassId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/vpasses/check?event=" + eventID + "&volunteer=" + volunteerID, receive: vpass in a json(302) or 404
    @GetMapping("/vpasses/check")
    public ResponseEntity<Vpass> getVpassByEventAndVolunteer(@RequestParam("event") Long eventId, @RequestParam("volunteer") Long volunteerId){
        Optional<Event> event = eventService.getEventById(eventId);
        Optional<Volunteer> volunteer = volunteerService.getVolunteerById(volunteerId);
        if(event.isPresent() && volunteer.isPresent()){
            if(vpassService.getVpassByEventAndVolunteer(event.get(), volunteer.get()).isPresent()){
                return new ResponseEntity<>(vpassService.getVpassByEventAndVolunteer(event.get(), volunteer.get()).get(), HttpStatus.FOUND);
            } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: DELETE, link: baseURL + "/vpasses/" + vpassId, receive: 200 or 404
    @DeleteMapping("/vpasses/{id}")
    public ResponseEntity<HttpStatus> deleteVpassById(@PathVariable("id") Long vpassId){
        if(!vpassService.vpassExists(vpassId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        vpassService.deleteVpassById(vpassId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //method: DELETE, link: baseURL + "/vpasses/event?event=" + eventId, receive: 200 or 404
    //USE THIS METHOD WHEN YOU WANT TO DELETE A CERTAIN EVENT!!!
    @DeleteMapping("/vpasses/event")
    public ResponseEntity<HttpStatus> deleteVpassesByEvent(@RequestParam("event") Long eventId){
        Optional<Event>event = eventService.getEventById(eventId);
        if(event.isPresent()){
            vpassService.deleteVpassesByEvent(event.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: DELETE, link: baseURL + "/vpasses/volunteer?volunteer=" + userId, receive: 200 or 404
    //USE THIS METHOD WHEN YOU WANT TO DELETE A CERTAIN USER!!!
    @DeleteMapping("/vpasses/volunteer")
    public ResponseEntity<HttpStatus> deleteVpassesByVolunteer(@RequestParam("volunteer") Long userId){
        Optional<Volunteer>volunteer = volunteerService.getVolunteerById(userId);
        if(volunteer.isPresent()){
            vpassService.deleteVpassesByVolunteer(volunteer.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

