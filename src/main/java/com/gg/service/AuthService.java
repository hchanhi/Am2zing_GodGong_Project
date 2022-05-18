package com.gg.service;


import com.gg.domain.User;
import org.webjars.NotFoundException;

public interface AuthService {

    final String REDIS_CHANGE_PASSWORD_PREFIX="CPW";

    User findByEmail(String email) throws NotFoundException;

    boolean isPasswordUuidValidate(String key);

    void requestChangePassword(User user) throws NotFoundException;
}
