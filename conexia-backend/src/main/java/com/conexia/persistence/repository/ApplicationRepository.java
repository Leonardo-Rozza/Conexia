package com.conexia.persistence.repository;

import com.conexia.persistence.entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
    boolean existsByGraduate_IdGraduateAndJobOffer_IdOffer(Long graduateId, Long jobOfferId);

    List<ApplicationEntity> findAllByGraduate_IdGraduate(Long graduateId);

    List<ApplicationEntity> findAllByJobOffer_IdOffer(Long offerId);
}
