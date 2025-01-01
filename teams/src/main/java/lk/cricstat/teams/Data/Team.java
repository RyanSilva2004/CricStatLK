package lk.cricstat.teams.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @Column(name = "team_id", nullable = false)
    private String id;

    @Column(name = "team_name")
    private String name;

    @Column(name = "team_image")
    private String image;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}