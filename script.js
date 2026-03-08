// Shopping cart management system

products = [
    { name: "Pipore 250G", price: 150 },
    { name: "Sara 1KG", price: 300 },
    { name: "Royale 500G", price: 200 }
];

let cart = [];

// Handle form submission and add product to cart
function submitOrder(e) {
    e.preventDefault();
    let form = e.target;
    let productName = document.getElementById("cartProductName").innerText.replace("Product: ", "");

    let fullName = form.querySelector('input[name="fullName"]').value;
    let phone = form.querySelector('input[name="phone"]').value;
    let address = form.querySelector('input[name="address"]').value;

    let product = products.find(p => p.name === productName);

    addToCart({
        name: product.name,
        price: product.price,
        fullName: fullName,
        phone: phone,
        address: address
    });

    document.getElementById("form-section").style.display = "none";
    form.reset();
}

// Add product to cart or increase quantity
function addToCart(product) {
    let existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    renderCart();
}

// Open order form for selected product
function openForm(product) {
    document.getElementById("cart-panel").style.display = "block";
    document.getElementById("form-section").style.display = "block";
    document.getElementById("cartProductName").innerText = "Product: " + product;
}

// Hide the order form
function cancelOrder() {
    document.getElementById("form-section").style.display = "none";
}

// Display cart items and calculate total
function renderCart() {
    let cartItems = document.getElementById("cart-items");
    let subtotal = document.getElementById("subtotal");
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        let p = document.createElement("p");
        const itemTotal = item.price * item.quantity;
        p.innerText = item.name + " x" + item.quantity + " = L.E " + itemTotal;
        cartItems.appendChild(p);
        total += itemTotal;
    });
    subtotal.innerText = total;
}

// Toggle cart panel visibility
document.querySelector(".cart-icon").addEventListener("click", function () {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.style.display = cartPanel.style.display === "none" ? "block" : "none";
});