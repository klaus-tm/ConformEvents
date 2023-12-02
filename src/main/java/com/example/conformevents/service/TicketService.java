package com.example.conformevents.service;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Ticket;
import com.example.conformevents.entity.User;

import java.util.List;
import java.util.Optional;

public interface TicketService {
    Ticket saveTicket(Ticket ticket);

    Optional<List<Ticket>> getTicketsByEvent(Event event);

    Optional<List<Ticket>> getTicketsByUser(User user);

    Optional<Ticket> getTicketById(Long ticketId);

    void deleteTicketById(Long ticketId);

    Boolean ticketExists(Long ticketId);
}
