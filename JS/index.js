// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
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

function checkLogin(page) {

    const user = auth.currentUser;

    if (!user) {

        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first.",
            confirmButtonColor: "#d90429"
        });

        window.location.href = "HTML/login.html";

        return;

    }

    window.location.href = page;

}

window.logoutUser = function () {
    signOut(auth)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                confirmButtonColor: "#d90429"
            }).then(() => {
                window.location.href = "login.html";
            });
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

window.goToShop = function () {

    checkLogin("products.html");

};

window.goToCart = function () {

    checkLogin("cart.html");

};

window.viewProduct = function (id) {

    localStorage.setItem("selectedProduct", id);

    checkLogin("details.html");

};

window.subscribeNewsletter = function () {

    let email =
        document.getElementById("newsletterEmail").value;

    if (email === "") {

        Swal.fire({
            icon: "warning",
            title: "Email Required",
            text: "Please enter your email address.",
            confirmButtonColor: "#d90429"
        });

        return;

    }

    Swal.fire({
    icon: "success",
    title: "Subscribed!",
    text: "Thank you for subscribing to our newsletter!",
    confirmButtonColor: "#d90429"
});

    document.getElementById("newsletterEmail").value = "";

};

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

menuBtn.onclick = () => {

    navLinks.classList.toggle("active");

};