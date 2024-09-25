const buttons = document.querySelectorAll(".option");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});
