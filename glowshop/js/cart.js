const cart = JSON.parse(localStorage.getItem('cart')) || [];
const tbody = document.getElementById('cartTableBody');
const cartTotalSpan = document.querySelector('.cart-total span:last-child');

let total = 0;

if (cart.length === 0) {
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Your cart is empty.</td></tr>`;
  cartTotalSpan.textContent = "₹0";
} else {
  cart.forEach((item, idx) => {
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" style="width:40px; vertical-align:middle; margin-right:10px;">
        ${item.name}
      </td>
      <td>₹${item.price}</td>
      <td><input type="number" min="1" value="${item.qty}" data-idx="${idx}" style="width:50px;"></td>
      <td>₹${itemTotal}</td>
      <td><button class="remove-btn" data-idx="${idx}">✕</button></td>
    `;
    tbody.appendChild(row);
  });
  cartTotalSpan.textContent = "₹" + total;
}

// Remove item from cart
tbody.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-btn')) {
    const idx = e.target.getAttribute('data-idx');
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
  }
});

// Update quantity
tbody.addEventListener('change', function(e) {
  if (e.target.type === 'number') {
    const idx = e.target.getAttribute('data-idx');
    const value = parseInt(e.target.value);
    if (value > 0) {
      cart[idx].qty = value;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    }
  }
});
