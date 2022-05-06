package com.gg.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import javax.persistence.*;
import java.sql.Timestamp;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;


    private String roomCategory;


    private String roomTitle;

    private String roomValid;

    private String roomEntry;

    @CreationTimestamp
    private Timestamp roomCreated;

    @ManyToOne
    private Member member;


}
