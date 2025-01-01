package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
public class PlayersController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/players/{playerId}")
    public Mono<ResponseEntity<Map<String, Object>>> getPlayersById(@PathVariable int playerId) {
        return webClient().get()
                .uri("http://localhost:8081/players/{playerId}", playerId)
                .retrieve()
                .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/players")
    public Mono<ResponseEntity<List<Map<String, Object>>>> getPlayers() {
        return webClient().get()
                .uri("http://localhost:8081/players")
                .retrieve()
                .bodyToMono((Class<List<Map<String, Object>>>)(Class<?>)List.class)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}