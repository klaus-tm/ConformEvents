package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Ticket;
import com.example.conformevents.entity.User;
import com.example.conformevents.repository.TicketRepository;
import com.example.conformevents.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Override
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public Optional<List<Ticket>> getTicketsByEvent(Event event) {
        return ticketRepository.findTicketsByEvent(event);
    }

    @Override
    public Optional<List<Ticket>> getTicketsByUser(User user) {
        return ticketRepository.findTicketsByUser(user);
    }

    @Override
    public Optional<Ticket> getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId);
    }

    @Override
    public void deleteTicketById(Long ticketId) {
        ticketRepository.deleteById(ticketId);
    }

    @Override
    public Boolean ticketExists(Long ticketId) {
        return ticketRepository.existsById(ticketId);
    }
}
