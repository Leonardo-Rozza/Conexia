package com.conexia.service.impl;

import com.conexia.exceptions.BusinessException;
import com.conexia.exceptions.ResourceNotFoundException;
import com.conexia.persistence.entity.*;
import com.conexia.persistence.entity.enums.ApplicationStatus;
import com.conexia.persistence.entity.enums.JobOfferStatus;
import com.conexia.persistence.repository.*;
import com.conexia.service.ApplicationService;
import com.conexia.service.dto.*;
import com.conexia.utils.mapper.ApplicationMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final GraduateRepository graduateRepository;
    private final JobOfferRepository jobOfferRepository;
    private final ApplicationMapper mapper;

    public ApplicationServiceImpl(
            ApplicationRepository applicationRepository,
            GraduateRepository graduateRepository,
            JobOfferRepository jobOfferRepository,
            ApplicationMapper mapper
    ) {
        this.applicationRepository = applicationRepository;
        this.graduateRepository = graduateRepository;
        this.jobOfferRepository = jobOfferRepository;
        this.mapper = mapper;
    }

    @Override
    public ApplicationDTO apply(ApplicationCreateDTO dto) {

        if (applicationRepository.existsByGraduate_IdGraduateAndJobOffer_IdOffer(dto.graduateId(), dto.offerId())) {
            throw new BusinessException("Ya existe una postulación para esta oferta.");
        }

        GraduateEntity grad = graduateRepository.findById(dto.graduateId())
                .orElseThrow(() -> new ResourceNotFoundException("Graduado", dto.graduateId()));

        JobOfferEntity offer = jobOfferRepository.findById(dto.offerId())
                .orElseThrow(() -> new ResourceNotFoundException("Oferta Laboral", dto.offerId()));

        if (offer.getStatus() != JobOfferStatus.ACTIVA) {
            throw new BusinessException("La oferta laboral no está activa.");
        }

        ApplicationEntity entity = mapper.toEntityForCreation(dto);
        entity.setGraduate(grad);
        entity.setJobOffer(offer);
        entity.setStatus(ApplicationStatus.EN_PROCESO);

        return mapper.toDTO(applicationRepository.save(entity));
    }

    @Override
    public List<ApplicationDTO> getByGraduate(Long graduateId) {
        return applicationRepository.findAllByGraduate_IdGraduate(graduateId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    public List<ApplicationDTO> getByOffer(Long offerId) {
        return applicationRepository.findAllByJobOffer_IdOffer(offerId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    public ApplicationDTO updateStatus(Long id, ApplicationUpdateDTO dto) {

        ApplicationEntity entity = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Postulación", id));

        // Validar transición de estados
        if (dto.status() == ApplicationStatus.ACEPTADO &&
                entity.getStatus() == ApplicationStatus.RECHAZADO) {
            throw new BusinessException("No se puede aceptar una postulación rechazada previamente.");
        }

        mapper.updateEntityFromDTO(dto, entity);

        return mapper.toDTO(applicationRepository.save(entity));
    }
}

