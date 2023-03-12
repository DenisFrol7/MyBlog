package com.example.myblog.services;

import com.example.myblog.models.Game;
import com.example.myblog.repository.GameRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

    @Transactional
    public void save(Game game) {
        gameRepository.save(game);
    }

    public void delete(Game game) {
        gameRepository.delete(game);
    }

    public Game findGame(Long id) {
        return gameRepository.findAllById(id);
    }
}
