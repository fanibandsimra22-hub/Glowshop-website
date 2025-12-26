// Show / hide payment details based on selection
document.getElementById('paymentSelect').addEventListener('change', function() {
  const cardSection = document.getElementById('cardDetails');
  const upiSection = document.getElementById('upiDetails');
  cardSection.style.display = this.value === "Credit Card" ? "block" : "none";
  upiSection.style.display = this.value === "UPI" ? "block" : "none";
});

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const address = this.address.value.trim();
  const payment = this.payment.value;

  let paymentDetails = {};
  if (payment === 'Credit Card') {
    paymentDetails = {
      cardName: this.cardName.value.trim(),
      cardNumber: this.cardNumber.value.trim(),
      cardExpiry: this.cardExpiry.value.trim(),
      cardCVV: this.cardCVV.value.trim()
    };
    // SIMPLE validation (optional)
    if (!(paymentDetails.cardName && paymentDetails.cardNumber.length === 16 
      && paymentDetails.cardExpiry && paymentDetails.cardCVV.length >= 3)) {
      document.getElementById('checkoutMessage').textContent = "Please fill in all card details correctly.";
      return;
    }
  } else if (payment === 'UPI') {
    paymentDetails = {
      upiId: this.upiId.value.trim()
    };
    if (!paymentDetails.upiId.includes('@') || paymentDetails.upiId.length < 6) {
      document.getElementById('checkoutMessage').textContent = "Please enter a valid UPI ID.";
      return;
    }
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length === 0) {
    document.getElementById('checkoutMessage').textContent = "Your cart is empty!";
    return;
  }

  const order = {
    id: "OD" + Date.now(),
    date: new Date().toLocaleDateString(),
    items: cart.map(item => ({
      name: item.name,
      image: item.image.replace('../assets/', ''),
      qty: item.qty,
      price: item.price
    })),
    status: "Placed",
    shipping: address,
    payment: payment,
    paymentDetails: paymentDetails, // Extra info for cards/upi!
    tracking: "Order placed, preparing to ship.",
    total: cart.reduce((sum, item) => sum + item.qty * parseInt(item.price), 0)
  };

  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');

  document.getElementById('checkoutMessage').textContent = "Order placed! Redirecting to Orders...";
  setTimeout(function() {
    window.location.href = "orders.html";
  }, 1300);
});
