package com.gg.payload;

import java.time.Instant;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserProfile {

    private Long id;
    private String nickname;
    private String email;

    private String birth;



    public UserProfile(Long id, String nickname, String email, String birth) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.birth = birth;

    }
}