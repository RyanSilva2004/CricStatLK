package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class MatchController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @PostMapping("/api/matches")
    public Mono<ResponseEntity<Map<String, Object>>> createMatch(@RequestBody Map<String, Object> matchData) {
        return webClient()
                .post()
                .uri("http://localhost:8082/matches")
                .bodyValue(matchData)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @PutMapping("/api/matches/{matchId}")
    public Mono<ResponseEntity<Map<String, Object>>> updateMatch(@PathVariable int matchId, @RequestBody Map<String, Object> matchDetails) {
        return webClient()
                .put()
                .uri("http://localhost:8082/matches/{matchId}", matchId)
                .bodyValue(matchDetails)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/api/matches/{matchId}")
    public Mono<ResponseEntity<Map<String, Object>>> getMatchById(@PathVariable int matchId) {
        return null;
    }

    @GetMapping("/api/matches")
    public Mono<ResponseEntity<List<Map<String, Object>>>> getAllMatches() {
        return webClient()
                .get()
                .uri("http://localhost:8082/matches")
                .retrieve()
                .bodyToFlux((Class<Map<String, Object>>)(Class<?>)Map.class)
                .flatMap(match -> {
                    Mono<String> team1ImageMono = webClient()
                            .get()
                            .uri("http://localhost:8085/teams/{id}", match.get("team1Id"))
                            .retrieve()
                            .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                            .map(team -> (String) team.get("image"));

                    Mono<String> team2ImageMono = webClient()
                            .get()
                            .uri("http://localhost:8085/teams/{id}", match.get("team2Id"))
                            .retrieve()
                            .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                            .map(team -> (String) team.get("image"));

                    return Mono.zip(team1ImageMono, team2ImageMono)
                            .map(images -> {
                                match.put("team1Image", images.getT1());
                                match.put("team2Image", images.getT2());
                                return match;
                            });
                })
                .collectList()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/teams/matches/record")
    public Mono<ResponseEntity<Map<String, Object>>> getTeamWinLossWithImages() {
        return webClient()
                .get()
                .uri("http://localhost:8082/teams/matches/record")
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(teamWinLossData -> {
                    // Create a list of requests to fetch team images
                    List<Mono<Map.Entry<String, Map<String, Object>>>> teamImageRequests = ((Map<String, Map<String, Object>>) teamWinLossData)
                            .entrySet()
                            .stream()
                            .map(entry -> {
                                String teamId = entry.getKey();
                                Map<String, Object> winLossData = entry.getValue();

                                return webClient()
                                        .get()
                                        .uri("http://localhost:8085/teams/{id}", teamId)
                                        .retrieve()
                                        .bodyToMono(Map.class)
                                        .map(teamInfo -> {
                                            winLossData.put("image", teamInfo.get("image"));
                                            return Map.entry(teamId, winLossData);
                                        });
                            })
                            .collect(Collectors.toList());

                    // Combine all the Mono requests and reassemble the data
                    return Mono.zip(teamImageRequests, results -> {
                        Map<String, Object> enrichedData = new LinkedHashMap<>();
                        for (Object result : results) {
                            Map.Entry<String, Map<String, Object>> entry = (Map.Entry<String, Map<String, Object>>) result;
                            enrichedData.put(entry.getKey(), entry.getValue());
                        }
                        return enrichedData;
                    });
                })
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
}