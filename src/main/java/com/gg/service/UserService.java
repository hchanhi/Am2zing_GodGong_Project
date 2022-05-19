package com.gg.service;

import com.gg.config.jwt.JwtTokenProvider;
import com.gg.domain.User;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


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

    // 회원 정보 삭제
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }


    // 회원 닉네임 변경
    public boolean updateNickname(Long id, String nickname){
        boolean check = true;
        if(userRepository.existsByNickname(nickname)){
            check = false;
            return check;
        }else {
            User user = userRepository.findById(id).get();
            user.setNickname(nickname);
            userRepository.save(user);
            return check;
        }
        //토큰..refresh
    }

    // 회원 비밀번호 변경
    public boolean updatePassword(Long id, String oldPassword, String newPassword){
        boolean check = true;
        User user = userRepository.findById(id).get();
        if(passwordEncoder.matches(oldPassword, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            check = false;
        }
        return check;

    }

    // 회원 생년월일 변경
    public void updateBirth(Long id, String birth){
        User user = userRepository.findById(id).get();
        user.setBirth(birth);
        userRepository.save(user);
    }
}
