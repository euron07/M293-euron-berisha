document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count")?.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${name} wurde in den Warenkorb gelegt!`);
        console.log(name);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            addToCart(this.dataset.name, parseFloat(this.dataset.price));
        });
    });

    if (document.getElementById("cart-container")) {
        function loadCart() {
            let cartContainer = document.getElementById("cart-container");
            cartContainer.innerHTML = cart.length > 0
                ? cart.map((item, index) => `
                    <p>${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)}€
                    <button onclick="changeQuantity(${index}, -1)">➖</button>
                    <button onclick="changeQuantity(${index}, 1)">➕</button>
                    <button onclick="removeFromCart(${index})">❌</button>
                    </p>
                `).join("")
                : "<p>Dein Warenkorb ist leer.</p>";
        }

        window.changeQuantity = function(index, amount) {
            if (cart[index].quantity + amount > 0) {
                cart[index].quantity += amount;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            updateCartCount();
        };

        window.removeFromCart = function(index) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            updateCartCount();
        };

        loadCart();
    }

    updateCartCount();
});
