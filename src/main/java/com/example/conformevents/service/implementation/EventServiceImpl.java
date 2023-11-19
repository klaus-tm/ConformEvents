package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Organizer;
import com.example.conformevents.repository.EventRepository;
import com.example.conformevents.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository eventRepository;

    @Override
    public Optional<List<Event>> getEventsByType(String eventType) {
        return eventRepository.findEventByType(eventType);
    }

    @Override
    public Optional<List<Event>> getEventsByOrganiser(Organizer organizer) {
        return eventRepository.findEventByOrganizer(organizer);
    }

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public Boolean eventExists(Long eventId) {
        return eventRepository.existsById(eventId);
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Event oldEvent, Event newEvent) {
        if(Objects.nonNull(oldEvent.getName()) && !"".equals(newEvent.getName()))
            oldEvent.setName(newEvent.getName());

        if(Objects.nonNull(oldEvent.getDate()) && Objects.nonNull(newEvent.getDate()))
            oldEvent.setDate(newEvent.getDate());

        if(Objects.nonNull(oldEvent.getTime()) && Objects.nonNull(newEvent.getTime()))
            oldEvent.setTime(newEvent.getTime());

        if(Objects.nonNull(oldEvent.getLocation()) && !"".equals(newEvent.getLocation()))
            oldEvent.setLocation(newEvent.getLocation());

        if(Objects.nonNull(oldEvent.getTicketsNumber()) && Objects.nonNull(newEvent.getTicketsNumber()))
            oldEvent.setTicketsNumber(newEvent.getTicketsNumber());

        if(Objects.nonNull(oldEvent.getVolunteersNumber()) && Objects.nonNull(newEvent.getVolunteersNumber()))
            oldEvent.setVolunteersNumber(newEvent.getVolunteersNumber());

        if(Objects.nonNull(oldEvent.getTicketPrices()) && !"".equals(newEvent.getTicketPrices()))
            oldEvent.setTicketPrices(newEvent.getTicketPrices());

        if(Objects.nonNull(oldEvent.getTicketTypes()) && !"".equals(newEvent.getTicketTypes()))
            oldEvent.setTicketTypes(newEvent.getTicketTypes());

        if(Objects.nonNull(oldEvent.getType()) && !"".equals(newEvent.getType()))
            oldEvent.setType(newEvent.getType());

        oldEvent.setLocationType(newEvent.getLocationType());

        return saveEvent(oldEvent);
    }

    @Override
    public void deleteEventById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
