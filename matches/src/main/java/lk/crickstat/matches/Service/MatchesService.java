package lk.crickstat.matches.Service;

import lk.crickstat.matches.Data.Match;
import lk.crickstat.matches.Data.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchesService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(int matchId) {
        return matchRepository.findById(matchId);
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateMatch(int matchId, Match matchDetails) {
        Match match = matchRepository.findById(matchId).orElseThrow(() -> new RuntimeException("Match not found"));
        match.setTeam1Id(matchDetails.getTeam1Id());
        match.setTeam2Id(matchDetails.getTeam2Id());
        match.setMatchDate(matchDetails.getMatchDate());
        match.setVenue(matchDetails.getVenue());
        match.setWinnerTeamId(matchDetails.getWinnerTeamId());
        return matchRepository.save(match);
    }
}