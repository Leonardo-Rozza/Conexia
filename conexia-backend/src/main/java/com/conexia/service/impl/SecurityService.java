package com.conexia.service.impl;

import com.conexia.exceptions.ResourceNotFoundException;
import com.conexia.persistence.entity.EmployerEntity;
import com.conexia.persistence.entity.GraduateEntity;
import com.conexia.persistence.entity.InstitutionEntity;
import com.conexia.persistence.entity.JobOfferEntity;
import com.conexia.persistence.repository.EmployerRepository;
import com.conexia.persistence.repository.GraduateRepository;
import com.conexia.persistence.repository.InstitutionRepository;
import com.conexia.persistence.repository.JobOfferRepository;
import com.conexia.service.dto.LoggedUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {
    private final InstitutionRepository institutionRepository;
    private final EmployerRepository employerRepository;
    private final GraduateRepository graduateRepository;
    private final JobOfferRepository jobOfferRepository;

    public SecurityService(
            InstitutionRepository institutionRepository,
            EmployerRepository employerRepository,
            GraduateRepository graduateRepository,
            JobOfferRepository jobOfferRepository
    ) {
        this.institutionRepository = institutionRepository;
        this.employerRepository = employerRepository;
        this.graduateRepository = graduateRepository;
        this.jobOfferRepository = jobOfferRepository;
    }


    private LoggedUser getLoggedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (LoggedUser) auth.getPrincipal();
    }

    // ========== INSTITUTIONS ==========
    public boolean isInstitutionOwner(Long institutionId) {
        LoggedUser logged = getLoggedUser();

        InstitutionEntity inst = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ResourceNotFoundException("Institución", institutionId));

        return inst.getUser().getId().equals(logged.userId());
    }

    // ========== EMPLOYERS ==========
    public boolean isEmployerOwner(Long employerId) {
        LoggedUser logged = getLoggedUser();

        EmployerEntity emp = employerRepository.findById(employerId)
                .orElseThrow(() -> new ResourceNotFoundException("Empleador", employerId));

        return emp.getUser().getId().equals(logged.userId());
    }

    // ========== GRADUATES ==========
    public boolean isGraduateOwner(Long graduateId) {
        LoggedUser logged = getLoggedUser();

        GraduateEntity grad = graduateRepository.findById(graduateId)
                .orElseThrow(() -> new ResourceNotFoundException("Egresado", graduateId));

        return grad.getUser().getId().equals(logged.userId());
    }

    // ===== OFERTA LABORAL =====
    public boolean isJobOfferOwner(Long offerId) {
        LoggedUser logged = getLoggedUser();

        JobOfferEntity offer = jobOfferRepository.findById(offerId)
                .orElseThrow(() -> new ResourceNotFoundException("Oferta Laboral", offerId));

        return offer.getEmployer().getUser().getId().equals(logged.userId());
    }
}
