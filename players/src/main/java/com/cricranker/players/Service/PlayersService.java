package com.cricranker.players.Service;

import com.cricranker.players.Data.Player;
import com.cricranker.players.Data.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlayersService {

    @Autowired
    private PlayerRepository playerRepository;

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Optional<Player> getPlayerById(UUID id) {
        return playerRepository.findById(id);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> searchPlayers(String name, Integer age, String country) {
        return playerRepository.searchPlayers(name, age, country);
    }

    public Player updatePlayer(UUID id, Player playerDetails) {
        return playerRepository.findById(id).map(player -> {
            player.setFirstName(playerDetails.getFirstName());
            player.setLastName(playerDetails.getLastName());
            player.setAge(playerDetails.getAge());
            player.setCountry(playerDetails.getCountry());
            player.setImageUrl(playerDetails.getImageUrl());
            player.setBattingAvg(playerDetails.getBattingAvg());
            player.setBattingSr(playerDetails.getBattingSr());
            player.setBowlingAvg(playerDetails.getBowlingAvg());
            player.setBowlingSr(playerDetails.getBowlingSr());
            return playerRepository.save(player);
        }).orElseThrow(() -> new RuntimeException("Player not found with id " + id));
    }
}