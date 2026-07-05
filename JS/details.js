// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getAuth,
    signOut

} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Firebase Config
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

// Products
const products = [

{
    id:1,
    name:"Classic Hoodie",
    price:45,
    image:"../images/hoodies.jpg"
},

{
    id:2,
    name:"Denim Jacket",
    price:65,
    image:"../images/jackets.jpg"
},

{
    id:3,
    name:"Formal Shirt",
    price:35,
    image:"../images/shirts.avif"
},

{
    id:4,
    name:"Running Shoes",
    price:80,
    image:"../images/shoes.avif"
},

{
    id:5,
    name:"Summer Dress",
    price:55,
    image:"../images/dresses.avif"
},

{
    id:6,
    name:"Elegant Skirt",
    price:40,
    image:"../images/skirt.avif"
},

{
    id:7,
    name:"Fashion Heels",
    price:70,
    image:"../images/heels.avif"
},

{
    id:8,
    name:"Luxury Handbag",
    price:90,
    image:"../images/handbag.avif"
},

{
    id:9,
    name:"Kids T-Shirt",
    price:20,
    image:"../images/kidshirt.avif"
},

{
    id:10,
    name:"Kids Sneakers",
    price:25,
    image:"../images/kidshoe.avif"
},

{
    id:11,
    name:"Kids Hoodie",
    price:30,
    image:"../images/kidhoodie.avif"
},

{
    id:12,
    name:"Kids Cap",
    price:15,
    image:"../images/kidcap.avif"
},

{
    id:13,
    name:"Luxury Watch",
    price:120,
    image:"../images/watch.avif"
},

{
    id:14,
    name:"Designer Glasses",
    price:50,
    image:"../images/sunglasses.avif"
},

{
    id:15,
    name:"Premium Cap",
    price:25,
    image:"../images/cap.avif"
},

{
    id:16,
    name:"Office Blazer",
    price:85,
    image:"../images/Blazer.avif"
}

];

window.loadProduct = function () {                                                 
    const productId = localStorage.getItem("selectedProduct");

    if (!productId) {
        console.warn("No product selected.");
        return;
    }

    const product = products.find(p => p.id == productId);

    if (!product) {
        console.warn("Product not found for id:", productId);
        return;
    }

    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = "$" + product.price;
    document.getElementById("images").src = product.image; 
};

loadProduct();

window.viewProduct = function(id){

    localStorage.setItem("selectedProduct", id);

    window.location.href = "details.html";

}

// Add To Cart
window.addCurrentProductToCart = function () {

    const user = auth.currentUser;

    if (!user) {

        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first to continue.",
            confirmButtonColor: "#d90429",
            confirmButtonText: "Login"
        });

        window.location.href = "login.html";

        return;

    }

    const productId =
        localStorage.getItem("selectedProduct");

    const product =
        products.find(p => p.id == productId);

    if (!product) {

        Swal.fire({
            icon: "error",
            title: "Product Not Found",
            text: "Sorry, the selected product could not be found.",
            confirmButtonColor: "#d90429",
            confirmButtonText: "OK"
        });

        return;

    }

    const quantity =
        parseInt(document.getElementById("quantity").value);

    const cartKey =
        `cart_${user.uid}`;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItem =
        cart.find(item => item.id == product.id);

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity

        });

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

    localStorage.setItem(

        cartKey,

        JSON.stringify(cart)

    );

    updateCartCount();

    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        confirmButtonColor: "#d90429",
        confirmButtonText: "Continue Shopping"
    });

};

// Logout
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

// Mobile Menu
const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.onclick = () => {

        navLinks.classList.toggle("active");

    };

}

// Load Product
loadProduct();