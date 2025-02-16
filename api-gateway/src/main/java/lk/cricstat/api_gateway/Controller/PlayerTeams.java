package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PlayerTeams
{
    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/players/search")
    public Mono<ResponseEntity<List<Map>>> searchPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String country) {
        return webClient()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8081)
                        .path("/players/search")
                        .queryParamIfPresent("name", Optional.ofNullable(name))
                        .queryParamIfPresent("country", Optional.ofNullable(country))
                        .build())
                .retrieve()
                .bodyToFlux(Map.class)
                .flatMap(player -> {
                    String teamId = (String) player.get("country"); // Assuming 'country' is the team's ID
                    return webClient()
                            .get()
                            .uri("http://localhost:8085/teams/{id}", teamId)
                            .retrieve()
                            .bodyToMono(Map.class)
                            .map(team -> {
                                player.put("teamImage", team.get("image"));
                                return player;
                            });
                })
                .collectList()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/api/teams/{teamId}/players")
    public Mono<ResponseEntity<List<Map>>> getPlayersByTeamId(@PathVariable String teamId) {
        return webClient()
                .get()
                .uri("http://localhost:8081/teams/{teamId}/players", teamId)
                .retrieve()
                .bodyToFlux(Map.class)
                .flatMap(player -> {
                    Integer playerId = (int) player.get("playerId");
                    return webClient()
                            .get()
                            .uri("http://localhost:8084/players/{playerId}/stats", playerId)
                            .retrieve()
                            .bodyToFlux(Map.class)
                            .collectList()
                            .map(stats -> {
                                player.put("stats", stats);
                                return player;
                            });
                })
                .collectList()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}