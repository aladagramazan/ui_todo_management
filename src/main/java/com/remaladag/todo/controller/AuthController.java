package com.remaladag.todo.controller;

import com.remaladag.todo.dto.JwtAuthResponse;
import com.remaladag.todo.dto.LoginDTO;
import com.remaladag.todo.dto.RegisterDTO;
import com.remaladag.todo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    // Build the register endpoint here
    // The endpoint should be a POST request at /api/auth/register
    // It should take a RegisterDTO as a parameter
    // It should return a ResponseEntity<String>
    // The method should call the register method of the authService

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        String response = authService.register(registerDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDTO loginDTO) {
        JwtAuthResponse jwtAuthResponse = authService.login(loginDTO);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

}
