package com.gg.service;

import com.gg.domain.User;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User findBynickname(String nickname){
       return userRepository.findByNickname(nickname);
    }

    public void deleteUser(String nickname){
        User user = userRepository.findByNickname(nickname);
        userRepository.deleteById(user.getId());
    }
}
