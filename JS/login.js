
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk6PYkKtIXNl4YG7ci8degKd0sXkmsdl8",
  authDomain: "e-commerce-31afb.firebaseapp.com",
  projectId: "e-commerce-31afb",
  storageBucket: "e-commerce-31afb.firebasestorage.app",
  messagingSenderId: "22248072968",
  appId: "1:22248072968:web:79be7e41b08a91eedd2ebd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.loginUser = function () {

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;

  if (email === "" || password === "") {

    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please fill all fields.",
      confirmButtonColor: "#d90429"
    });
    return;

  }

  signInWithEmailAndPassword(
    auth,
    email,
    password
  )

    .then(() => {

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Successful",
        confirmButtonColor: "#d90429"
      });
      window.location.href =
        "index.html";

    })

    .catch((error) => {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        confirmButtonColor: "#d90429"
      });

    });

};

const provider =
  new GoogleAuthProvider();

const googleBtn =
  document.querySelector(".google-btn");

if (googleBtn) {

  googleBtn.addEventListener("click", () => {

    signInWithPopup(auth, provider)

      .then(() => {

        window.location.href =
          "../index.html";

      })

      .catch((error) => {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          confirmButtonColor: "#d90429"
        });
      });

  });

}
