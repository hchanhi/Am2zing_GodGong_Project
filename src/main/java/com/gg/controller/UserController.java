package com.gg.controller;

import com.gg.config.CurrentUser;
import com.gg.domain.User;
import com.gg.exception.ResourceNotFoundException;
import com.gg.payload.UserIdentityAvailability;
import com.gg.payload.UserProfile;
import com.gg.payload.UserSummary;
import com.gg.payload.request.PasswordRequest;
import com.gg.payload.request.RequestChangePassword;
import com.gg.payload.response.ApiResponse;
import com.gg.repository.UserRepository;
import com.gg.service.AuthService;
import com.gg.service.PrincipalDetails;
import com.gg.service.UserService;
import com.gg.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;


// UserController, API 작성
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private RedisUtil redisUtil;


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

    //닉네임 변경
    @PostMapping("/user/{id}/nickname")
    public void editNickname(@RequestBody HashMap<String, String> param){
       Long id = Long.parseLong(param.get("id"));
       String nickname = param.get("nickname");
       userService.updateNickname(id, nickname);
    }

    //비밀번호 번경
    @PostMapping("/user/{id}/password")
    public boolean editPassword(@RequestBody HashMap<String, String> param){
        Long id = Long.parseLong(param.get("id"));
        String oldPassword = param.get("oldPassword");
        String newPassword = param.get("newPassword");
        return userService.updatePassword(id, oldPassword, newPassword);
    }

    //회원 삭제
    @GetMapping("/user/{id}/delete")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @PostMapping("/user/{id}/birth")
    public void editBirth(@RequestBody HashMap<String, String> param){
        Long id = Long.parseLong(param.get("id"));
        String birth = param.get("birth");
        userService.updateBirth(id, birth);
    }

    // 비밀번호 찾기
    @GetMapping("/user/password/{key}")
    public ApiResponse isPasswordUUIdValidate(@PathVariable String key) {
        ApiResponse apiResponse;
        try {
            if (authService.isPasswordUuidValidate(key))
                apiResponse = new ApiResponse(true, authService.getUserEmailByCode(key));
            else
                apiResponse = new ApiResponse(false, "1");
        } catch (Exception e) {
            apiResponse = new ApiResponse(false, "1");
        }
        return apiResponse;
    }

    @PostMapping("/user/password")
        public ApiResponse requestChangePassword(@RequestBody RequestChangePassword requestChangePassword) {
            ApiResponse apiResponse;
            try {
                User user = authService.findByEmail(requestChangePassword.getEmail());
                System.out.println(user);
                if (!user.getEmail().equals(requestChangePassword.getEmail())) throw new NoSuchFieldException("");
                authService.requestChangePassword(user);
                apiResponse = new ApiResponse(true, "비밀번호 변경 메일을 발송했습니다. 가입하신 계정의 메일함을 확인해 주세요!");
            } catch (NoSuchFieldException e) {
                apiResponse = new ApiResponse(false, "1");
            } catch (Exception e) {
                apiResponse = new ApiResponse(false, "1");
            }
        return apiResponse;
    }

    @PutMapping("/user/password")
    public ApiResponse changePassword(@RequestBody PasswordRequest passwordRequest) {
        ApiResponse apiResponse;
        try{
            User user = authService.findByEmail(passwordRequest.getEmail());
            authService.changePassword(user, passwordRequest.getPassword());
            apiResponse = new ApiResponse(true,"성공적으로 회원님의 비밀번호를 변경했습니다!");
        }catch(Exception e){
            apiResponse = new ApiResponse(false,"회원님의 비밀번호 변경에 실패했습니다. 다시 시도해 주세요!");
        }
        return apiResponse;

    }
}
