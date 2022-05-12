package com.gg.domain;

import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;


    private String messageContent;


    @ManyToOne
    private User user;

    @ManyToOne
    private Room room;


}
