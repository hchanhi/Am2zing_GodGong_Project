package com.gg.service;

import com.gg.config.jwt.JwtTokenProvider;
import com.gg.domain.User;
import com.gg.payload.response.JwtAuthenticationResponse;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    public User findBynickname(String nickname){
       return userRepository.findByNickname(nickname);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }


    public ResponseEntity<?> updateNickname(Long id, String nickname){
        User user = userRepository.findById(id).get();
        user.setNickname(nickname);
        //토큰..refresh
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    public void updatePassword(Long id, String password){
        User user = userRepository.findById(id).get();
        user.setPassword(passwordEncoder.encode(password));
        //토큰..refresh
    }
}
