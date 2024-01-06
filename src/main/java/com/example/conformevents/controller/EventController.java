package com.example.conformevents.controller;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;
import com.example.conformevents.service.EventService;
import com.example.conformevents.service.OrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.awt.desktop.OpenFilesEvent;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EventController {
    @Autowired
    private EventService eventService;
    @Autowired
    private OrganizerService organizerService;

    @PostMapping("/events")
    public ResponseEntity<Event> addEvent(@Validated @RequestBody Event event){
        return new ResponseEntity<>(eventService.saveEvent(event), HttpStatus.CREATED);
    }

    @GetMapping("/events/all")
    public ResponseEntity<List<Event>> getAllEvents(){
        return new ResponseEntity<>(eventService.findAllEvents(), HttpStatus.OK);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByOranizer(@RequestParam("organizer") Long id){
        Optional<Organizer> organizer = organizerService.getOrganizerById(id);
        if(organizer.isPresent()){
            if(eventService.getEventsByOrganiser(organizer.get()).isPresent())
                return new ResponseEntity<>(eventService.getEventsByOrganiser(organizer.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable("id") Long eventId){
        if(eventService.getEventById(eventId).isPresent())
            return new ResponseEntity<>(eventService.getEventById(eventId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@Validated @RequestBody Event newEvent, @PathVariable("id") Long eventId){
        Optional<Event> oldEvent = eventService.getEventById(eventId);
        if(oldEvent.isPresent())
            return new ResponseEntity<>(eventService.updateEvent(oldEvent.get(), newEvent), HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<HttpStatus> deleteEvent(@PathVariable("id") Long eventId){
        if(!eventService.eventExists(eventId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        eventService.deleteEventById(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
