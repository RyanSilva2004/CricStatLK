package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PlayersController
{

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/players/{playerId}")
    public Mono<ResponseEntity<Map<String, Object>>> getPlayersById(@PathVariable int playerId)
    {
        return webClient().get()
                .uri("http://localhost:8081/players/{playerId}", playerId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/players")
    public Mono<ResponseEntity<List<Map<String, Object>>>> getPlayers()
    {
        return webClient().get()
                .uri("http://localhost:8081/players")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/players/{playerId}")
    public Mono<ResponseEntity<Object>> deletePlayer(@PathVariable int playerId)
    {
        return webClient().delete()
                .uri("http://localhost:8081/players/{playerId}", playerId)
                .retrieve()
                .bodyToMono(Void.class)
                .thenReturn(ResponseEntity.noContent().build())
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/api/players/{playerId}")
    public Mono<ResponseEntity<Map<String, Object>>> updatePlayer(@PathVariable int playerId, @RequestBody Map<String, Object> playerDetails)
    {
        return webClient().put()
                .uri("http://localhost:8081/players/{playerId}", playerId)
                .body(Mono.just(playerDetails), Map.class)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

}