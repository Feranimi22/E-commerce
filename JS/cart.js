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

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    displayCart();
});

window.displayCart = function() {

    const cartContainer =
        document.getElementById("cartContainer");

    const totalPrice =
        document.getElementById("totalPrice");

    if (!cartContainer) return;

    const user = auth.currentUser;

    if (!user) return;

    const cartKey = `cart_${user.uid}`;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `

<div class="cart-item">

<h3>${item.name}</h3>

<p>Price: $${item.price}</p>

<p>Quantity: ${item.quantity}</p>

<p>Subtotal: $${itemTotal}</p>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

    });

    totalPrice.innerText = "Total: $" + total;

}

window.updateCartCount = function () {

    const user = auth.currentUser;

    if (!user) return;

    const cartKey = `cart_${user.uid}`;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    const badge =
        document.getElementById("cartCount");

    if (badge) {

        badge.innerText = total;

    }

};

window.removeItem = function(index) {

    const user = auth.currentUser;

    const cartKey = `cart_${user.uid}`;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}

window.placeOrder = function() {

    const user = auth.currentUser;
    if (!user) {
        alert("Please login first");
        return;
    }

    const cartKey = `cart_${user.uid}`;

    Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Your order has been placed successfully.",
    confirmButtonColor: "#d90429"
});
    localStorage.removeItem(cartKey);

    window.location.href = "index.html";

}

window.logoutUser = function () {

    signOut(auth)

    .then(() => {

        window.location.href = "login.html";

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

const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");

menuBtn.onclick = () => {

    navLinks.classList.toggle("active");

};

// console.log(localStorage);
