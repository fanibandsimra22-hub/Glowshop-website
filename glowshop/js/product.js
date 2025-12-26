const productListDiv = document.getElementById('productListing');
if (productListDiv) {
  // Default demo products
  const defaultProducts = [
    {
      id: "1",
      name: "Hydrating Moisturizer",
      price: "799",
      desc: "For dry skin – nourishes all day.",
      usage: "Dry skin",
      seller: "GlowShop",
      image: "moisturizer.jpg"
    },
    {
      id: "2",
      name: "Ultra-Light Sunscreen",
      price: "549",
      desc: "SPF 50, suits all skin tones.",
      usage: "All skin tones",
      seller: "GlowShop",
      image: "sunscreen.jpg"
    },
    {
      id: "3",
      name: "Vitamin C Serum",
      price: "999",
      desc: "Brightens dull skin.",
      usage: "Dull skin",
      seller: "GlowShop",
      image: "serum.jpg"
    }
  ];

  // User-added products from localStorage
  const userProducts = JSON.parse(localStorage.getItem('products')) || [];
  const allProducts = [...defaultProducts, ...userProducts];

  productListDiv.innerHTML = "";
  allProducts.forEach(prod => {
    // Show delete button for user-added products only
    const isUserProduct = userProducts.some(up => up.id === prod.id);

    productListDiv.innerHTML += `
      <div class="product-card" data-id="${prod.id}">
        <img src="../assets/${prod.image}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p class="price">₹${prod.price}</p>
        <p>${prod.desc}</p>
        <p style="font-size:0.9em;color:#8b59c2;">${prod.usage || ""}</p>
        <p style="font-size:0.9em;color:#aaa;">Seller: ${prod.seller || "GlowShop"}</p>
        <button
          class="addToCartBtn"
          data-id="${prod.id}"
          data-name="${prod.name}"
          data-price="${prod.price}"
          data-image="../assets/${prod.image}">
          Add to Cart
        </button>
        ${isUserProduct ? `<button class="deleteProductBtn" data-id="${prod.id}" style="margin-top:7px;background:#ffc8c8;color:#990000;">Delete</button>` : ""}
      </div>
    `;
  });

  // Handle Add to Cart
  document.querySelectorAll('.addToCartBtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      const image = btn.getAttribute('data-image');
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let found = false;
      cart.forEach(item => {
        if (item.id === id) {
          item.qty += 1;
          found = true;
        }
      });
      if (!found) {
        cart.push({ id, name, price, image, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(name + " added to cart!");
    });
  });

  // Handle DELETE Product (user-added only)
  document.querySelectorAll('.deleteProductBtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const idToDelete = btn.getAttribute('data-id');
      let allUserProds = JSON.parse(localStorage.getItem('products')) || [];
      // Remove from user products in localStorage
      allUserProds = allUserProds.filter(item => item.id !== idToDelete);
      localStorage.setItem('products', JSON.stringify(allUserProds));
      // Remove card from DOM instantly
      const card = btn.closest('.product-card');
      if (card) card.remove();
    });
  });
}

//using ajax
document.getElementById("suggestBtn").onclick = function() {
  fetch("suggest-product.php")
    .then(response => response.text())
    .then(data => {
      document.getElementById("suggestResult").textContent = data;
    })
    .catch(error => {
      document.getElementById("suggestResult").textContent = "Could not fetch suggestion.";
    });
};

