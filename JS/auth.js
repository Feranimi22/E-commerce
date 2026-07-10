import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCk6PYkKtIXNl4YG7ci8degKd0sXkmsdl8",
    authDomain: "e-commerce-31afb.firebaseapp.com",
    projectId: "e-commerce-31afb",
    storageBucket: "e-commerce-31afb.firebasestorage.app",
    messagingSenderId: "22248072968",
    appId: "1:22248072968:web:79be7e41b08a91eedd2ebd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show logged-in user's name
onAuthStateChanged(auth, (user) => {

    const welcomeUser = document.getElementById("welcomeUser");

    if (welcomeUser) {

        if (user) {

            welcomeUser.textContent =
                `Welcome ${user.displayName || user.email}`;

        } else {

            welcomeUser.textContent = "";

        }

    }

});

// Open protected pages
window.goToProtectedPage = function(page) {

    const user = auth.currentUser;

    if (!user) {

        alert("Please login to continue.");

        window.location.href = "login.html";

        return;

    }

    window.location.href = page;

};

// Logout
window.logoutUser = function() {

    signOut(auth)

    .then(() => {

        window.location.href = "login.html";

    })

    .catch((error) => {

        alert(error.message);

    });

};