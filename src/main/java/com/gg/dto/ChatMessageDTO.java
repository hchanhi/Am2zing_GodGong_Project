package com.gg.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    private String roomNumber;
    private String userNickname;
    private String message;
}
