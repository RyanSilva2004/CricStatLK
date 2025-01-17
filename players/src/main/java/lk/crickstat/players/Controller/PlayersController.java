package lk.crickstat.players.Controller;

import lk.crickstat.players.Data.Player;
import lk.crickstat.players.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayersController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/players")
    public Player createPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    @GetMapping("/players")
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/players/{playerId}")
    public ResponseEntity<Player> getPlayerById(@PathVariable int playerId) {
        return playerService.getPlayerById(playerId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/players/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable int playerId, @RequestBody Player playerDetails) {
        return ResponseEntity.ok(playerService.updatePlayer(playerId, playerDetails));
    }

    @DeleteMapping("/players/{playerId}")
    public ResponseEntity<Void> deletePlayer(@PathVariable int playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/players/search")
    public List<Player> searchPlayers(@RequestParam(required = false) String name, @RequestParam(required = false) String country) {
        return playerService.searchPlayers(name, country);
    }

    @GetMapping("/teams/{teamId}/players")
    public List<Player> getPlayersByTeamId(@PathVariable String teamId) {
        return playerService.getPlayersByTeamId(teamId);
    }
}