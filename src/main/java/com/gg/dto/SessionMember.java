package com.gg.dto;

import com.gg.domain.Member;
import lombok.Getter;

import java.io.Serializable;

//직렬화 기능을 가진 Member 클래스
@Getter
public class SessionMember implements Serializable {
    private String nickname;
    private String email;

    public SessionMember(Member member){
        this.nickname = member.getNickname();
        this.email = member.getEmail();

    }
}
