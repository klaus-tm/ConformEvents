package com.example.conformevents.controller;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;
import com.example.conformevents.service.EventService;
import com.example.conformevents.service.OrganizerService;
import com.example.conformevents.service.TicketService;
import com.example.conformevents.service.VpassService;
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
    @Autowired
    private TicketService ticketService;
    @Autowired
    private VpassService vpassService;

    //method: POST, link: baseURL + "/events", body: event json, receive: 201
    @PostMapping("/events")
    public ResponseEntity<Event> addEvent(@Validated @RequestBody Event event){
        return new ResponseEntity<>(eventService.saveEvent(event), HttpStatus.CREATED);
    }

    //method: GET, link: baseURL + "/events/all", receive: list inside a json(all events)(302)
    @GetMapping("/events/all")
    public ResponseEntity<List<Event>> getAllEvents(){
        return new ResponseEntity<>(eventService.findAllEvents(), HttpStatus.FOUND);
    }

    //method: GET, link: baseURL + "/events?organizer=" + organizerId, receive: list inside a json(organizer's events)(302) or 404
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByOranizer(@RequestParam("organizer") Long id){
        Optional<Organizer> organizer = organizerService.getOrganizerById(id);
        if(organizer.isPresent()){
            if(eventService.getEventsByOrganiser(organizer.get()).isPresent())
                return new ResponseEntity<>(eventService.getEventsByOrganiser(organizer.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/events/" + eventID, receive: specific event in a json(302) or 404
    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable("id") Long eventId){
        if(eventService.getEventById(eventId).isPresent())
            return new ResponseEntity<>(eventService.getEventById(eventId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: PUT, link: baseURL + "/events/" + eventID, body: new event as a json, receive: 200 or 404
    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@Validated @RequestBody Event newEvent, @PathVariable("id") Long eventId){
        Optional<Event> oldEvent = eventService.getEventById(eventId);
        if(oldEvent.isPresent())
            return new ResponseEntity<>(eventService.updateEvent(oldEvent.get(), newEvent), HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: DELETE, link: baseURL + "/events/" + eventID, receive: 200 or 404
    //RECOMMENDED: DELETE TICKETS AND VPASSES FOR THE SPECIFIC EVENT FIRST!!!
    @DeleteMapping("/events/{id}")
    public ResponseEntity<HttpStatus> deleteEventById(@PathVariable("id") Long eventId){
        if(!eventService.eventExists(eventId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        eventService.deleteEventById(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //method: DELETE, link: baseURL + "/events?organizer=" + organizerID, receive: 200 or 404
    //USE THIS METHOD WHEN YOU WANT TO DELETE AN ORGANIZER!!!
    @DeleteMapping("/events")
    public ResponseEntity<HttpStatus> deleteEventsByOrganizer(@RequestParam("organizer") Long organizerId){
        Optional<Organizer>organizer = organizerService.getOrganizerById(organizerId);
        if (organizer.isPresent()){
            Optional<List<Event>> events = eventService.getEventsByOrganiser(organizer.get());
            if(events.isPresent()){
                for (Event event: events.get()){
                    ticketService.deleteTicketsByEvent(event);
                    vpassService.deleteVpassesByEvent(event);
                }
                eventService.deleteEventsByOrganizer(organizer.get());
                return new ResponseEntity<>(HttpStatus.OK);
            }   else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
