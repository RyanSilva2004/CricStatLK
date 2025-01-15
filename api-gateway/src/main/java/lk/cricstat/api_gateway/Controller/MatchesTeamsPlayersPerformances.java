package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MatchesTeamsPlayersPerformances
{
    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/matches/{id}")
    public Mono<ResponseEntity<Map<String, Object>>> getMatchDetails(@PathVariable int id) {
        return webClient()
                .get()
                .uri("http://localhost:8082/matches/{id}", id)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .flatMap(matchDetails -> {
                    // Fetch team1 and team2 images
                    Mono<String> team1ImageMono = webClient()
                            .get()
                            .uri("http://localhost:8085/teams/{id}", matchDetails.get("team1Id"))
                            .retrieve()
                            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                            .map(team -> (String) team.get("image"));

                    Mono<String> team2ImageMono = webClient()
                            .get()
                            .uri("http://localhost:8085/teams/{id}", matchDetails.get("team2Id"))
                            .retrieve()
                            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                            .map(team -> (String) team.get("image"));

                    // Fetch performances for the match
                    Mono<List<Map<String, Object>>> performancesMono = webClient()
                            .get()
                            .uri("http://localhost:8083/matches/{matchId}/performances", id)
                            .retrieve()
                            .bodyToFlux(new ParameterizedTypeReference<Map<String, Object>>() {})
                            .flatMap(performance -> {
                                // Fetch player details for each performance
                                Mono<Map<String, Object>> playerDetailsMono = webClient()
                                        .get()
                                        .uri("http://localhost:8081/players/{playerId}", performance.get("playerId"))
                                        .retrieve()
                                        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});

                                return playerDetailsMono.map(player -> {
                                    performance.put("playerName", player.get("name"));
                                    performance.put("playerImage", player.get("image"));
                                    return performance;
                                });
                            })
                            .collectList();

                    // Combine all responses
                    return Mono.zip(team1ImageMono, team2ImageMono, performancesMono)
                            .map(tuple -> {
                                matchDetails.put("team1Image", tuple.getT1());
                                matchDetails.put("team2Image", tuple.getT2());
                                matchDetails.put("performances", tuple.getT3());
                                return matchDetails;
                            });
                })
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}