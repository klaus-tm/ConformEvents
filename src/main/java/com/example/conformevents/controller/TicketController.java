package com.example.conformevents.controller;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Ticket;
import com.example.conformevents.entity.User;
import com.example.conformevents.service.EventService;
import com.example.conformevents.service.TicketService;
import com.example.conformevents.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TicketController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;

    //method: POST, link: baseURL + "/tickets", body: ticket as a json, receive: 201
    @PostMapping("/tickets")
    public ResponseEntity<Ticket> addTicket(@Validated @RequestBody Ticket ticket){
        return new ResponseEntity<>(ticketService.saveTicket(ticket), HttpStatus.CREATED);
    }

    //method: GET, link: baseURL + "/tickets/user?user=" + userID, receive: list inside a json(user's tickets)(302) or 404
    @GetMapping("/tickets/user")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@RequestParam("user") Long id){
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            if(ticketService.getTicketsByUser(user.get()).isPresent())
                return new ResponseEntity<>(ticketService.getTicketsByUser(user.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    //method: GET, link: baseURL + "/tickets/event?event=" + eventID, receive: list inside a json(event's tickets)(302) or 404
    @GetMapping("/tickets/event")
    public ResponseEntity<List<Ticket>> getTicketsByEvent(@RequestParam("event") Long id){
        Optional<Event> event = eventService.getEventById(id);
        if(event.isPresent()){
            if(ticketService.getTicketsByEvent(event.get()).isPresent())
                return new ResponseEntity<>(ticketService.getTicketsByEvent(event.get()).get(), HttpStatus.FOUND);
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: GET, link: baseURL + "/tikets/" + ticketId, receive: ticket as json(302) or 404
    @GetMapping("/tickets/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("id") Long ticketId){
        if(ticketService.getTicketById(ticketId).isPresent())
            return new ResponseEntity<>(ticketService.getTicketById(ticketId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: DELETE, link: baseURL + "/tikets/" + ticketId, receive: 200 or 404
    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<HttpStatus> deleteTicketById(@PathVariable("id") Long ticketId){
        if(!ticketService.ticketExists(ticketId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        ticketService.deleteTicketById(ticketId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //method: DELETE, link: baseURL + "/tikets/event?event=" + eventId, receive: 200 or 404
    //USE THIS METHOD WHEN YOU WANT TO DELETE A CERTAIN EVENT!!!
    @DeleteMapping("/tickets/event")
    public ResponseEntity<HttpStatus> deleteTicketsByEvent(@RequestParam("event") Long id){
        Optional<Event>event = eventService.getEventById(id);
        if(event.isPresent()){
            ticketService.deleteTicketsByEvent(event.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //method: DELETE, link: baseURL + "/tikets/user?user=" + userId, receive: 200 or 404
    //USE THIS METHOD WHEN YOU WANT TO DELETE A CERTAIN USER!!!
    @DeleteMapping("/tickets/user")
    public ResponseEntity<HttpStatus> deleteTicketsByUser(@RequestParam("user") Long id){
        Optional<User>user = userService.getUserById(id);
        if(user.isPresent()){
            ticketService.deleteTicketsByUser(user.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
