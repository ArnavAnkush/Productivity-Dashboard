function openPages() {
  const cards = document.querySelectorAll(".elem");

  const fullPage = document.querySelectorAll(".fullelem");

  const backBtn = document.querySelectorAll(".fullelem .back");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      fullPage[card.id].style.display = "block";
    });
  });

  backBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullPage[back.id].style.display = "none";
    });
  });
}

openPages();
