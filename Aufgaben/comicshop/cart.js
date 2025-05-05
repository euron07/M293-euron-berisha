let cart = JSON.parse(localStorage.getItem("comicCart")) || [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(title, price) {
  cart.push({ title, price });
  localStorage.setItem("comicCart", JSON.stringify(cart));
  updateCartCount();
  showCartModal();
}

function showCartModal() {
  const modal = document.getElementById("cart-modal");
  const cartList = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.title} – CHF ${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    totalPrice += item.price;
  });

  total.textContent = `CHF ${totalPrice.toFixed(2)}`;
  modal.classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

function openCart() {
    showCartModal();
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Dein Warenkorb ist leer.");
      return;
    }
  
    alert("Danke für deinen Einkauf! 🥳");
    cart = [];
    localStorage.removeItem("comicCart");
    updateCartCount();
    closeCart();
  }
  
window.addEventListener("DOMContentLoaded", updateCartCount);
