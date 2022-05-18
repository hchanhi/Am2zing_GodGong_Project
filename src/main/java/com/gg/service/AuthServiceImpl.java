package com.gg.service;

import com.gg.domain.User;
import com.gg.repository.UserRepository2;
import com.gg.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.UUID;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {


    @Autowired
    private UserRepository2 userRepository2;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    public PasswordEncoder passwordEncoder;



    @Override
    public User findByEmail(String email) throws NotFoundException {
        User user = userRepository2.findByEmail(email);
        if(user == null) throw new NotFoundException("멤버가 조회되지 않음");
        return user;
    }
//    @Override
//    public void modifyUserRole(User user, ERole eRole){
//        user.setRole(eRole);
//        memberRepository.save(member);
//    }

    @Override
    public boolean isPasswordUuidValidate(String key){
        String userId = redisUtil.getData(key);
        return !userId.equals("");
    }


    @Override
    public void requestChangePassword(User user) throws NotFoundException{
        String CHANGE_PASSWORD_LINK = "http://localhost:8080/api/user/password/";
        if(user == null) throw new NotFoundException("멤버가 조회되지 않음.");
        String key = REDIS_CHANGE_PASSWORD_PREFIX+UUID.randomUUID();
        System.out.println(key);
        redisUtil.setDataExpire(key, user.getEmail(),60 * 30L);
        emailService.sendMail(user.getEmail(),"[Godgong] 회원 비밀번호 안내 메일",CHANGE_PASSWORD_LINK+key);
    }

    @Override
    public void changePassword(User user,String password) throws NotFoundException{
        if(user == null) throw new NotFoundException("changePassword(),멤버가 조회되지 않음");
        password = passwordEncoder.encode(password);
        user.setPassword(password);
        userRepository2.save(user);
    }



}
