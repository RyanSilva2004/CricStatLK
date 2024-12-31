package lk.crickstat.performances.Service;

import lk.crickstat.performances.Data.Performance;
import lk.crickstat.performances.Data.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformancesService {

    @Autowired
    private PerformanceRepository performanceRepository;

    public Performance addPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    public List<Performance> getPerformancesByMatchId(int matchId) {
        return performanceRepository.findByMatchId(matchId);
    }

    public List<Performance> getPerformancesByPlayerId(int playerId) {
        return performanceRepository.findByPlayerId(playerId);
    }
}