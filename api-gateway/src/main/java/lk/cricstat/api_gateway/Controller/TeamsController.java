package lk.cricstat.api_gateway.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamsController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private WebClient webClient() {
        return webClientBuilder.build();
    }

    @GetMapping("/api/teams/{teamId}")
    public Mono<ResponseEntity<Map<String, Object>>> getTeamById(@PathVariable String teamId) {
        return webClient().get()
                .uri("http://localhost:8085/teams/{teamId}", teamId)
                .retrieve()
                .bodyToMono((Class<Map<String, Object>>)(Class<?>)Map.class)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/teams")
    public Mono<ResponseEntity<List<Map<String, Object>>>> getTeams() {
        return webClient().get()
                .uri("http://localhost:8085/teams")
                .retrieve()
                .bodyToMono((Class<List<Map<String, Object>>>)(Class<?>)List.class)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}