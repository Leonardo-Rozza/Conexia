package com.conexia.utils.mapper;

import com.conexia.persistence.entity.InstitutionEntity;
import com.conexia.persistence.entity.UserEntity;
import com.conexia.service.dto.InstitutionDTO;
import org.mapstruct.*;
import java.util.List;

@Mapper(
    componentModel = "spring",
    nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface InstitutionMapper {

    // ===== Entity -> DTO =====
    @Mapping(source = "user.id", target = "userId")
    InstitutionDTO toDTO(InstitutionEntity entity);

    List<InstitutionDTO> toDTOList(List<InstitutionEntity> entities);

    // ===== DTO -> Entity =====
    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    InstitutionEntity toEntity(InstitutionDTO dto);

    // List<InstitutionEntity> toEntityList(List<InstitutionDTO> dtos);

    // ===== Update parcial (patch) =====
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDTO(InstitutionDTO dto, @MappingTarget InstitutionEntity entity);

    // ===== Creación (forzada sin Id/fechas) =====
    @Mapping(target = "idInstitucion", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    InstitutionEntity toEntityForCreation(InstitutionDTO dto);

    // ===== Ajuste defensivo =====
    @AfterMapping
    default void ensureUserHolder(@MappingTarget InstitutionEntity entity, InstitutionDTO dto) {
        if (dto.userId() != null && (entity.getUser() == null || entity.getUser().getId() == null)) {
            UserEntity user = new UserEntity();
            user.setId(dto.userId());
            entity.setUser(user);
        }
    }
}
