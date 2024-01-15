package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Volunteer;
import com.example.conformevents.entity.Vpass;
import com.example.conformevents.repository.VpassRepository;
import com.example.conformevents.service.VpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VpassServiceImpl implements VpassService {

    @Autowired private VpassRepository vpassRepository;

    @Override
    public Vpass saveVpass(Vpass vpass) {
        return vpassRepository.save(vpass);
    }

    @Override
    public Optional<List<Vpass>> getVpassesByEvent(Event event) {
        return vpassRepository.findVpassesByEvent(event);
    }

    @Override
    public Optional<List<Vpass>> getVpassesByVolunteer(Volunteer volunteer) {
        return vpassRepository.findVpassesByVolunteer(volunteer);
    }

    @Override
    public Optional<Vpass> getVpassById(Long vpassId) {
        return vpassRepository.findById(vpassId);
    }

    @Override
    public Optional<Vpass> getVpassByEventAndVolunteer(Event event, Volunteer volunteer) {
        return vpassRepository.findVpassByEventAndVolunteer(event, volunteer);
    }

    @Override
    public void deleteVpassById(Long vpassId) {
        vpassRepository.deleteById(vpassId);
    }

    @Override
    public void deleteVpassesByEvent(Event event) {
        vpassRepository.deleteAllByEvent(event);
    }

    @Override
    public void deleteVpassesByVolunteer(Volunteer volunteer) {
        vpassRepository.deleteAllByVolunteer(volunteer);
    }

    @Override
    public Boolean vpassExists(Long vpassId) {
        return vpassRepository.existsById(vpassId);
    }
}
