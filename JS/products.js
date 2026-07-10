import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getAuth, } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

// Products
const products = [

    {
        id: 1,
        name: "Classic Hoodie",
        price: 45,
        image: "../images/hoodies.jpg"
    },

    {
        id: 2,
        name: "Denim Jacket",
        price: 65,
        image: "../images/jackets.jpg"
    },

    {
        id: 3,
        name: "Formal Shirt",
        price: 35,
        image: "../images/shirts.avif"
    },

    {
        id: 4,
        name: "Running Shoes",
        price: 80,
        image: "../images/shoes.avif"
    },

    {
        id: 5,
        name: "Summer Dress",
        price: 55,
        image: "../images/dresses.avif"
    },

    {
        id: 6,
        name: "Elegant Skirt",
        price: 40,
        image: "../images/skirt.avif"
    },

    {
        id: 7,
        name: "Fashion Heels",
        price: 70,
        image: "../images/heels.avif"
    },

    {
        id: 8,
        name: "Luxury Handbag",
        price: 90,
        image: "../images/handbag.avif"
    },

    {
        id: 9,
        name: "Kids T-Shirt",
        price: 20,
        image: "../images/kidshirt.avif"
    },

    {
        id: 10,
        name: "Kids Sneakers",
        price: 25,
        image: "../images/kidshoe.avif"
    },

    {
        id: 11,
        name: "Kids Hoodie",
        price: 30,
        image: "../images/kidhoodie.avif"
    },

    {
        id: 12,
        name: "Kids Cap",
        price: 15,
        image: "../images/kidcap.avif"
    },

    {
        id: 13,
        name: "Luxury Watch",
        price: 120,
        image: "../images/watch.avif"
    },

    {
        id: 14,
        name: "Designer Glasses",
        price: 50,
        image: "../images/sunglasses.avif"
    },

    {
        id: 15,
        name: "Premium Cap",
        price: 25,
        image: "../images/cap.avif"
    },

    {
        id: 16,
        name: "Office Blazer",
        price: 85,
        image: "../images/Blazer.avif"
    }

];

// SEARCH PRODUCTS
window.searchProducts = function () {

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".product-card");

    cards.forEach(function (card) {

        let title = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (title.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

};

window.addToCart = function (id, name, price, image) {

    const user = auth.currentUser;

    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first.",
            confirmButtonColor: "#d90429"
        });
        return;
    }

    const cartKey = `cart_${user.uid}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();

    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${name} has been added to your cart.`,
        confirmButtonColor: "#d90429"
    });

}

window.loadProduct = function () {

    const productId = localStorage.getItem("selectedProduct");

    if (!productId) {

        Swal.fire({
            icon: "error",
            title: "No Product Selected",
            text: "Please select a product first.",
            confirmButtonColor: "#d90429"
        });

        return;

    }

    const product = products.find(function (item) {

    });

    if (!product) {

        Swal.fire({
            icon: "error",
            title: "Product Not Found",
            text: "The selected product could not be found.",
            confirmButtonColor: "#d90429"
        });

        return;

    }

    document.getElementById("productName").innerText = product.name;

    document.getElementById("productPrice").innerText = "$" + product.price;

    document.getElementById("images").src = product.image;

    document.getElementById("images").alt = product.name;

};

window.addEventListener("DOMContentLoaded", loadProduct);


// FILTER PRODUCTS

window.filterProducts = function (category) {

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function (card) {

        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

};

window.updateCartCount = function () {

    const user = auth.currentUser;

    if (!user) return;

    const cartKey = `cart_${user.uid}`;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    let total = 0;

    cart.forEach(function (item) {

        total += item.quantity;

    });

    const badge =
        document.getElementById("cartCount");

    if (badge) {

        badge.innerText = total;

    }

};

// VIEW PRODUCT

window.viewProduct = function (id) {
    localStorage.setItem(
        "selectedProduct",
        id
    );

    updateCartCount();

    window.location.href =
        "HTML/details.html";

}


// SLIDER

let slides = document.querySelectorAll(".slide");

console.log("Slides found:", slides.length);

let currentSlide = 0;

if (slides.length > 0) {

    setInterval(function () {

        console.log("Changing slide");

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");

    }, 3000);

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

                window.location.href = "HTML/login.html";

            });

        })

        .catch((error) => {

            Swal.fire({
                icon: "error",
                title: "Logout Failed",
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