package com.example.myblog.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String status;
    private String genre;
    private String platform;
    private LocalDate release;
    private LocalDate playDate;
    private String library;
    private Integer achievementsUnlock;
    private Integer achievementsCount;
    private Integer gameScore;
    private Integer gameScoreCount;

//    public int progress() {
//        if (achievementsCount != null) {
//            double d = (double) achievementsUnlock / achievementsCount;
//            return (int) (d * 100);
//        } else return 0;
//    }
}
