package lk.crickstat.matches.Service;

import lk.crickstat.matches.Data.Match;
import lk.crickstat.matches.Data.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));
        match.setTeam1Id(matchDetails.getTeam1Id());
        match.setTeam2Id(matchDetails.getTeam2Id());
        match.setMatchDate(matchDetails.getMatchDate());
        match.setVenue(matchDetails.getVenue());
        match.setWinnerTeamId(matchDetails.getWinnerTeamId());
        match.setTeam1Score(matchDetails.getTeam1Score());
        match.setTeam2Score(matchDetails.getTeam2Score());
        return matchRepository.save(match);
    }


    public Map<String, Map<String, Integer>> getTeamWinLossRecord() {
        List<Map<String, Object>> teamWins = matchRepository.getTeamWins();
        List<Map<String, Object>> team1Losses = matchRepository.getTeam1Losses();
        List<Map<String, Object>> team2Losses = matchRepository.getTeam2Losses();

        Map<String, Map<String, Integer>> teamWinLossRecord = new HashMap<>();

        for (Map<String, Object> win : teamWins) {
            String teamId = (String) win.get("teamId");
            int wins = ((Number) win.get("wins")).intValue();
            teamWinLossRecord.putIfAbsent(teamId, new HashMap<>());
            teamWinLossRecord.get(teamId).put("wins", wins);
        }

        for (Map<String, Object> loss : team1Losses) {
            String teamId = (String) loss.get("teamId");
            int losses = ((Number) loss.get("losses")).intValue();
            teamWinLossRecord.putIfAbsent(teamId, new HashMap<>());
            teamWinLossRecord.get(teamId).put("losses", losses);
        }

        for (Map<String, Object> loss : team2Losses) {
            String teamId = (String) loss.get("teamId");
            int losses = ((Number) loss.get("losses")).intValue();
            teamWinLossRecord.putIfAbsent(teamId, new HashMap<>());
            teamWinLossRecord.get(teamId).put("losses", teamWinLossRecord.get(teamId).getOrDefault("losses", 0) + losses);
        }

        // Ensure all teams have both wins and losses keys
        for (String teamId : teamWinLossRecord.keySet()) {
            teamWinLossRecord.get(teamId).putIfAbsent("wins", 0);
            teamWinLossRecord.get(teamId).putIfAbsent("losses", 0);
        }

        return teamWinLossRecord;
    }
}