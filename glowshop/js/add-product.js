document.getElementById('addProductForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  // Get values from form
  const name = form.productName.value.trim();
  const desc = form.description.value.trim();
  const price = form.price.value.trim();
  const usage = form.usage.value.trim();
  const seller = form.seller.value.trim();
  const image = form.image.value.trim();

  // Get current products array or make new one
  let products = JSON.parse(localStorage.getItem('products')) || [];

  products.push({
    id: Date.now().toString(),
    name,
    desc,
    price,
    usage,
    seller,
    image
  });

  localStorage.setItem('products', JSON.stringify(products));
  form.reset();
  document.getElementById('formMessage').textContent = "Product added! Go to Products page to see it.";
});
