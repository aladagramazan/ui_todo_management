package com.remaladag.todo.service;

import com.remaladag.todo.dto.JwtAuthResponse;
import com.remaladag.todo.dto.LoginDTO;
import com.remaladag.todo.dto.RegisterDTO;
import com.remaladag.todo.entity.Role;
import com.remaladag.todo.entity.User;
import com.remaladag.todo.exception.TodoApiException;
import com.remaladag.todo.repository.RoleRepository;
import com.remaladag.todo.repository.UserRepository;
import com.remaladag.todo.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    @Override
    public String register(RegisterDTO registerDTO) {

        // check username is already exists in database
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Username is already taken!");
        }

        // check email is already exists in database
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Email is already taken!");
        }

        User user = User.builder()
                .name(registerDTO.getName())
                .username(registerDTO.getUsername())
                .email(registerDTO.getEmail())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .roles(Collections.singleton(roleRepository.findByName("ROLE_USER")))
                .build();

        userRepository.save(user);

        return "User registered successfully!";
    }

    @Override
    public JwtAuthResponse login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                (loginDTO.getUsernameOrEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> optionalUser = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(), loginDTO.getUsernameOrEmail());

        String role = null;
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Role> optionalRole = user.getRoles().stream().findFirst();

            if (optionalUser.isPresent()) {
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        return JwtAuthResponse.builder()
                .accessToken(token)
                .role(role)
                .build();
    }
}
