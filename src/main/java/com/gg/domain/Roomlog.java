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
public class Roomlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomlogId;

    @ManyToOne
    private Member member;

    @ManyToOne
    private Todo todo;


}
