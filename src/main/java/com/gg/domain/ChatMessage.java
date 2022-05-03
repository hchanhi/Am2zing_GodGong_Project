package com.gg.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    public enum MessageType{
        ENTER, TALK
    }

    private MessageType type;

    private String roomId;

    private Member member;

    private String message;
}
