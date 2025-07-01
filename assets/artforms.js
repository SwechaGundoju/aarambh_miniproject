document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("exploreBtn");
  const leftDoor = document.querySelector(".left-door");
  const rightDoor = document.querySelector(".right-door");
  const roomSection = document.getElementById("roomSelection");

  exploreBtn.addEventListener("click", () => {
    leftDoor.style.transform = "translateX(-100%)";
    rightDoor.style.transform = "translateX(100%)";

    setTimeout(() => {
      document.getElementById("doorContainer").style.display = "none";
      roomSection.classList.remove("hidden");
    }, 2000);
  });
});
