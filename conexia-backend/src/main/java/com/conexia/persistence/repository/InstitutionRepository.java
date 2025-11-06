package com.conexia.persistence.repository;

import com.conexia.persistence.entity.InstitutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<InstitutionEntity, Long> {
    boolean existsByEmail(String email);
}
