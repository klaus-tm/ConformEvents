package com.example.conformevents.service;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Optional<List<Event>> getEventsByType(String eventType);

    Optional<List<Event>> getEventsByOrganiser(Organizer organizer);

    Optional<Event> getEventById(Long eventId);

    Boolean eventExists(Long eventId);

    Event saveEvent(Event event);

    Event updateEvent(Event oldEvent, Event newEvent);

    void deleteEventById( Long eventId);

}
