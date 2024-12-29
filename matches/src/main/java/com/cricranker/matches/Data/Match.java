package com.cricranker.matches.Data;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "match_date",nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date matchDate;

    @Column(name = "team1_id",nullable = false)
    private String team1Id;

    @Column(name = "team2_id",nullable = false)
    private String team2Id;

    @Column(name = "team1_score",nullable = false)
    private Integer team1Score;

    @Column(name = "team2_score",nullable = false)
    private Integer team2Score;

    @Column(name = "match_winner_id",nullable = false)
    private String matchWinnerId;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public String getTeam1Id() {
        return team1Id;
    }

    public void setTeam1Id(String team1Id) {
        this.team1Id = team1Id;
    }

    public String getTeam2Id() {
        return team2Id;
    }

    public void setTeam2Id(String team2Id) {
        this.team2Id = team2Id;
    }

    public Integer getTeam1Score() {
        return team1Score;
    }

    public void setTeam1Score(Integer team1Score) {
        this.team1Score = team1Score;
    }

    public Integer getTeam2Score() {
        return team2Score;
    }

    public void setTeam2Score(Integer team2Score) {
        this.team2Score = team2Score;
    }

    public String getMatchWinnerId() {
        return matchWinnerId;
    }

    public void setMatchWinnerId(String matchWinnerId) {
        this.matchWinnerId = matchWinnerId;
    }
}