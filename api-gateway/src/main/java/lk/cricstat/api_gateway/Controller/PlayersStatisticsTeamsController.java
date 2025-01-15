/*package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PlayersStatisticsTeamsController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/players/search")
    public Flux<Map<String, Object>> searchPlayers(@RequestParam(required = false) String name, @RequestParam(required = false) String country) {
        WebClient webClient = webClient();

        Flux<Map<String, Object>> playersFlux = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(8081)
                        .path("/players/search")
                        .queryParam("name", name)
                        .queryParam("country", country)
                        .build())
                .retrieve()
                .bodyToFlux((Class<Map<String, Object>>)(Class<?>)Map.class);

        return playersFlux.flatMap(player -> {
            int playerId = (int) player.get("playerId");
            String teamId = (String) player.get("country");

            Mono<Map<String, Object>> playerStatsMono = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("localhost")
                            .port(8084)
                            .path("/players/{playerId}/stats")
                            .build(playerId))
                    .retrieve()
                    .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class);

            Mono<Map<String, Object>> teamDetailsMono = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("localhost")
                            .port(8085)
                            .path("/teams/{teamId}")
                            .build(teamId))
                    .retrieve()
                    .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class);

            return Mono.zip(Mono.just(player), playerStatsMono, teamDetailsMono)
                    .map(tuple -> {
                        Map<String, Object> combined = new HashMap<>(tuple.getT1());
                        combined.putAll(tuple.getT2());
                        combined.putAll(tuple.getT3());
                        return combined;
                    });
        });
    }
}*/