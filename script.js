
const launchDate = new Date("2025-06-5T06:00:00").getTime();
const startDate = new Date("2025-06-1T00:00:00").getTime();

function animateChange(id, newValue) {
  const el = document.getElementById(id);
  if (el.innerText !== String(newValue).padStart(2, '0')) {
    el.classList.remove("slide");
    void el.offsetWidth; // Force reflow to restart animation
    el.innerText = String(newValue).padStart(2, '0');
    el.classList.add("slide");
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = launchDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  animateChange("days", days);
  animateChange("hours", hours);
  animateChange("minutes", minutes);
  animateChange("seconds", seconds);

  if (timeLeft < 0) {
    document.querySelector(".countdown").innerHTML = "<h2>We're live!</h2>";
  }

  const progress = Math.min(100, Math.max(0, ((now - startDate) / (launchDate - startDate)) * 100));
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}

updateCountdown();
setInterval(updateCountdown, 1000);
