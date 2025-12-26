let orders = JSON.parse(localStorage.getItem('orders')) || [];
const orderListDiv = document.getElementById('orderList');
const orderFilter = document.getElementById('orderFilter');

// ----- Render Orders with Filtering -----
function renderOrders(filterStatus = "All") {
  orderListDiv.innerHTML = "";
  let displayOrders = orders.slice().reverse(); // Most recent first

  // Filter by status if selected
  if (filterStatus !== "All") {
    displayOrders = displayOrders.filter(order => order.status === filterStatus);
  }
  if (displayOrders.length === 0) {
    orderListDiv.innerHTML = `<p>No orders found for "${filterStatus}".</p>`;
    return;
  }
  displayOrders.forEach((order, idx) => {
    const itemsHtml = order.items.map(item => `
      <div style="margin-bottom:10px;">
        <img src="../assets/${item.image}" alt="${item.name}" style="width:42px;height:42px;border-radius:7px;margin-right:9px;vertical-align:middle;">
        <span>${item.name} (x${item.qty})</span>
      </div>
    `).join("");
    orderListDiv.innerHTML += `
      <div class="order-history-card" style="margin-bottom:2em;box-shadow:0 1px 11px #e0c9fa;padding:1em 1em 1.7em 1em;">
        <p><b>Order #:</b> ${order.id}</p>
        <p><b>Date:</b> ${order.date}</p>
        <p><b>Items:</b><br>${itemsHtml}</p>
        <p><b>Total:</b> ₹${order.total}</p>
        <p><b>Status:</b> <span class="order-status" style="background:#b982f3;color:#fff;border-radius:5px;padding:0.18em 1.1em;">${order.status}</span></p>
        <button class="viewOrderBtn" data-idx="${orders.length - 1 - idx}">View Details</button>
        ${order.status !== "Cancelled" && order.status !== "Delivered"
          ? `<button class="cancelOrderBtn" data-idx="${orders.length - 1 - idx}" style="background:#faa9b5;color:#88041a;padding:0.4em 1.1em;border-radius:6px;margin-left:8px;border:none;cursor:pointer;">Cancel Order</button>`
          : ""}
      </div>
    `;
  });
}
renderOrders();

// ----- Filter Orders by Status -----
orderFilter.addEventListener('change', function() {
  renderOrders(this.value);
});

// ----- Modal Order Details -----
function showOrderDetails(idx) {
  const order = orders[idx];
  let itemsHtml = '';
  order.items.forEach(item => {
    itemsHtml += `
      <div class="order-details-item-row">
        <img src="../assets/${item.image}" alt="${item.name}">
        <div>
          <div><b>${item.name}</b></div>
          <div>Qty: ${item.qty}</div>
          <div>Price: ₹${item.price}</div>
        </div>
      </div>
    `;
  });
  document.getElementById('orderDetailsContent').innerHTML = `
    <div class="order-details-fields"><b>Order #:</b> ${order.id}</div>
    <div class="order-details-fields"><b>Date:</b> ${order.date}</div>
    <div class="order-details-fields"><b>Status:</b> ${order.status}</div>
    <div class="order-details-section-title">Items</div>
    ${itemsHtml}
    <div class="order-details-section-title">Shipping Address</div>
    <div class="order-details-fields">${order.shipping}</div>
    <div class="order-details-fields"><b>Payment Mode:</b> ${order.payment}</div>
    <div class="order-details-fields"><b>Tracking:</b> ${order.tracking}</div>
    <div class="order-details-total-row"><b>Total:</b> <span>₹${order.total}</span></div>
  `;
  document.getElementById('orderModal').style.display = 'flex';
}

// ----- Click Handlers: View Details & Cancel Order -----
orderListDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('viewOrderBtn')) {
    showOrderDetails(Number(e.target.getAttribute('data-idx')));
  }
  if (e.target.classList.contains('cancelOrderBtn')) {
    const idx = Number(e.target.getAttribute('data-idx'));
    if (orders[idx].status !== "Cancelled") {
      orders[idx].status = "Cancelled";
      orders[idx].tracking = "Order cancelled by user.";
      localStorage.setItem('orders', JSON.stringify(orders));
      renderOrders(orderFilter.value);
    }
  }
});

// ----- Close Modal -----
document.getElementById('closeOrderModal').onclick = function() {
  document.getElementById('orderModal').style.display = 'none';
};
