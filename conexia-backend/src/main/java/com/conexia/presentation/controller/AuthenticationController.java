package com.conexia.presentation.controller;

import com.conexia.persistence.entity.enums.RoleName;
import com.conexia.service.dto.AuthCreatedUserRequest;
import com.conexia.service.dto.AuthLoginRequest;
import com.conexia.service.dto.AuthResponse;
import com.conexia.service.impl.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  private final UserDetailsServiceImpl userDetailsService;

  public AuthenticationController(UserDetailsServiceImpl userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest userRequest){
    return new ResponseEntity<>(this.userDetailsService.loginUser(userRequest), HttpStatus.OK);
  }

  @PostMapping("/register/graduate")
  public ResponseEntity<AuthResponse> registerEgresado(@RequestBody @Valid AuthCreatedUserRequest request) {
    AuthResponse response = userDetailsService.createUser(request, "ROLE_" + RoleName.EGRESADO);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PostMapping("/register/institution")
  public ResponseEntity<AuthResponse> registerInstitucion(@RequestBody @Valid AuthCreatedUserRequest request) {
    AuthResponse response = userDetailsService.createUser(request, "ROLE_" + RoleName.INSTITUCION);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PostMapping("/register/employer")
  public ResponseEntity<AuthResponse> registerEmpleador(@RequestBody @Valid AuthCreatedUserRequest request) {
    AuthResponse response = userDetailsService.createUser(request, "ROLE_" + RoleName.EMPLEADOR);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }



}
