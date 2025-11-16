package com.conexia.presentation.controller;

import com.conexia.service.ApplicationService;
import com.conexia.service.dto.ApplicationCreateDTO;
import com.conexia.service.dto.ApplicationDTO;
import com.conexia.service.dto.ApplicationUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Postulaciones", description = "Gestión de postulaciones a ofertas laborales")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    // ===== GRADUADO =====
    @Operation(summary = "Postularse a una oferta laboral")
    @PostMapping
    @PreAuthorize("hasRole('EGRESADO') or hasRole('ADMIN')")
    public ResponseEntity<ApplicationDTO> apply(@Valid @RequestBody ApplicationCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.apply(dto));
    }

    @Operation(summary = "Obtener mis postulaciones")
    @GetMapping("/graduate/{graduateId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isGraduateOwner(#graduateId)")
    public ResponseEntity<List<ApplicationDTO>> getByGraduate(@PathVariable Long graduateId) {
        return ResponseEntity.ok(service.getByGraduate(graduateId));
    }

    // ===== EMPLEADOR =====
    @Operation(summary = "Ver postulaciones a una oferta laboral")
    @GetMapping("/offer/{offerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isJobOfferOwner(#offerId)")
    public ResponseEntity<List<ApplicationDTO>> getByOffer(@PathVariable Long offerId) {
        return ResponseEntity.ok(service.getByOffer(offerId));
    }

    // ===== EMPLEADOR/ADMIN =====
    @Operation(summary = "Actualizar el estado de una postulación")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployerOwnerOfApplication(#id)")
    public ResponseEntity<ApplicationDTO> updateStatus(@PathVariable Long id,
                                                       @Valid @RequestBody ApplicationUpdateDTO dto) {
        return ResponseEntity.ok(service.updateStatus(id, dto));
    }
}

