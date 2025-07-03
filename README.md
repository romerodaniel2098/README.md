<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bento Grid UI</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="grid-container">
    
    <div class="card beige tall">
      <h3>Create and schedule content <span>quicker</span>.</h3>
      <button class="button">Create Post ➜</button>
    </div>

    <div class="card purple wide">
      <h1><span>Social Media</span> 10x Faster with AI</h1>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <p>Over 4,000 5-star reviews</p>
    </div>

    <div class="card light-purple tall">
      <h3>Schedule to social media.</h3>
      <div class="graph">
        <p>📊 Best Time to Post</p>
        <ul>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
        </ul>
        <div class="bars">
          <div style="height:30%"></div>
          <div style="height:50%"></div>
          <div style="height:80%"></div>
          <div style="height:40%"></div>
        </div>
      </div>
    </div>

    <div class="card orange">
      <h3>Write your content using AI.</h3>
      <div class="chat">
        <p>👩 “Give me 5 tips...”</p>
        <p>🤖 “Sure! Here they are...”</p>
      </div>
    </div>

    <div class="card white">
      <h3>Manage multiple accounts and platforms.</h3>
      <p>📱 @YourCo - 12K Followers</p>
    </div>

    <div class="card yellow">
      <h3>Maintain a consistent posting schedule.</h3>
      <p>📆 August 2024 - Week 1</p>
    </div>

    <div class="card white">
      <h3>>56% faster audience growth</h3>
      <p>👨‍💻👩‍💼🧑‍🎤</p>
    </div>

    <div class="card purple wide">
      <h3>Grow followers with non-stop content.</h3>
      <p>📈 20,642 Growth | 89,532 Followers</p>
    </div>

  </main>
</body>
</html>



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f3f3f3;
  padding: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Tarjetas generales */
.card {
  padding: 1.5rem;
  border-radius: 1rem;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

/* Variaciones de color */
.purple {
  background-color: #8854D0;
  color: white;
}

.orange {
  background-color: #FFC93C;
}

.yellow {
  background-color: #FFDA77;
}

.beige {
  background-color: #FDEDE5;
}

.light-purple {
  background-color: #E1DFFF;
}

.white {
  background-color: white;
}

/* Tamaños personalizados */
.wide {
  grid-column: span 2;
}

.tall {
  grid-row: span 2;
}

.button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f4af2d;
  color: black;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
}

/* Gráfico simulado */
.graph {
  margin-top: 1rem;
}

.graph ul {
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 0;
  list-style: none;
  padding: 0;
}

.bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  gap: 0.5rem;
  height: 100px;
}

.bars div {
  width: 20px;
  background-color: #6c47d8;
  border-radius: 5px;
}

.stars {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.chat p {
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .wide {
    grid-column: span 1;
  }

  .tall {
    grid-row: span 1;
  }
}
