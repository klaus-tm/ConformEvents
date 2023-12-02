package com.example.conformevents.repository;

import com.example.conformevents.entity.Organizer;
import com.example.conformevents.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizerRepository extends JpaRepository<Organizer, Long> {

    Optional<Organizer> findByMailAndPassword(String mail, String password);
    Boolean existsByMail(String mail);
}
