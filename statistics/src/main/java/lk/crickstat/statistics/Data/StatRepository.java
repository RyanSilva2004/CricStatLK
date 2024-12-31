package lk.crickstat.statistics.Data;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StatRepository extends JpaRepository<Stat, Integer> {

    @Query("SELECT s FROM Stat s ORDER BY s.totalRuns DESC")
    List<Stat> findTopRunScorers(Pageable pageable);

    @Query("SELECT s FROM Stat s ORDER BY s.totalWickets DESC")
    List<Stat> findTopWicketTakers(Pageable pageable);

    Stat findByPlayerId(int playerId);

    @Modifying
    @Transactional
    @Query("UPDATE Stat s SET s.playedMatches = s.playedMatches + 1, s.totalRuns = s.totalRuns + :runs, s.totalWickets = s.totalWickets + :wickets, s.totalCatches = s.totalCatches + :catches, s.totalRunsConceded = s.totalRunsConceded + :runsConceded WHERE s.playerId = :playerId")
    void updatePlayerStats(int playerId, int runs, int wickets, int catches, int runsConceded);
}