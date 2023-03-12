package com.example.myblog.repository;

import com.example.myblog.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
    Game findAllById(Long id);
}
