package com.cricranker.players.Controller;

import com.cricranker.players.Data.Player;
import com.cricranker.players.Service.PlayersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class PlayerController {

    @Autowired
    private PlayersService playersService;

    @PostMapping("/players")
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playersService.createPlayer(player);
        return ResponseEntity.ok(createdPlayer);
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable UUID id) {
        Optional<Player> player = playersService.getPlayerById(id);
        return player.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/players")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playersService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/players/search")
    public ResponseEntity<List<Player>> searchPlayers(@RequestParam(required = false) String name,
                                                      @RequestParam(required = false) Integer age,
                                                      @RequestParam(required = false) String country) {
        List<Player> players = playersService.searchPlayers(name, age, country);
        return ResponseEntity.ok(players);
    }

    @PutMapping("/players/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable UUID id, @RequestBody Player playerDetails) {
        try {
            Player updatedPlayer = playersService.updatePlayer(id, playerDetails);
            return ResponseEntity.ok(updatedPlayer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}