// ================= PERSONAL DETAILS =================
// Add your own age and religion below before publishing.
// Leave an empty string to show "Not added yet".
const PROFILE = {
  age: "",
  religion: ""
};

// ================= THEME CUSTOMIZATION =================
const themes = ["purple", "ocean", "sunset", "forest", "light"];
let themeIndex = 0;
const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  const theme = themes[themeIndex];
  if (theme === "purple") document.body.removeAttribute("data-theme");
  else document.body.dataset.theme = theme;
  themeButton.innerHTML = `🎨 <span>${theme[0].toUpperCase() + theme.slice(1)}</span>`;
});

document.getElementById("ageValue").textContent = PROFILE.age ? PROFILE.age : "Not added yet";
document.getElementById("religionValue").textContent = PROFILE.religion ? PROFILE.religion : "Not added yet";
document.getElementById("year").textContent = new Date().getFullYear();

// ================= REACTION RUSH MINI GAME =================
const gameButton = document.getElementById("gameButton");
const gameMessage = document.getElementById("gameMessage");
const bestScoreLabel = document.getElementById("bestScore");
let gameState = "idle";
let startTime = 0;
let timeoutId = null;
let bestScore = Number(localStorage.getItem("rabbiReactionBest") || 0);
bestScoreLabel.textContent = bestScore ? `${bestScore} ms` : "—";

gameButton.addEventListener("click", () => {
  if (gameState === "idle" || gameState === "result") {
    gameState = "waiting";
    gameButton.disabled = true;
    gameButton.className = "game-button waiting";
    gameButton.textContent = "WAIT FOR GREEN...";
    gameMessage.textContent = "Don't tap yet. Wait for the green signal!";
    timeoutId = setTimeout(() => {
      gameState = "ready";
      startTime = performance.now();
      gameButton.disabled = false;
      gameButton.className = "game-button ready";
      gameButton.textContent = "TAP NOW!";
      gameMessage.textContent = "GO! Tap as quickly as you can.";
    }, 1300 + Math.random() * 2600);
    return;
  }
  if (gameState === "waiting") {
    clearTimeout(timeoutId);
    gameState = "result";
    gameButton.disabled = false;
    gameButton.className = "game-button";
    gameButton.textContent = "TRY AGAIN";
    gameMessage.textContent = "Too early! Wait for green next time.";
    return;
  }
  if (gameState === "ready") {
    const reaction = Math.round(performance.now() - startTime);
    gameState = "result";
    gameButton.className = "game-button";
    gameButton.textContent = "PLAY AGAIN";
    gameMessage.textContent = `Your reaction time: ${reaction} ms. ${reaction < 250 ? "Lightning fast! ⚡" : reaction < 400 ? "Great reflexes! 👏" : "Nice try — beat that score!"}`;
    if (!bestScore || reaction < bestScore) {
      bestScore = reaction;
      localStorage.setItem("rabbiReactionBest", String(bestScore));
      bestScoreLabel.textContent = `${bestScore} ms`;
    }
  }
});
