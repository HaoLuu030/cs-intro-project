

// create a number of options
// get the id of the body
const container = document.getElementById("option-wrapper");
// TODO: create a function to render buttons based on keywords in the database
for (let i = 0; i < 15; i++) {
  // create a new button
  const newElement = document.createElement("button");
  // add content to the button
  newElement.textContent = "Vegan";
  // add class to the button
  newElement.classList.add("option");
  // add the element to the body
  container.appendChild(newElement);
}


// create different styling for the button when clicked
// make all the buttons "hear" the click event to toggle options
const buttons = document.querySelectorAll(".option");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});