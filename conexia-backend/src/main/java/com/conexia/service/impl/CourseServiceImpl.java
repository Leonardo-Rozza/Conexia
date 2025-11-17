package com.conexia.service.impl;

import com.conexia.exceptions.BusinessException;
import com.conexia.exceptions.ResourceNotFoundException;
import com.conexia.persistence.entity.CourseEntity;
import com.conexia.persistence.entity.InstitutionEntity;
import com.conexia.persistence.repository.CourseRepository;
import com.conexia.persistence.repository.InstitutionRepository;
import com.conexia.service.CourseService;
import com.conexia.service.dto.CourseCreateDTO;
import com.conexia.service.dto.CourseDTO;
import com.conexia.service.dto.CourseUpdateDTO;
import com.conexia.utils.mapper.CourseMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final InstitutionRepository institutionRepository;

    public CourseServiceImpl(CourseMapper courseMapper, CourseRepository courseRepository, InstitutionRepository institutionRepository) {
        this.courseMapper = courseMapper;
        this.courseRepository = courseRepository;
        this.institutionRepository = institutionRepository;
    }

    @Override
    public List<CourseDTO> findAll() {
        return this.courseRepository.findAll().stream()
                .map(this.courseMapper::toDTO)
                .toList();
    }

    @Override
    public Page<CourseDTO> findAll(Pageable pageable) {
        return this.courseRepository.findAll(pageable)
                .map(this.courseMapper::toDTO);
    }

    @Override
    public CourseDTO findById(Long id) {
        return this.courseRepository.findById(id)
                .map(this.courseMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Curso", id));
    }

    @Override
    public CourseDTO save(CourseCreateDTO courseCreateDTO) {
        // Validar si la institución existe.
        InstitutionEntity institution = institutionRepository.findById(courseCreateDTO.idInstitution())
                .orElseThrow(() -> new ResourceNotFoundException("Institución", courseCreateDTO.idInstitution()));

        // Validar las fechas
        if (courseCreateDTO.startDate() != null && courseCreateDTO.endDate() != null) {
            if (courseCreateDTO.endDate().isBefore(courseCreateDTO.startDate())) {
                throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
            }
        }

        CourseEntity courseEntity = this.courseMapper.toEntityForCreation(courseCreateDTO);
        courseEntity.setInstitution(institution);

        CourseEntity saved = this.courseRepository.save(courseEntity);

        return this.courseMapper.toDTO(saved);
    }

    @Override
    public CourseDTO update(Long id, CourseUpdateDTO courseUpdateDTO) {
        CourseEntity courseEntity = this.courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso", id));

        if (courseUpdateDTO.startDate() != null && courseUpdateDTO.endDate() != null) {
            if (courseUpdateDTO.endDate().isBefore(courseUpdateDTO.startDate())) {
                throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
            }
        }

        this.courseMapper.updateEntityFromDTO(courseUpdateDTO, courseEntity);
        CourseEntity saved = this.courseRepository.save(courseEntity);

        return this.courseMapper.toDTO(saved);
    }

    @Override
    public void deleteById(Long id) {
        if (!this.courseRepository.existsById(id)){
            throw new ResourceNotFoundException("Curso", id);
        }

        this.courseRepository.deleteById(id);
    }
}
