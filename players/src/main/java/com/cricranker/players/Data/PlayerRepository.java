package com.cricranker.players.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PlayerRepository extends JpaRepository<Player, UUID>
{

    //Search players by name, age and country (Web Search)
    @Query("SELECT p FROM Player p WHERE (:name IS NULL OR CONCAT(p.firstName, ' ', p.lastName) LIKE %:name%) " +
            "AND (:age IS NULL OR p.age = :age) " +
            "AND (:country IS NULL OR p.country LIKE %:country%)")
    List<Player> searchPlayers(@Param("name") String name,
                               @Param("age") Integer age,
                               @Param("country") String country);

}
