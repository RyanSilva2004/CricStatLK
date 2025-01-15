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

    @GetMapping("/api/check")
    public Mono<ResponseEntity<Map<String, Object>>> check() {
        return "hello".equals("hello") ? Mono.just(ResponseEntity.ok(Map.of("message", "Hello, World!"))) : Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
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

}