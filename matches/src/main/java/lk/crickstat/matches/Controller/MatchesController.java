package lk.crickstat.matches.Controller;

import lk.crickstat.matches.Data.Match;
import lk.crickstat.matches.Service.MatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MatchesController {

    @Autowired
    private MatchesService matchesService;

    @GetMapping("/matches")
    public List<Match> getAllMatches() {
        return matchesService.getAllMatches();
    }

    @GetMapping("/matches/{matchId}")
    public ResponseEntity<Match> getMatchById(@PathVariable int matchId) {
        return matchesService.getMatchById(matchId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/matches")
    public Match createMatch(@RequestBody Match match) {
        return matchesService.createMatch(match);
    }

    @PutMapping("/matches/{matchId}")
    public ResponseEntity<Match> updateMatch(@PathVariable int matchId, @RequestBody Match matchDetails) {
        return ResponseEntity.ok(matchesService.updateMatch(matchId, matchDetails));
    }
}