// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc as getDocument,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
import firebaseConfig from "../config/firebase-config.js";

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const foodCollection = collection(db, "Food");

const restaurantList = document.querySelector("#restaurant_list");
const form = document.querySelector("#add-restaurant-form");

// Render a restaurant in the table
function renderRestaurant(doc) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", doc.id);

  const nameCell = document.createElement("td");
  const addressCell = document.createElement("td");
  const commentsCell = document.createElement("td");
  const cuisineTypeCell = document.createElement("td");
  const dietaryOptionsCell = document.createElement("td");
  const emailCell = document.createElement("td");
  const openingHoursCell = document.createElement("td");
  const phoneNumberCell = document.createElement("td");
  const serviceTypeCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  // Set content for the cells
  nameCell.textContent = doc.data().Restaurant_Name;
  addressCell.textContent = doc.data().Address;
  commentsCell.textContent = doc.data().Comments;
  cuisineTypeCell.textContent = doc.data().Cuisine_Type;
  dietaryOptionsCell.textContent = doc.data().Dietary_Options;
  emailCell.textContent = doc.data().Email;
  openingHoursCell.textContent = doc.data().Opening_Hours;
  phoneNumberCell.textContent = doc.data().Phone_Number;
  serviceTypeCell.textContent = doc.data().Service_Type;

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteCell.appendChild(deleteButton);

  // Append all cells to the row
  row.appendChild(nameCell);
  row.appendChild(addressCell);
  row.appendChild(commentsCell);
  row.appendChild(cuisineTypeCell);
  row.appendChild(dietaryOptionsCell);
  row.appendChild(emailCell);
  row.appendChild(openingHoursCell);
  row.appendChild(phoneNumberCell);
  row.appendChild(serviceTypeCell);
  row.appendChild(deleteCell);

  // Append the row to the restaurant list
  restaurantList.appendChild(row);

  // Handle delete functionality
  deleteButton.addEventListener("click", async () => {
    const id = row.getAttribute("data-id");
    try {
      const docRef = getDocument(db, "Food", id); // Reference to the specific document
      await deleteDoc(docRef); // Delete the document from Firestore
      row.remove(); // Remove row from the table
      console.log("Restaurant deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  });
}

// Real-time listener to fetch and render restaurants
onSnapshot(foodCollection, (snapshot) => {
  restaurantList.innerHTML = ""; // Clear the list before rendering
  snapshot.forEach((doc) => {
    renderRestaurant(doc); // Render each restaurant document
  });
});

// Add new restaurant to the database
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // process dietary option input

  // trim whitespace at the beginning and the end of the input
  const dietaryOptionInput = form.Dietary_Options.value.trim();
  const dietaryOptionArray = dietaryOptionInput
    // split input based on comma (return an array)
    .split(",")
    // return an array with modified elements
    .map((value) => value.trim())
    // remove falsy values (NaN, 0, white space)
    .filter((value) => value);
  try {
    await addDoc(foodCollection, {
      Restaurant_Name: form.Restaurant_Name.value,
      Address: form.Address.value,
      Phone_Number: form.Phone_Number.value,
      Email: form.Email.value,
      Opening_Hours: form.Opening_Hours.value,
      Cuisine_Type: form.Cuisine_Type.value,
      Dietary_Options: dietaryOptionArray,
      Service_Type: form.Service_Type.value,
      Comments: form.Comments.value,
    });

    // Clear the form fields
    form.reset();
    console.log("Restaurant added successfully");
  } catch (error) {
    console.error("Error adding restaurant:", error);
  }
});
