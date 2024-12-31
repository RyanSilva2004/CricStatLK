package lk.crickstat.performances.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "performances")
public class Performance {

    public int getPerformanceId() {
        return performanceId;
    }

    public void setPerformanceId(int performanceId) {
        this.performanceId = performanceId;
    }

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getRuns() {
        return runs;
    }

    public void setRuns(int runs) {
        this.runs = runs;
    }

    public int getBallsFaced() {
        return ballsFaced;
    }

    public void setBallsFaced(int ballsFaced) {
        this.ballsFaced = ballsFaced;
    }

    public int getWickets() {
        return wickets;
    }

    public void setWickets(int wickets) {
        this.wickets = wickets;
    }

    public int getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(int runsConceded) {
        this.runsConceded = runsConceded;
    }

    public double getOversBowled() {
        return oversBowled;
    }

    public void setOversBowled(double oversBowled) {
        this.oversBowled = oversBowled;
    }

    public int getCatches() {
        return catches;
    }

    public void setCatches(int catches) {
        this.catches = catches;
    }

    public int getRunOuts() {
        return runOuts;
    }

    public void setRunOuts(int runOuts) {
        this.runOuts = runOuts;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int performanceId;

    @Column(name = "matchId", nullable = false)
    private int matchId;

    @Column(name = "playerId", nullable = false)
    private int playerId;

    @Column(name = "runs", nullable = false)
    private int runs;

    @Column(name = "ballsFaced", nullable = false)
    private int ballsFaced;

    @Column(name = "wickets", nullable = false)
    private int wickets;

    @Column(name = "runsConceded", nullable = false)
    private int runsConceded;

    @Column(name = "oversBowled", nullable = false)
    private double oversBowled;

    @Column(name = "catches", nullable = false)
    private int catches;

    @Column(name = "runOuts", nullable = false)
    private int runOuts;

}