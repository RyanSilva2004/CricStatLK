package com.cricranker.matches.Controller;

import com.cricranker.matches.Data.Match;
import com.cricranker.matches.Service.MatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class MatchesController {

    @Autowired
    private MatchesService matchService;

    @PostMapping("/matches")
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        Match createdMatch = matchService.createMatch(match);
        return ResponseEntity.ok(createdMatch);
    }

    @GetMapping("/matches/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable UUID id) {
        Optional<Match> match = matchService.getMatchById(id);
        return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/matches")
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @PostMapping("/matches/{id}/result")
    public ResponseEntity<Match> updateMatchResult(@PathVariable UUID id, @RequestBody Match matchResult) {
        Match updatedMatch = matchService.updateMatchResult(id, matchResult.getTeam1Score(), matchResult.getTeam2Score());
        return updatedMatch != null ? ResponseEntity.ok(updatedMatch) : ResponseEntity.notFound().build();
    }

}