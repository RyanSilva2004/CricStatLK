package lk.crickstat.statistics.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "player_statistics")
public class Stat {

    @Id
    @Column(name = "player_id", nullable = false)
    private Integer playerId; // Changed to Integer

    @Column(name = "played_matches", nullable = false, columnDefinition = "int default 0")
    private Integer playedMatches = 0; // Changed to Integer

    @Column(name = "total_runs", nullable = false, columnDefinition = "int default 0")
    private Integer totalRuns; // Changed to Integer

    @Column(name = "total_wickets", nullable = false, columnDefinition = "int default 0")
    private Integer totalWickets; // Changed to Integer

    @Column(name = "matches_played", nullable = false, columnDefinition = "int default 0")
    private Integer matchesPlayed; // Changed to Integer

    @Column(name = "batting_average", nullable = false, columnDefinition = "float default 0")
    private Float battingAverage;

    @Column(name = "bowling_average", nullable = false, columnDefinition = "float default 0")
    private Float bowlingAverage;

    @Column(name = "total_runsConceded", nullable = false, columnDefinition = "int default 0")
    private Integer totalRunsConceded; // Changed to Integer

    @Column(name = "total_catches", nullable = false, columnDefinition = "int default 0")
    private Integer totalCatches; // Changed to Integer

    @Column(name = "total_fifties", nullable = false, columnDefinition = "int default 0")
    private Integer totalFifties; // Changed to Integer

    @Column(name = "total_hundreds", nullable = false, columnDefinition = "int default 0")
    private Integer totalHundreds; // Changed to Integer

    @Column(name = "total_5_wickets", nullable = false, columnDefinition = "int default 0")
    private Integer total5Wickets; // Changed to Integer

    // Getters and setters
    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Integer getPlayedMatches() {
        return playedMatches;
    }

    public void setPlayedMatches(Integer playedMatches) {
        this.playedMatches = playedMatches;
    }

    public Integer getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(Integer totalRuns) {
        this.totalRuns = totalRuns;
    }

    public Integer getTotalWickets() {
        return totalWickets;
    }

    public void setTotalWickets(Integer totalWickets) {
        this.totalWickets = totalWickets;
    }

    public Integer getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(Integer matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public Float getBattingAverage() {
        return battingAverage;
    }

    public void setBattingAverage(Float battingAverage) {
        this.battingAverage = battingAverage;
    }

    public Float getBowlingAverage() {
        return bowlingAverage;
    }

    public void setBowlingAverage(Float bowlingAverage) {
        this.bowlingAverage = bowlingAverage;
    }

    public Integer getTotalRunsConceded() {
        return totalRunsConceded;
    }

    public void setTotalRunsConceded(Integer totalRunsConceded) {
        this.totalRunsConceded = totalRunsConceded;
    }

    public Integer getTotalCatches() {
        return totalCatches;
    }

    public void setTotalCatches(Integer totalCatches) {
        this.totalCatches = totalCatches;
    }

    public Integer getTotalFifties() {
        return totalFifties;
    }

    public void setTotalFifties(Integer totalFifties) {
        this.totalFifties = totalFifties;
    }

    public Integer getTotalHundreds() {
        return totalHundreds;
    }

    public void setTotalHundreds(Integer totalHundreds) {
        this.totalHundreds = totalHundreds;
    }

    public Integer getTotal5Wickets() {
        return total5Wickets;
    }

    public void setTotal5Wickets(Integer total5Wickets) {
        this.total5Wickets = total5Wickets;
    }
}