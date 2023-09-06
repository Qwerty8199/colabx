package com.example.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginUserResponse;
import com.example.backend.dto.RegisterUserRequest;
import com.example.backend.model.ApplicationUser;
import com.example.backend.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthContoller {

    private static final Logger logger = LoggerFactory.getLogger(AuthContoller.class);

    @Autowired
    private AuthenticationService authenticationService;
    
    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegisterUserRequest body){
        logger.info("reached Register");
        logger.info(body.toString());
        return authenticationService.registerUser(body.getUsername(),body.getPassword());
    }

    @PostMapping("/login")
    public LoginUserResponse loginUser(@RequestBody RegisterUserRequest body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }


}
