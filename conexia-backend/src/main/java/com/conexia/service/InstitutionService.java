package com.conexia.service;


import com.conexia.service.dto.InstitutionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface InstitutionService {

    List<InstitutionDTO> findAll();
    Page<InstitutionDTO> findAll(Pageable pageable);
    InstitutionDTO findById(Long id);
    InstitutionDTO create(InstitutionDTO institution);
    InstitutionDTO update(InstitutionDTO institution, Long id);
    void deleteById(Long id);
}
