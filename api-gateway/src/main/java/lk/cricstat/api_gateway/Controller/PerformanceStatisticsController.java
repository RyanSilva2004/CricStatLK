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

@RestController
public class PerformanceStatisticsController
{
    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @PostMapping("/api/performances")
    public Mono<ResponseEntity<Map>> addPerformanceAndUpdateStats(@RequestBody Map<String, Object> performance) {
        return webClient()
                .post()
                .uri("http://localhost:8083/performances")
                .bodyValue(performance)
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(savedPerformance -> {
                    // Extract playerId from the saved performance
                    int playerId = (int) savedPerformance.get("playerId");

                    // Forward the performance to 8084 for updating player stats
                    return webClient()
                            .patch()
                            .uri("http://localhost:8084/player/{player_id}/stats", playerId)
                            .bodyValue(savedPerformance)
                            .retrieve()
                            .bodyToMono(Map.class)
                            .map(updatedStats -> {
                                // Combine the performance and updated stats into a single response
                                savedPerformance.put("updatedStats", updatedStats);
                                return savedPerformance;
                            });
                })
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

}
