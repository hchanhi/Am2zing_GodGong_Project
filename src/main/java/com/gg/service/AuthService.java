package com.gg.service;

import com.gg.domain.User;
import com.gg.repository.UserRepository;
import com.gg.util.RedisUtil;
import com.mysql.cj.exceptions.PasswordExpiredException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.UUID;

@Service
@Slf4j
public class AuthService {

    final String REDIS_CHANGE_PASSWORD_PREFIX="CPW";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    public PasswordEncoder passwordEncoder;



    // 링크를 전송할 이메일 찾기
    public User findByEmail(String email) throws NotFoundException {
        User user = userRepository.findByEmail(email).get();
        if(user.getEmail().isEmpty()) throw new NotFoundException("멤버가 조회되지 않음");
        return user;
    }

    // redis를 통해 key에서 이메일 찾기
    public boolean isPasswordUuidValidate(String key){
        String email = redisUtil.getData(key);
        return !email.equals("");
    }

    // code가 유효한지 검증
    public String getUserEmailByCode(String code) {
        String email = redisUtil.getData(code); // 입력 받은 인증 코드(key)를 이용해 email(value)을 꺼낸다.
        if (email == null) { // email이 존재하지 않으면, 유효 기간 만료이거나 코드 잘못 입력
            throw new PasswordExpiredException();
        }
         // 해당 email로 user를 꺼낸다.
        return email;
    }


    // 비밀번호 변경 링크를 이메일로 전송
    public void requestChangePassword(User user) throws NotFoundException{
        String CHANGE_PASSWORD_LINK = "http://localhost:3000/user/passwordChange/";
        if(user == null) throw new NotFoundException("잘못된 경로입니다. 다시 시도해 주세요.");
        String key = REDIS_CHANGE_PASSWORD_PREFIX+UUID.randomUUID();
        System.out.println(key);
        redisUtil.setDataExpire(key, user.getEmail(),60 * 30L);
        emailService.sendMail(user.getEmail(),"[Godgong] 회원 비밀번호 변경 안내 메일","비밀번호 재설정을 위한 링크를 전송했습니다.\n\n 아래의 링크로 접속해 비밀번호를 재설정해 주세요!\n\n" +  CHANGE_PASSWORD_LINK+key + "\n\n\n\n 같이 공부해요 GodGong!!");
    }

    // 링크를 통해 비밀번호 변경 실행
    public void changePassword(User user,String password) throws NotFoundException{
        if(user == null) throw new NotFoundException("잘못된 경로입니다. 다시 시도해 주세요");
        password = passwordEncoder.encode(password);
        user.setPassword(password);
        userRepository.save(user);
    }



}
