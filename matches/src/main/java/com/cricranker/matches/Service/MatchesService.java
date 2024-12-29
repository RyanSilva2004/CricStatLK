package com.cricranker.matches.Service;

import com.cricranker.matches.Data.Match;
import com.cricranker.matches.Data.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MatchesService {

    @Autowired
    private MatchRepository matchRepository;

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Optional<Match> getMatchById(UUID id) {
        return matchRepository.findById(id);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match updateMatchResult(UUID id, Integer team1Score, Integer team2Score) {
        Optional<Match> matchOptional = matchRepository.findById(id);
        if (matchOptional.isPresent()) {
            Match match = matchOptional.get();
            match.setTeam1Score(team1Score);
            match.setTeam2Score(team2Score);
            match.setMatchWinnerId(team1Score > team2Score ? match.getTeam1Id() : match.getTeam2Id());
            return matchRepository.save(match);
        }
        return null;
    }

}