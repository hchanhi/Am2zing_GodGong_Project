package com.gg.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomNumber;

    private String roomCategory;

    private String roomTitle;

    @CreationTimestamp
    private Timestamp roomCreated;

    @ManyToOne
    private User user;


    public static Room create(String roomCategory, String roomTitle, User user){
        Room room = new Room();
        room.roomNumber = UUID.randomUUID().toString();
        room.roomCategory = roomCategory;
        room.roomTitle = roomTitle;
        room.user = user;

        return room;
    }

}
