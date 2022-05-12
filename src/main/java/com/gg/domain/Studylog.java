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
public class Studylog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studylogId;


    private Timestamp studylogTotal;

    @CreationTimestamp
    private Timestamp studylogCreated;

    @ManyToOne
    private User user;


}
