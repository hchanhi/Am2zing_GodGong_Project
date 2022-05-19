package com.gg.domain;

import lombok.*;

import javax.persistence.*;

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

}
