package lk.crickstat.performances.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
    List<Performance> findByMatchId(int matchId);
    List<Performance> findByPlayerId(int playerId);
}