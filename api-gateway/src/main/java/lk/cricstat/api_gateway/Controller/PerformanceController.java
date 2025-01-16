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

@CrossOrigin("localhost:3000")
@RestController
public class PerformanceController
{
    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient()
    {
        return webClientBuilder.build();
    }

    @GetMapping("/api/players/{player_id}/performances")
    public Mono<ResponseEntity<List<Map<String, Object>>>> getPerformancesByPlayerId(@PathVariable int player_id) {
        return webClient()
                .get()
                .uri("http://localhost:8083/players/{player_id}/performances", player_id)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

}
