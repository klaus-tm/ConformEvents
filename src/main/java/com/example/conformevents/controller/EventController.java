package com.example.conformevents.controller;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;
import com.example.conformevents.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.awt.desktop.OpenFilesEvent;
import java.util.List;
import java.util.Optional;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;
    @PostMapping("/events")
    public ResponseEntity<Event> addEvent(@Validated @RequestBody Event event){
        return new ResponseEntity<>(eventService.saveEvent(event), HttpStatus.CREATED);
    }

    @GetMapping("/events/types/{eventType}")
    public ResponseEntity<List<Event>> getEventsByType(@PathVariable("eventType") String eventType){
        if(eventService.getEventsByType(eventType).isPresent())
            return new ResponseEntity<>(eventService.getEventsByType(eventType).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByOranizer(@Validated @RequestBody Organizer organizer){
        if(eventService.getEventsByOrganiser(organizer).isPresent())
            return new ResponseEntity<>(eventService.getEventsByOrganiser(organizer).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
