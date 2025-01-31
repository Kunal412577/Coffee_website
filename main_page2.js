// JavaScript for Add to Cart functionality with Sidebar

document.addEventListener("DOMContentLoaded", () => {
    const cart = [];

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartToggleBtn = document.querySelector(".cart-toggle");
    const cartCloseBtn = document.querySelector(".cart-close");

    // Open/Close Cart Sidebar
    cartToggleBtn.addEventListener("click", () => {
        cartSidebar.classList.add("open");
    });

    cartCloseBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
    });

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const title = productCard.querySelector(".product-title").innerText;
            const size = productCard.querySelector(".product-size").value;
            const sugar = productCard.querySelector(".product-sugar").value;
            const quantity = productCard.querySelector(".quantity-selector span").innerText;
            const price = productCard.querySelector(".product-price").innerText;

            // Add product to cart array
            const product = {
                title,
                size,
                sugar,
                quantity: parseInt(quantity),
                price
            };

            cart.push(product);
            updateCartUI();
            alert(`${title} added to cart!`);
        });
    });

    // Quantity increment/decrement buttons
    const quantitySelectors = document.querySelectorAll(".quantity-selector");

    quantitySelectors.forEach((selector) => {
        const decreaseBtn = selector.querySelector(".quantity-btn:first-child");
        const increaseBtn = selector.querySelector(".quantity-btn:last-child");
        const quantityDisplay = selector.querySelector("span");

        decreaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityDisplay.innerText);
            if (quantity > 1) {
                quantity--;
                quantityDisplay.innerText = quantity;
            }
        });

        increaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityDisplay.innerText);
            quantity++;
            quantityDisplay.innerText = quantity;
        });
    });

    // Update Cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div>
                    <h4>${item.title}</h4>
                    <p>Size: ${item.size}, Sugar: ${item.sugar}, Quantity: ${item.quantity}</p>
                    <p>${item.price}</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Remove item from cart
        const removeButtons = document.querySelectorAll(".remove-from-cart");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }
});
