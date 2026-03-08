// Shopping cart management system

products = [
    { name: "Pipore 250G", price: 150 },
    { name: "Sara 1KG", price: 300 },
    { name: "Royale 500G", price: 200 }
];

let cart = [];

// Add product to cart or increase quantity
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    let existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    // Show cart panel
    document.getElementById("cart-panel").style.display = "block";
    renderCart();
}

// Handle final order submission with delivery details
function submitOrder(e) {
    e.preventDefault();
    let form = e.target;
    
    let fullName = form.querySelector('input[name="fullName"]').value;
    let phone = form.querySelector('input[name="phone"]').value;
    let address = form.querySelector('input[name="address"]').value;

    // Add delivery details to all cart items
    cart.forEach(item => {
        item.fullName = fullName;
        item.phone = phone;
        item.address = address;
    });

    alert("Order confirmed!\nName: " + fullName + "\nPhone: " + phone + "\nAddress: " + address);
    
    // Clear cart and form
    cart = [];
    document.getElementById("form-section").style.display = "none";
    document.getElementById("cart-panel").style.display = "none";
    form.reset();
    renderCart();
}

// Open order form to enter delivery details
function showCheckout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    document.getElementById("form-section").style.display = "block";
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