document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const totalAmount = document.querySelector(".total-amount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalAmount.textContent = "$0.00";
            return;
        }

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: 
                        <button class="quantity-btn decrease" data-index="${index}">-</button> 
                        <span>${item.quantity}</span> 
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    // Function to update local storage
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Handle quantity increase & decrease
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("increase")) {
            let index = event.target.dataset.index;
            cart[index].quantity++;
            updateCart();
        }

        if (event.target.classList.contains("decrease")) {
            let index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }

        if (event.target.classList.contains("remove-item")) {
            let index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Checkout button should redirect to checkout page
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return;
        }

        // Save cart details before checkout
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to checkout page
        window.location.href = "checkout.html"; // Ensure checkout.html exists in your project
    });

    // Initial render
    renderCart();
});
