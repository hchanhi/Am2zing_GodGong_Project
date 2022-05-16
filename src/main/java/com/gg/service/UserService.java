package com.gg.service;

import com.gg.domain.User;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User findBynickname(String nickname){
       return userRepository.findByNickname(nickname);
    }

    public void deleteUser(String nickname){
        User user = userRepository.findByNickname(nickname);
        userRepository.deleteById(user.getId());
    }


    public void updateNickname(Long id, String nickname){
        User user = userRepository.findById(id).get();
        user.setNickname(nickname);
        //토큰..refresh
    }

    public void updatePassword(Long id, String password){
        User user = userRepository.findById(id).get();
        user.setPassword(passwordEncoder.encode(password));
        //토큰..refresh
    }
}
