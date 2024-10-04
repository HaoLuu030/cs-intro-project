// import necessary fucntions from firestore

// TODO: optimize the code

import { db, collection, getDocs } from "../script/firebase-service.js";

// create a reference to a collection to my Firestore database
const foodCollection = collection(db, "Food");

// get the id of the body
const container = document.getElementById("option-wrapper");

// fetch data and create button
async function fetchAllDocuments() {
  try {
    // fetch data from the database
    const querySnapshot = await getDocs(foodCollection);
    // Use a Set to store unique dietary options directly
    const uniqueOptions = new Set();

    querySnapshot.forEach((doc) => {
      const dietaryOptions = doc.data().Dietary_Options || []; // fall back to empty array if undefined
      dietaryOptions.forEach((option) => {
        uniqueOptions.add(option);
      });
    });
    uniqueOptions.forEach((option) => {
      // create a new button
      const newElement = document.createElement("button");
      // add content to the button
      newElement.textContent = option;
      // add class to the button
      newElement.classList.add("option");
      // add the element to the body
      container.appendChild(newElement);
    });

    // create different styling for the button when clicked
    // make all the buttons "hear" the click event to toggle options (Event Delegation)
    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("option")) {
        event.target.classList.toggle("active");
      }
    });
  } catch (error) {
    console.log("Error fetching documents: ", error);
  }
}

fetchAllDocuments();
