package com.example.conformevents.repository;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Ticket;
import com.example.conformevents.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<List<Ticket>> findTicketsByEvent(Event event);

    Optional<List<Ticket>> findTicketsByUser(User user);
}
