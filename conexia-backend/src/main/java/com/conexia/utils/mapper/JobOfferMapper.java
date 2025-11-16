package com.conexia.utils.mapper;

import com.conexia.persistence.entity.JobOfferEntity;
import com.conexia.service.dto.JobOfferDTO;
import com.conexia.service.dto.JobOfferCreateDTO;
import com.conexia.service.dto.JobOfferUpdateDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface JobOfferMapper {


    @Mapping(source = "employer.idEmployer", target = "employerId")
    JobOfferDTO toDTO(JobOfferEntity entity);


    @Mapping(target = "idOffer", ignore = true)
    @Mapping(source = "employerId", target = "employer.idEmployer")   // FK
    @Mapping(target = "publicationDate", ignore = true)               // lo setea el Service
    @Mapping(target = "status", ignore = true)                        // lo setea el Service (ACTIVA)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    JobOfferEntity toEntityForCreation(JobOfferCreateDTO dto);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idOffer", ignore = true)
    @Mapping(target = "employer", ignore = true)        // No permitir cambiar el empleador
    @Mapping(target = "publicationDate", ignore = true) // No se actualiza nunca
    @Mapping(target = "createdAt", ignore = true)       // No tocable
    @Mapping(target = "updatedAt", ignore = true)       // se actualiza por @PreUpdate
    void updateEntityFromDTO(JobOfferUpdateDTO dto, @MappingTarget JobOfferEntity entity);

}
