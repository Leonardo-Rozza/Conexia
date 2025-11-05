package com.conexia.service.impl;

import com.conexia.persistence.entity.InstitutionEntity;
import com.conexia.persistence.repository.InstitutionRepository;
import com.conexia.service.InstitutionService;
import com.conexia.service.dto.InstitutionDTO;
import com.conexia.utils.mapper.InstitutionMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstitutionServiceImpl implements InstitutionService {

    private final InstitutionRepository institutionRepository;
    private final InstitutionMapper institutionMapper;

    public InstitutionServiceImpl(InstitutionRepository institutionRepository, InstitutionMapper institutionMapper) {
        this.institutionRepository = institutionRepository;
        this.institutionMapper = institutionMapper;
    }

    @Override
    public List<InstitutionDTO> findAll() {
        return this.institutionRepository.findAll().stream()
                .map(this.institutionMapper::toDTO)
                .toList();
    }

    @Override
    public Page<InstitutionDTO> findAll(Pageable pageable) {
        return institutionRepository.findAll(pageable)
                .map(institutionMapper::toDTO);
    }

    @Override
    public InstitutionDTO findById(Long id) {
        return this.institutionRepository.findById(id)
                .map(this.institutionMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Institución no encontrada con el id: " + id));
    }

    @Override
    public InstitutionDTO create(InstitutionDTO institution) {
        InstitutionEntity institutionEntity = this.institutionMapper.toEntityForCreation(institution);

        InstitutionEntity institutionEntitySaved = this.institutionRepository.save(institutionEntity);

        return this.institutionMapper.toDTO(institutionEntitySaved);
    }

    @Override
    public InstitutionDTO update(InstitutionDTO institution, Long id) {
        return this.institutionRepository.findById(id)
                .map(institution1 -> {
                    this.institutionMapper.updateEntityFromDTO(institution, institution1);
                    InstitutionEntity saved = this.institutionRepository.save(institution1);
                    return this.institutionMapper.toDTO(saved);
                }).orElseThrow(() -> new RuntimeException("Error al actualizar la institución."));
    }

    @Override
    public Boolean deleteById(Long id) {
        if (this.institutionRepository.existsById(id)){
            this.institutionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
