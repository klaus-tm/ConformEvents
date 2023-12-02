package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.Volunteer;
import com.example.conformevents.repository.VolunteerRepository;
import com.example.conformevents.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class VolunteerServiceImpl implements VolunteerService {
    @Autowired
    private VolunteerRepository VolunteerRepository;

    @Override
    public Optional<Volunteer> getVolunteerByMailAndPassword(String mail, String password) {
        return VolunteerRepository.findByMailAndPassword(mail, password);
    }

    @Override
    public Boolean volunteerExistsByMail(String mail) {
        return VolunteerRepository.existsByMail(mail);
    }

    @Override
    public Optional<Volunteer> getVolunteerById(Long VolunteerId) {
        return VolunteerRepository.findById(VolunteerId);
    }

    @Override
    public Volunteer saveVolunteer(Volunteer Volunteer) {
        return VolunteerRepository.save(Volunteer);
    }

    @Override
    public Volunteer updateVolunteer(Volunteer oldVolunteer, Volunteer newVolunteer) {
        if(Objects.nonNull(oldVolunteer.getFirstName()) && !"".equals(newVolunteer.getFirstName()))
            oldVolunteer.setFirstName(newVolunteer.getFirstName());

        if(Objects.nonNull(oldVolunteer.getLastName()) && !"".equals(newVolunteer.getLastName()))
            oldVolunteer.setLastName(newVolunteer.getLastName());

        if(Objects.nonNull(oldVolunteer.getMail()) && !"".equals(newVolunteer.getMail()))
            oldVolunteer.setMail(newVolunteer.getMail());

        if(Objects.nonNull(oldVolunteer.getPassword()) && !"".equals(newVolunteer.getPassword()))
            oldVolunteer.setPassword(newVolunteer.getPassword());

        if(!oldVolunteer.getPhone().equals(newVolunteer.getPhone()))
            oldVolunteer.setPhone(newVolunteer.getPhone());

        return saveVolunteer(oldVolunteer);
    }

    @Override
    public Boolean volunteerExists(Long volunteerId) {
        return VolunteerRepository.existsById(volunteerId);
    }

    @Override
    public void deleteVolunteerById(Long VolunteerId) {
        VolunteerRepository.deleteById(VolunteerId);
    }
}
