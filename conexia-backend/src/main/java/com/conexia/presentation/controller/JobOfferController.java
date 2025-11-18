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

    // ========= PÚBLICO / EGRESADOS =========

    @GetMapping("/active")
    public ResponseEntity<List<JobOfferDTO>> getActiveOffers() {
        return ResponseEntity.ok(jobOfferService.findActive());
    }

    @GetMapping("/active/{id}")
    public ResponseEntity<JobOfferDTO> getActiveById(@PathVariable Long id) {
        return ResponseEntity.ok(jobOfferService.findActiveById(id));
    }

    // ========= EMPLEADOR =========

    @GetMapping("/employer/{employerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployerOwner(#employerId)")
    public ResponseEntity<List<JobOfferDTO>> getByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(jobOfferService.findByEmployer(employerId));
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLEADOR') or hasRole('ADMIN')")
    public ResponseEntity<JobOfferDTO> create(@Valid @RequestBody JobOfferCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobOfferService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    public ResponseEntity<JobOfferDTO> update(@PathVariable Long id,
                                              @Valid @RequestBody JobOfferUpdateDTO dto) {
        return ResponseEntity.ok(jobOfferService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobOfferService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ========= ADMIN =========

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobOfferDTO>> getAll() {
        return ResponseEntity.ok(jobOfferService.findAll());
    }

    @GetMapping("/paginated")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<JobOfferDTO>> getAllPaginated(Pageable pageable) {
        return ResponseEntity.ok(jobOfferService.findAll(pageable));
    }

    // ========= PATCH: cerrar oferta =========

    @PatchMapping("/{id}/close")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#id)")
    public ResponseEntity<JobOfferDTO> closeOffer(@PathVariable Long id) {
        JobOfferUpdateDTO dto = new JobOfferUpdateDTO(
                null, null, null, null,
                JobOfferStatus.CERRADA
        );
        return ResponseEntity.ok(jobOfferService.update(id, dto));
    }

    // ========= ADMIN: buscar por estado =========

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobOfferDTO>> findByStatus(@PathVariable JobOfferStatus status) {
        return ResponseEntity.ok(jobOfferService.findByStatus(status));
    }
}


