package lk.cricstat.teams.Controller;

import lk.cricstat.teams.Data.Team;
import lk.cricstat.teams.Service.TeamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TeamsController {

    @Autowired
    private TeamsService teamsService;

    @GetMapping("/teams")
    public List<Team> getAllTeams() {
        return teamsService.getAllTeams();
    }

    @GetMapping("/teams/{id}")
    public Optional<Team> getTeamById(@PathVariable String id) {
        return teamsService.getTeamById(id);
    }
}