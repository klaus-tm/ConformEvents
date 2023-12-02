package com.example.conformevents.controller;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Ticket;
import com.example.conformevents.entity.User;
import com.example.conformevents.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PostMapping("/tickets")
    public ResponseEntity<Ticket> addTicket(@Validated @RequestBody Ticket ticket){
        return new ResponseEntity<>(ticketService.saveTicket(ticket), HttpStatus.CREATED);
    }

    @GetMapping("/tickets/user")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@Validated @RequestBody User user){
        if(ticketService.getTicketsByUser(user).isPresent())
            return new ResponseEntity<>(ticketService.getTicketsByUser(user).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/tickets/event")
    public ResponseEntity<List<Ticket>> getTicketsByEvent(@Validated @RequestBody Event event){
        if(ticketService.getTicketsByEvent(event).isPresent())
            return new ResponseEntity<>(ticketService.getTicketsByEvent(event).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/tickets/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("id") Long ticketId){
        if(ticketService.getTicketById(ticketId).isPresent())
            return new ResponseEntity<>(ticketService.getTicketById(ticketId).get(), HttpStatus.FOUND);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<HttpStatus> deleteTicketById(@PathVariable("id") Long ticketId){
        if(!ticketService.ticketExists(ticketId))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        ticketService.deleteTicketById(ticketId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
