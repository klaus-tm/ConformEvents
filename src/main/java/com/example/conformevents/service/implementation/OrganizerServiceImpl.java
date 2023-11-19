package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.Organizer;
import com.example.conformevents.entity.User;
import com.example.conformevents.repository.OrganizerRepository;
import com.example.conformevents.service.OrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class OrganizerServiceImpl implements OrganizerService {
    @Autowired
    private OrganizerRepository organizerRepository;

    @Override
    public Optional<Organizer> getOrganizerByMailAndPassword(String mail, String password) {
        return organizerRepository.findByMailAndPassword(mail, password);
    }

    @Override
    public Optional<Organizer> getOrganizerById(Long organizerId) {
        return organizerRepository.findById(organizerId);
    }

    @Override
    public Organizer saveOrganizer(Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    @Override
    public Organizer updateOrganizer(Organizer oldOrganizer, Organizer newOrganizer) {
        if(Objects.nonNull(oldOrganizer.getFirstName()) && !"".equals(newOrganizer.getFirstName()))
            oldOrganizer.setFirstName(newOrganizer.getFirstName());

        if(Objects.nonNull(oldOrganizer.getLastName()) && !"".equals(newOrganizer.getLastName()))
            oldOrganizer.setLastName(newOrganizer.getLastName());

        if(Objects.nonNull(oldOrganizer.getMail()) && !"".equals(newOrganizer.getMail()))
            oldOrganizer.setMail(newOrganizer.getMail());

        if(Objects.nonNull(oldOrganizer.getPassword()) && !"".equals(newOrganizer.getPassword()))
            oldOrganizer.setPassword(newOrganizer.getPassword());

        if(!oldOrganizer.getPhone().equals(newOrganizer.getPhone()))
            oldOrganizer.setPhone(newOrganizer.getPhone());

        return saveOrganizer(oldOrganizer);
    }

    @Override
    public Boolean organizerExists(Long organizerId) {
        return organizerRepository.existsById(organizerId);
    }

    @Override
    public void deleteOrganizerById(Long organizerId) {
        organizerRepository.deleteById(organizerId);
    }
}
