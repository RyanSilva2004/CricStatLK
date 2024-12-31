package lk.crickstat.players.Service;

import lk.crickstat.players.Data.Player;
import lk.crickstat.players.Data.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(int playerId) {
        return playerRepository.findById(playerId);
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(int playerId, Player playerDetails) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new RuntimeException("Player not found"));
        player.setName(playerDetails.getName());
        player.setCountry(playerDetails.getCountry());
        player.setDateOfBirth(playerDetails.getDateOfBirth());
        player.setImage(playerDetails.getImage());
        return playerRepository.save(player);
    }

    public void deletePlayer(int playerId) {
        playerRepository.deleteById(playerId);
    }

    public List<Player> searchPlayers(String name, String country) {
        return playerRepository.searchPlayers(name, country);
    }
}