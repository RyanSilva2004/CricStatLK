package lk.crickstat.matches.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface MatchRepository extends JpaRepository<Match, Integer> {

    @Query("SELECT new map(m.winnerTeamId as teamId, COUNT(m) as wins) FROM Match m GROUP BY m.winnerTeamId")
    List<Map<String, Object>> getTeamWins();

    @Query("SELECT new map(m.team1Id as teamId, COUNT(m) as losses) FROM Match m WHERE m.winnerTeamId != m.team1Id GROUP BY m.team1Id")
    List<Map<String, Object>> getTeam1Losses();

    @Query("SELECT new map(m.team2Id as teamId, COUNT(m) as losses) FROM Match m WHERE m.winnerTeamId != m.team2Id GROUP BY m.team2Id")
    List<Map<String, Object>> getTeam2Losses();
}