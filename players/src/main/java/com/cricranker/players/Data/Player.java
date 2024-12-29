package com.cricranker.players.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.util.UUID;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "age",nullable = false)
    private Integer age;

    @Column(name = "country",nullable = false)
    private String country;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "batting_avg")
    private Double battingAvg;

    @Column(name = "batting_sr")
    private Double battingSr;

    @Column(name = "bowling_avg")
    private Double bowlingAvg;

    @Column(name = "bowling_sr")
    private Double bowlingSr;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getBattingAvg() {
        return battingAvg;
    }

    public void setBattingAvg(Double battingAvg) {
        this.battingAvg = battingAvg;
    }

    public Double getBattingSr() {
        return battingSr;
    }

    public void setBattingSr(Double battingSr) {
        this.battingSr = battingSr;
    }

    public Double getBowlingAvg() {
        return bowlingAvg;
    }

    public void setBowlingAvg(Double bowlingAvg) {
        this.bowlingAvg = bowlingAvg;
    }

    public Double getBowlingSr() {
        return bowlingSr;
    }

    public void setBowlingSr(Double bowlingSr) {
        this.bowlingSr = bowlingSr;
    }
}