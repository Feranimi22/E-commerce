// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

// Register User
window.registerUser = function () {

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;

    const terms =
        document.getElementById("terms");

    if (name === "") {

        Swal.fire({
            icon: "warning",
            title: "Full Name Required",
            text: "Please enter your full name.",
            confirmButtonColor: "#d90429"
        });
        return;

    }

    if (email === "" || password === "") {

        Swal.fire({
            icon: "warning",
            title: "Missing Information",
            text: "Please fill all fields.",
            confirmButtonColor: "#d90429"
        });
        return;

    }

    if (!terms.checked) {

        Swal.fire({
            icon: "warning",
            title: "Terms & Conditions",
            text: "Please accept the Terms & Conditions to continue.",
            confirmButtonColor: "#d90429"
        });
        return;

    }

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

        .then(async (userCredential) => {

            await updateProfile(
                userCredential.user,
                { displayName: name }
            );

            Swal.fire({
                icon: "success",
                title: "Account Created!",
                text: "Your account has been created successfully.",
                confirmButtonColor: "#d90429"
            });

            window.location.href =
                "login.html";

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

// console.log("Signup JS Loaded");
