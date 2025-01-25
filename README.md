# 🏏 CricStatLK - Microservices Cricket Stats Platform

CricStatLK is a comprehensive T20 cricket statistics platform built using **microservices architecture**. The project focuses on modular, scalable services to manage players, matches, teams, performances, and dynamic statistics, all orchestrated via an **API Gateway**.

---

## 🚀 Architecture Diagram

Here’s an overview of the CricStatLK architecture showcasing the microservices and their interactions:

<img src="https://github.com/user-attachments/assets/6df587cb-4a14-4095-8b38-e1492fe82229" alt="Architecture Diagram" width="600" />

---
## 📜 Documentation

For a detailed API reference and project overview, check out the [Documentation](https://docs.google.com/document/d/1LS635OenRUiseduzJDUyttHIiszXFab1RIYHbarQgzs/edit?usp=sharing).

---

## 📦 Microservices Overview

CricStatLK uses a modular architecture, where each microservice is dedicated to a specific domain:

### Microservices

1. **Player Service** 🎯
   - Manages player details like name, country, date of birth, and profile images.
   - Exposes endpoints such as:
     - `GET /players`: Retrieve all players.
     - `POST /players`: Add a new player.

2. **Match Service** 🏟️
   - Handles match details including teams, venue, and results.
   - Example endpoints:
     - `GET /matches`: List all matches.
     - `PUT /matches/{match_id}`: Update match winner.

3. **Team Service** 🏏
   - Manages team details including names and associated players.

4. **Performance Service** 🥇
   - Records individual player performances such as runs, wickets, and catches for a match.
   - Key endpoint:
     - `POST /performances`: Add player performance.

5. **Stats Service** 📊
   - Aggregates player statistics like batting averages, total runs, and bowling averages.
   - Example endpoint:
     - `GET /stats/players/{player_id}`: Fetch player statistics.

6. **API Gateway** 🌐
   - Acts as a single entry point for the frontend.
   - Orchestrates requests requiring multiple services (e.g., combining player details and statistics).

---

## 🌟 Highlighted Features

### Backend Features (Microservices)
- ✅ Modular services designed using **Spring Boot**.
- ✅ Decoupled microservices communicating through REST APIs.
- ✅ Flexible API Gateway with support for:
  - Data aggregation (e.g., combining player stats with details).
  - Simplified client interactions.

### Frontend Features
- **Players Management**: Add, update, or delete players.
- **Statistics Dashboard**: View combined player stats dynamically.
- **Match Management**: Create and edit matches.
- **Performance Recording**: Add individual player performances.

---

## 📸 Screenshots

### Primary Screenshots
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/4df44250-4607-4e7d-b7c9-31997342ee81" alt="Home Page" width="300" />
  <img src="https://github.com/user-attachments/assets/04f28b99-932c-4df4-abcb-cccf63ee4022" alt="Players Page" width="300" />
  <img src="https://github.com/user-attachments/assets/639ac3df-3724-4704-ae82-0b9e95761ccf" alt="Player Statistics Page" width="300" />
</div>

### Miscellaneous Screenshots
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/8cacab3e-013c-4fdb-924f-5167c28a5d47" alt="Matches Page" width="300" />
  <img src="https://github.com/user-attachments/assets/d462fc4c-d75d-4b9b-bf62-b18487809d8b" alt="Match Performances Page" width="300" />
  <img src="https://github.com/user-attachments/assets/f6f89e00-0aa1-48b8-8dc5-648dc42a10dc" alt="Performances Page" width="300" />
  <img src="https://github.com/user-attachments/assets/fdec1b2d-8373-43fc-95b5-6d79d1a70e7a" alt="Add Performances" width="300" />
  <img src="https://github.com/user-attachments/assets/6bcac198-5971-46a6-a072-36a8d67fb614" alt="Teams Page" width="300" />
</div>

---

## 🛠️ How to Run the Project

### Backend
1. Clone the repository.
2. Navigate to each microservice directory.
3. Run `mvn spring-boot:run`.

### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`.
3. Start the application: `npm run dev`.

### API Gateway
1. Navigate to the API Gateway directory.
2. Run the gateway: `mvn spring-boot:run`.

---

## 📜 License

This project is licensed under the MIT License.
