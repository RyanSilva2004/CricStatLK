package lk.crickstat.performances.Controller;

import lk.crickstat.performances.Data.Performance;
import lk.crickstat.performances.Service.PerformancesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PerformancesController {

    @Autowired
    private PerformancesService performancesService;

    @PostMapping("/performances")
    public Performance addPerformance(@RequestBody Performance performance) {
        return performancesService.addPerformance(performance);
    }

    @GetMapping("/matches/{matchId}/performances")
    public List<Performance> getPerformancesByMatchId(@PathVariable int matchId) {
        return performancesService.getPerformancesByMatchId(matchId);
    }

    @GetMapping("/players/{playerId}/performances")
    public List<Performance> getPerformancesByPlayerId(@PathVariable int playerId) {
        return performancesService.getPerformancesByPlayerId(playerId);
    }
}