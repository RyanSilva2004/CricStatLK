package lk.crickstat.statistics.Controller;

import lk.crickstat.statistics.Data.Performance;
import lk.crickstat.statistics.Data.Stat;
import lk.crickstat.statistics.Service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/stats/top-scorers")
    public List<Stat> getTopRunScorers() {
        return statisticsService.getTopRunScorers();
    }

    @GetMapping("/stats/top-wicket-takers")
    public List<Stat> getTopWicketTakers() {
        return statisticsService.getTopWicketTakers();
    }

    @GetMapping("/player/{player_id}/stats")
    public Stat getPlayerStatistics(@PathVariable("player_id") int playerId) {
        return statisticsService.getPlayerStatistics(playerId);
    }

    @PostMapping("/player/stats")
    public Stat createPlayerStatistics(@RequestBody Stat stat) {
        return statisticsService.createPlayerStatistics(stat);
    }

    @PatchMapping("/player/{player_id}/stats")
    public Stat updatePlayerStats(@PathVariable("player_id") int playerId, @RequestBody Performance performance) {
        return statisticsService.updatePlayerStats(playerId, performance);
    }

}