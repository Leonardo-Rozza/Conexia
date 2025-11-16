package com.conexia.service.impl;

import com.conexia.exceptions.BusinessException;
import com.conexia.exceptions.ResourceNotFoundException;
import com.conexia.persistence.entity.EmployerEntity;
import com.conexia.persistence.entity.JobOfferEntity;
import com.conexia.persistence.entity.enums.JobOfferStatus;
import com.conexia.persistence.repository.EmployerRepository;
import com.conexia.persistence.repository.JobOfferRepository;
import com.conexia.service.JobOfferService;
import com.conexia.service.dto.JobOfferCreateDTO;
import com.conexia.service.dto.JobOfferDTO;
import com.conexia.service.dto.JobOfferUpdateDTO;
import com.conexia.utils.mapper.JobOfferMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobOfferServiceImpl implements JobOfferService {

    private final JobOfferRepository jobOfferRepository;
    private final JobOfferMapper jobOfferMapper;
    private final EmployerRepository employerRepository;

    public JobOfferServiceImpl(JobOfferRepository jobOfferRepository, JobOfferMapper jobOfferMapper, EmployerRepository employerRepository) {
        this.jobOfferRepository = jobOfferRepository;
        this.jobOfferMapper = jobOfferMapper;
        this.employerRepository = employerRepository;
    }


    @Override
    public List<JobOfferDTO> findAll() {
        return this.jobOfferRepository.findAll().stream()
                .map(this.jobOfferMapper::toDTO)
                .toList();
    }

    @Override
    public Page<JobOfferDTO> findAll(Pageable pageable) {
        return this.jobOfferRepository.findAll(pageable)
                .map(this.jobOfferMapper::toDTO);
    }

    @Override
    public JobOfferDTO findById(Long id) {
        return this.jobOfferRepository.findById(id)
                .map(this.jobOfferMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Oferta Laboral", id));
    }

    @Override
    public JobOfferDTO findActiveById(Long id) {
        return this.jobOfferRepository.findByIdAndStatus(id, JobOfferStatus.ACTIVA)
                .map(this.jobOfferMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Oferta laboral activa", id));
    }

    @Override
    public List<JobOfferDTO> findActive() {
        return this.jobOfferRepository.findAllByStatus(JobOfferStatus.ACTIVA).stream()
                .map(this.jobOfferMapper::toDTO)
                .toList();
    }

    @Override
    public List<JobOfferDTO> findByEmployer(Long employerId) {
        return this.jobOfferRepository.findAllByEmployer_IdEmployer(employerId).stream()
                .map(this.jobOfferMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public JobOfferDTO create(JobOfferCreateDTO dto) {
        // 1) Validar que la fecha de cierre sea futura (por si pasa algo al nivel de validación)
        if (dto.closingDate() != null && dto.closingDate().isBefore(LocalDate.now())) {
            throw new BusinessException("La fecha de cierre debe ser una fecha futura.");
        }

        // 2) Mapear DTO → Entity (sin fecha de publicación ni estado)
        JobOfferEntity jobOfferEntity = this.jobOfferMapper.toEntityForCreation(dto);

        // Verificamos si existe el empleador.
        EmployerEntity employer = employerRepository.findById(dto.employerId())
                .orElseThrow(() -> new BusinessException("El empleador no existe"));
        jobOfferEntity.setEmployer(employer);

        // 3) Completar datos de negocio que NO vienen del cliente
        jobOfferEntity.setPublicationDate(LocalDate.now());
        jobOfferEntity.setStatus(JobOfferStatus.ACTIVA);

        // 4) Persistir
        JobOfferEntity saved = this.jobOfferRepository.save(jobOfferEntity);

        // 5) Devolver DTO
        return this.jobOfferMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public JobOfferDTO update(Long id, JobOfferUpdateDTO dto) {
        JobOfferEntity jobOfferEntity = this.jobOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La oferta no fue encontrada."));

        // Validar fecha de cierre si viene informada
        if (dto.closingDate() != null && dto.closingDate().isBefore(LocalDate.now())) {
            throw new BusinessException("La fecha de cierre debe ser presente o futura.");
        }

        this.jobOfferMapper.updateEntityFromDTO(dto, jobOfferEntity);

        JobOfferEntity saved = this.jobOfferRepository.save(jobOfferEntity);

        return this.jobOfferMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!this.jobOfferRepository.existsById(id)){
            throw new ResourceNotFoundException("Oferta Laboral", id);
        }

        this.jobOfferRepository.deleteById(id);
    }
}
