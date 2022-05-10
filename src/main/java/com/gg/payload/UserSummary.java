package com.gg.payload;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserSummary {

    private Long id;
    private String nickname;
    private String email;

    public UserSummary(Long id, String nickname, String email) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
    }
}