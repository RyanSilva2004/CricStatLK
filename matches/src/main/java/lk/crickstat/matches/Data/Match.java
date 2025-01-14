package lk.crickstat.matches.Data;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int matchId;

    @Column(name = "team1_id")
    private String team1Id;

    @Column(name = "team2_id")
    private String team2Id;

    @Column(name="team1_score", nullable = true)
    private Integer team1Score=0;

    @Column(name="team2_score", nullable = true)
    private Integer team2Score=0;

    @Column(name = "match_date")
    private Date matchDate;

    @Column(name = "venue")
    private String venue;

    @Column(name = "winner_team_id")
    private String winnerTeamId;

    @Column(name="result", nullable = true)
    private String result;

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public String getTeam1Id() {
        return team1Id;
    }

    public  void setTeam1Id(String team1Id) {
        this.team1Id = team1Id;
    }

    public String getTeam2Id() {
        return team2Id;
    }

    public void setTeam2Id(String team2Id) {
        this.team2Id = team2Id;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getWinnerTeamId() {
        return winnerTeamId;
    }

    public void setWinnerTeamId(String winnerTeamId) {
        this.winnerTeamId = winnerTeamId;
    }


    public int getTeam2Score() {
        return team2Score;
    }

    public void setTeam2Score(int team2Score) {
        this.team2Score = team2Score;
    }

    public int getTeam1Score() {
        return team1Score;
    }

    public void setTeam1Score(int team1Score) {
        this.team1Score = team1Score;
    }

}