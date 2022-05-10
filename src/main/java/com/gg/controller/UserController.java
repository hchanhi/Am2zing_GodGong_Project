package com.gg.controller;

import com.gg.config.CurrentUser;
import com.gg.domain.User;
import com.gg.exception.ResourceNotFoundException;
import com.gg.payload.UserIdentityAvailability;
import com.gg.payload.UserProfile;
import com.gg.payload.UserSummary;
import com.gg.repository.UserRepository;
import com.gg.service.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



// UserController, API 작성
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 현재 로그인한 유저
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser PrincipalDetails currentUser) {

        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getEmail(), currentUser.getUsername());
        return userSummary;
    }

    // 유저 닉네임 체크
    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "nickname") String nickname) {
        Boolean isAvailable = !userRepository.existsByNickname(nickname);
        return new UserIdentityAvailability(isAvailable);
    }

    // 유저 이메일 체크
    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    // 유저 프로필
    @GetMapping("/users/{email}")
    public UserProfile getUserProfile(@PathVariable(value = "email") String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        UserProfile userProfile = new UserProfile(user.getId(), user.getNickname(), user.getEmail());

        return userProfile;
    }
}
