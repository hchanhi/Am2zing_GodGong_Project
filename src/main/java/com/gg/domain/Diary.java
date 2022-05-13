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
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;


    private String diaryContent;


    private String diarySentiment;

    @CreationTimestamp
    private Timestamp diaryCreated;

    @ManyToOne
    private User user;
}
