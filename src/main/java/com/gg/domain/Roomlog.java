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
public class Roomlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomlogId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Room room;

    @CreationTimestamp
    private Timestamp roomlogCreated;

}
