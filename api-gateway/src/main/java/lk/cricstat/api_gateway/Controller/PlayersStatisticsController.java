package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
public class PlayersStatisticsController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("api/players/top-scorers")
    public Flux<Map<String, Object>> getTopScorers() {
        WebClient webClient = webClient();

        Mono<List<Map<String, Object>>> topScorers = webClient.get()
                .uri("http://localhost:8084/stats/top-scorers")
                .retrieve()
                .bodyToFlux((Class<Map<String, Object>>)(Class<?>)Map.class)
                .collectList();

        return topScorers.flatMapMany(statsList -> {
            return Flux.fromIterable(statsList).flatMap(stats -> {
                int playerId = (int) stats.get("playerId");

                return webClient.get()
                        .uri("http://localhost:8081/players/" + playerId)
                        .retrieve()
                        .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                        .map(playerDetails -> {
                            Map<String, Object> combined = new HashMap<>(playerDetails);
                            combined.putAll(stats);
                            return combined;
                        });
            });
        });
    }

    @GetMapping("api/players/top-bowlers")
    public Flux<Map<String, Object>> getTopBowlers() {
        WebClient webClient = webClient();

        Mono<List<Map<String, Object>>> topBowlers = webClient.get()
                .uri("http://localhost:8084/stats/top-bowlers")
                .retrieve()
                .bodyToFlux((Class<Map<String, Object>>)(Class<?>)Map.class)
                .collectList();

        return topBowlers.flatMapMany(statsList -> {
            return Flux.fromIterable(statsList).flatMap(stats -> {
                int playerId = (int) stats.get("playerId");

                return webClient.get()
                        .uri("http://localhost:8081/players/" + playerId)
                        .retrieve()
                        .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                        .map(playerDetails -> {
                            Map<String, Object> combined = new HashMap<>(playerDetails);
                            combined.putAll(stats);
                            return combined;
                        });
            });
        });
    }

    //Create Player --> Create Player Stats(Initial)
    @PostMapping("/api/players")
    public Mono<Map<String, Object>> createPlayer(@RequestBody Map<String, Object> player) {
        return webClient().post()
                .uri("http://localhost:8081/players")
                .bodyValue(player)
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(createdPlayer -> {
                    return webClient().post()
                            .uri("http://localhost:8084/stats")
                            .bodyValue(Map.of("playerId", createdPlayer.get("playerId")))
                            .retrieve()
                            .bodyToMono(Void.class)
                            .thenReturn((Map<String, Object>) createdPlayer);
                });
    }

    @GetMapping("/api/player/{player_id}/stats")
    public Mono<Map<String, Object>> getPlayerStatistics(@PathVariable("player_id") int playerId) {
        WebClient webClient = webClient();

        Mono<Map<String, Object>> playerDetailsMono = webClient.get()
                .uri("http://localhost:8081/players/{playerId}", playerId)
                .retrieve()
                .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class);

        Mono<Map<String, Object>> playerStatsMono = webClient.get()
                .uri("http://localhost:8084/player/{player_id}/stats", playerId)
                .retrieve()
                .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class);

        return Mono.zip(playerDetailsMono, playerStatsMono)
                .map(tuple -> {
                    Map<String, Object> combined = new HashMap<>(tuple.getT1());
                    combined.putAll(tuple.getT2());
                    return combined;
                });
    }

}