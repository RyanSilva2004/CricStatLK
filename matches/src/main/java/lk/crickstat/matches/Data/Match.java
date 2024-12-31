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

    @Column(name = "match_date")
    private Date matchDate;

    @Column(name = "venue")
    private String venue;

    @Column(name = "winner_team_id")
    private String winnerTeamId;

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
}