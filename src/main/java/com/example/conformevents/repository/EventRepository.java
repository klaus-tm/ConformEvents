package com.example.conformevents.repository;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<List<Event>> findEventByType(String eventType);

    Optional<List<Event>> findEventByOrganizer(Organizer organizer);
}
