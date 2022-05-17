package com.gg.controller;

import com.gg.config.CurrentUser;
import com.gg.domain.User;
import com.gg.exception.ResourceNotFoundException;
import com.gg.payload.UserIdentityAvailability;
import com.gg.payload.UserProfile;
import com.gg.payload.UserSummary;
import com.gg.repository.UserRepository;
import com.gg.service.PrincipalDetails;
import com.gg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



// UserController, API 작성
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 현재 로그인한 유저
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser PrincipalDetails currentUser) {

        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getNickname());
        return userSummary;
    }

    // 유저 닉네임 체크
    @GetMapping("/user/checkNicknameAvailability")
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

    @GetMapping("/users/{id}")
    public UserProfile getUserProfile(@PathVariable(value = "id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        UserProfile userProfile = new UserProfile(user.getId(), user.getNickname(), user.getEmail(), user.getBirth());

        return userProfile;
    }

    @PostMapping("/user/{id}/nickname")
    public void editNickname(@PathVariable Long id, String nickname){
        userService.updateNickname(id, nickname);
    }

    @PostMapping("/user/{id}/password")
    public void editPassword(@PathVariable Long id, String password){
        userService.updatePassword(id, password);
    }
}
