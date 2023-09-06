package com.example.backend.service;

import java.util.HashSet;
import java.util.Set;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginUserResponse;
import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public ApplicationUser registerUser(String username, String password){
        logger.info("reached Register"+username+password);
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();

        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        logger.info("User Added");
        return userRepository.save(new ApplicationUser(
            0,
            username,
            encodedPassword,
            authorities
        ));
        
    }
    
    public LoginUserResponse loginUser(String user, String password){
        logger.info("reached Login"+user+password);
        try{

            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user, password)
            );
            logger.info("reached auth");
            String token = tokenService.generateJwt(auth);
            logger.info("reached token", token);
            return new LoginUserResponse(userRepository.findByUsername(user).get(), token);

        }catch(AuthenticationException e){
            return new LoginUserResponse(null,"");
        }

    }

}
