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
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
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
        if (Objects.nonNull(oldEvent.getName()) && !"".equals(newEvent.getName()))
            oldEvent.setName(newEvent.getName());

        if (Objects.nonNull(oldEvent.getDate()) && Objects.nonNull(newEvent.getDate()))
            oldEvent.setDate(newEvent.getDate());

        if (Objects.nonNull(oldEvent.getStartHours()) && !"".equals(newEvent.getStartHours()))
            oldEvent.setStartHours(newEvent.getStartHours());

        if (Objects.nonNull(oldEvent.getCityRegion()) && !"".equals(newEvent.getCityRegion()))
            oldEvent.setCityRegion(newEvent.getCityRegion());

        if (Objects.nonNull(oldEvent.getRegisterLimit()) && Objects.nonNull(newEvent.getRegisterLimit()))
            oldEvent.setRegisterLimit(newEvent.getRegisterLimit());

        if (Objects.nonNull(oldEvent.getRaceMap()) && !"".equals(newEvent.getRaceMap()))
            oldEvent.setRaceMap(newEvent.getRaceMap());

        if (Objects.nonNull(oldEvent.getVolunteersNumber()) && Objects.nonNull(newEvent.getVolunteersNumber()))
            oldEvent.setVolunteersNumber(newEvent.getVolunteersNumber());

        if (Objects.nonNull(oldEvent.getRacePrices()) && !"".equals(newEvent.getRacePrices()))
            oldEvent.setRacePrices(newEvent.getRacePrices());

        if (Objects.nonNull(oldEvent.getRaceTypes()) && !"".equals(newEvent.getRaceTypes()))
            oldEvent.setRaceTypes(newEvent.getRaceTypes());

        if (Objects.nonNull(oldEvent.getDescription()) && !"".equals(newEvent.getDescription()))
            oldEvent.setDescription(newEvent.getDescription());

        return saveEvent(oldEvent);
    }

    @Override
    public void deleteEventById(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    public void deleteEventsByOrganizer(Organizer organizer) {
        eventRepository.deleteAllByOrganizer(organizer);
    }
}
