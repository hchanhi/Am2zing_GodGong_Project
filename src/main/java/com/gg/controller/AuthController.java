package com.gg.controller;


import com.gg.config.jwt.JwtTokenProvider;
import com.gg.domain.ERole;
import com.gg.domain.RefreshToken;
import com.gg.domain.Role;
import com.gg.domain.User;
import com.gg.exception.AppException;
import com.gg.exception.TokenRefreshException;
import com.gg.payload.request.LoginRequest;
import com.gg.payload.request.SignUpRequest;

import com.gg.payload.request.TokenRefreshRequest;
import com.gg.payload.response.ApiResponse;
import com.gg.payload.response.JwtAuthenticationResponse;
import com.gg.payload.response.TokenRefreshReesponse;
import com.gg.repository.RoleRepository;
import com.gg.repository.UserRepository;
import com.gg.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        //refreshToken ??????
        com.gg.domain.RefreshToken refreshToken = refreshTokenService.createRefreshToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, refreshToken.getToken()));
    }

    // refreshToken
    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest tokenRefreshRequest) {
        String requestRefreshToken = tokenRefreshRequest.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    Authentication authentication = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user.getEmail(), user.getPassword()
                            )
                    );
                    String token = tokenProvider.generateToken(authentication);
                    return ResponseEntity.ok(new TokenRefreshReesponse(token, requestRefreshToken));

                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "???????????? ????????? ????????????????????? ????????????!"));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByNickname(signUpRequest.getNickname())) {
            return new ResponseEntity(new ApiResponse(false, "?????? ???????????? ????????? ?????????. "),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "?????? ???????????? ????????? ?????????."),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setNickname(signUpRequest.getNickname());
        user.setBirth(signUpRequest.getBirth());
        user.setPassword(signUpRequest.getPassword());


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new AppException("?????? ????????? ???????????? ???????????????."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "??????????????? ?????????????????????."));
    }
}