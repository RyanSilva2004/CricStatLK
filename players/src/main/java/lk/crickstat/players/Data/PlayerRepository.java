package lk.crickstat.players.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    @Query("SELECT p FROM Player p WHERE (:name IS NULL OR p.name LIKE %:name%) AND (:country IS NULL OR p.country = :country)")
    List<Player> searchPlayers(@Param("name") String name, @Param("country") String country);


}