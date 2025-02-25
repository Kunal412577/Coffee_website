// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC7-RwZQTBHjKoWY_pMZR8UkLiNFfvZZg",
  authDomain: "sing-up4125.firebaseapp.com",
  databaseURL: "https://sing-up4125-default-rtdb.firebaseio.com",
  projectId: "sing-up4125",
  storageBucket: "sing-up4125.firebasestorage.app",
  messagingSenderId: "492115527536",
  appId: "1:492115527536:web:5d8b8243e3d6fe7ac331b5",
  measurementId: "G-3XP5JJZX3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

/**
 * Function to display messages on the UI
 */
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}
// Handle form submission for signup
const signupForm = document.getElementById("Signup");
signupForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve input values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;

  // Validate password confirmation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    console.log("User created:", user.uid);

    // Store user details in Firestore
    const userData = {
      username: username,
      uid: user.uid,
    };

    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, userData);

    // Show success message
    showMessage("Account created successfully!", "signUpMessage");

    // Add a delay before redirection
    setTimeout(() => {
      console.log("Redirecting to login page...");
      window.location.href = "login.html";
    }, 3000); // 3 seconds delay

  } catch (error) {
    console.error("Error during signup:", error);

    if (error.code === "auth/email-already-in-use") {
      alert("Email is already in use!");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email address!");
    } else if (error.code === "auth/weak-password") {
      alert("Password is too weak. Please choose a stronger password.");
    } else {
      alert("An unknown error occurred: " + error.message);
    }
  }
});
