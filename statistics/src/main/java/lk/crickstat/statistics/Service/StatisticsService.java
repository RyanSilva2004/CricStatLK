package lk.crickstat.statistics.Service;

import lk.crickstat.statistics.Data.Performance;
import lk.crickstat.statistics.Data.Stat;
import lk.crickstat.statistics.Data.StatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private StatRepository statRepository;

    public List<Stat> getTopRunScorers() {
        Pageable topTen = PageRequest.of(0, 10);
        return statRepository.findTopRunScorers(topTen);
    }

    public List<Stat> getTopWicketTakers() {
        Pageable topTen = PageRequest.of(0, 10);
        return statRepository.findTopWicketTakers(topTen);
    }

    public Stat getPlayerStatistics(int playerId) {
        return statRepository.findByPlayerId(playerId);
    }

    public Stat createPlayerStatistics(Stat stat) {
        return statRepository.save(stat);
    }

    public Stat updatePlayerStats(int playerId, Performance performance) {
        statRepository.updatePlayerStats(playerId, performance.getRuns(), performance.getWickets(), performance.getCatches(), performance.getRunsConceded());
        Stat stat = statRepository.findByPlayerId(playerId);
        if (stat != null) {
            // Update batting average
            if (stat.getPlayedMatches() > 0) {
                stat.setBattingAverage((float) stat.getTotalRuns() / stat.getPlayedMatches());
            }

            // Update bowling average
            if (stat.getTotalWickets() > 0) {
                stat.setBowlingAverage((float) stat.getTotalRunsConceded() / stat.getTotalWickets());
            }

            // Increment total fifties
            if (performance.getRuns() >= 50 && performance.getRuns() < 100) {
                stat.setTotalFifties(stat.getTotalFifties() + 1);
            }

            // Increment total hundreds
            if (performance.getRuns() >= 100) {
                stat.setTotalHundreds(stat.getTotalHundreds() + 1);
            }

            // Increment total 5 wickets
            if (performance.getWickets() >= 5) {
                stat.setTotal5Wickets(stat.getTotal5Wickets() + 1);
            }

            statRepository.save(stat);
        }
        return stat;
    }

}