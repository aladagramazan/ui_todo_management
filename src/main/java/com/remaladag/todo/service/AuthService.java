package com.remaladag.todo.service;

import com.remaladag.todo.dto.JwtAuthResponse;
import com.remaladag.todo.dto.LoginDTO;
import com.remaladag.todo.dto.RegisterDTO;

public interface AuthService {

    String register(RegisterDTO registerDTO);

    JwtAuthResponse login(LoginDTO loginDTO);
}
