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
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;


    private String todoContent;


    @CreationTimestamp
    private Timestamp todoCreated;

    @ManyToOne
    private Member member;


}
