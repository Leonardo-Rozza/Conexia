package com.conexia.presentation.controller;

import com.conexia.persistence.entity.enums.JobOfferStatus;
import com.conexia.service.JobOfferService;
import com.conexia.service.dto.JobOfferCreateDTO;
import com.conexia.service.dto.JobOfferDTO;
import com.conexia.service.dto.JobOfferUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@Tag(name = "Ofertas Laborales", description = "Gestión de ofertas laborales")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    public JobOfferController(JobOfferService jobOfferService) {
        this.jobOfferService = jobOfferService;
    }

    // ========= PÚBLICO / EGRESADOS: ver ofertas activas =========

    @Operation(summary = "Obtener todas las ofertas activas")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping("/active")
    public ResponseEntity<List<JobOfferDTO>> getActiveOffers() {
        return ResponseEntity.ok(jobOfferService.findActive());
    }

    @Operation(summary = "Obtener detalle de una oferta activa")
    @ApiResponse(responseCode = "200", description = "Oferta activa encontrada")
    @GetMapping("/active/{id}")
    public ResponseEntity<JobOfferDTO> getActiveById(@PathVariable Long id) {
        return ResponseEntity.ok(jobOfferService.findActiveById(id));
    }

    // ========= EMPLEADOR: sus propias ofertas =========

    @Operation(summary = "Obtener ofertas de un empleador")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployerOwner(#employerId)")
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobOfferDTO>> getByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(jobOfferService.findByEmployer(employerId));
    }

    @Operation(summary = "Crear una oferta laboral")
    @ApiResponse(responseCode = "201", description = "Oferta creada con éxito")
    @PreAuthorize("hasRole('EMPLEADOR') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<JobOfferDTO> create(@Valid @RequestBody JobOfferCreateDTO dto) {
        JobOfferDTO created = jobOfferService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Actualizar una oferta laboral")
    @ApiResponse(responseCode = "200", description = "Oferta actualizada con éxito")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    @PutMapping("/{id}")
    public ResponseEntity<JobOfferDTO> update(@PathVariable Long id,
                                              @Valid @RequestBody JobOfferUpdateDTO dto) {
        JobOfferDTO updated = jobOfferService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Eliminar una oferta laboral")
    @ApiResponse(responseCode = "204", description = "Oferta eliminada con éxito")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobOfferService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ========= ADMIN: ver todas las ofertas =========

    @Operation(summary = "Obtener todas las ofertas laborales (ADMIN)")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<JobOfferDTO>> getAll() {
        return ResponseEntity.ok(jobOfferService.findAll());
    }

    @Operation(summary = "Obtener ofertas laborales paginadas (ADMIN)")
    @ApiResponse(responseCode = "200", description = "Página obtenida correctamente")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/paginated")
    public ResponseEntity<Page<JobOfferDTO>> getAllPaginated(Pageable pageable) {
        return ResponseEntity.ok(jobOfferService.findAll(pageable));
    }

    // =====================================================
    // 1. OBTENER LAS OFERTAS DE UN EMPLEADOR
    // =====================================================
    @Operation(summary = "Obtener ofertas de un empleador")
    @GetMapping("/employer/{employerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployerOwner(#employerId)")
    public ResponseEntity<List<JobOfferDTO>> findByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(jobOfferService.findByEmployer(employerId));
    }

    // =====================================================
    // 2. OBTENER OFERTAS ACTIVAS
    // =====================================================
    @Operation(summary = "Obtener ofertas activas")
    @GetMapping("/active")
    public ResponseEntity<List<JobOfferDTO>> findActive() {
        return ResponseEntity.ok(jobOfferService.findActive());
    }

    // =====================================================
    // 3. CERRAR / DESACTIVAR OFERTA (PATCH)
    // =====================================================
    @Operation(summary = "Cerrar una oferta laboral")
    @PatchMapping("/{id}/close")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    public ResponseEntity<JobOfferDTO> closeOffer(@PathVariable Long id) {

        JobOfferUpdateDTO dto = new JobOfferUpdateDTO(
                null, null, null, null,
                JobOfferStatus.CERRADA
        );

        JobOfferDTO updated = jobOfferService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    // =====================================================
    // 4. BUSCAR OFERTAS POR ESTADO
    // =====================================================
    @Operation(summary = "Buscar ofertas por estado")
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobOfferDTO>> findByStatus(@PathVariable JobOfferStatus status) {
        return ResponseEntity.ok(jobOfferService.findByStatus(status));
    }

}

