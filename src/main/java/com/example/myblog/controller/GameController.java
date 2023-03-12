package com.example.myblog.controller;

import com.example.myblog.models.Game;
import com.example.myblog.services.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("game")
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getGames() {
        return gameService.findAll();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable("id") Long id) {
        return gameService.findGame(id);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> create(@RequestBody Game game) {
        gameService.save(game);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Game game) {
        gameService.delete(game);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
