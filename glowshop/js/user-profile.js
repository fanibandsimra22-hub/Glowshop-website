// --- Edit Profile Modal ---
document.getElementById('editProfileBtn').onclick = function() {
  // Fill modal with current info
  document.getElementById('name').value = document.getElementById('profile-username').textContent;
  document.getElementById('email').value = document.getElementById('profile-email').textContent;
  document.getElementById('profileModal').style.display = 'flex';
};
document.getElementById('closeProfileModal').onclick = function() {
  document.getElementById('profileModal').style.display = 'none';
};
document.getElementById('profileForm').onsubmit = function(e) {
  e.preventDefault();
  // Get new values
  const newName = document.getElementById('name').value;
  const newEmail = document.getElementById('email').value;
  // Update on page
  document.getElementById('profile-username').textContent = newName;
  document.getElementById('profile-email').textContent = newEmail;
  // Update main/default address name if exists:
  if (addresses && addresses.length > 0) {
    addresses[0].fullName = newName;
    renderAddresses();
  }
  document.getElementById('profileModal').style.display = 'none';
};


// --- Address List Management ---
let addresses = [
  {
    fullName: document.getElementById('profile-username').textContent === 'Loading...'
      ? 'John Doe'
      : document.getElementById('profile-username').textContent,
    phone: '9876543210',
    pincode: '110011',
    street: '123, Main Street',
    city: 'New Delhi',
    state: 'Delhi',
    isDefault: true
  },
  {
    fullName: 'Jane Smith',
    phone: '9123456780',
    pincode: '560001',
    street: '456, Park Lane',
    city: 'Bengaluru',
    state: 'Karnataka',
    isDefault: false
  }
];

function renderAddresses() {
  const container = document.getElementById('addressesList');
  container.innerHTML = '';
  addresses.forEach((addr, i) => {
    container.innerHTML += `
      <div class="address-info${addr.isDefault ? ' default-address' : ''}">
        <p><b>Full Name:</b> ${addr.fullName}</p>
        <p><b>Phone Number:</b> ${addr.phone}</p>
        <p><b>Pin Code:</b> ${addr.pincode}</p>
        <p><b>Street Address:</b> ${addr.street}</p>
        <p><b>City:</b> ${addr.city}</p>
        <p><b>State:</b> ${addr.state}</p>
        ${addr.isDefault ? '<span class="default-label">Default</span>' : ''}
        <button class="removeAddressBtn" data-idx="${i}">Remove</button>
      </div>
    `;
  });
  // Re-attach Remove listeners after rendering
  document.querySelectorAll('.removeAddressBtn').forEach(function(btn) {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      addresses.splice(idx, 1);
      renderAddresses();
    };
  });
}

// On page load, render initial addresses
renderAddresses();

// --- Add New Address ---
document.getElementById('addAddressBtn').onclick = function() {
  document.getElementById('addressModal').style.display = 'flex';
};

document.getElementById('closeModal').onclick = function() {
  document.getElementById('addressModal').style.display = 'none';
};

document.getElementById('addressForm').onsubmit = function(e) {
  e.preventDefault();
  // Read form values
  const fullName = document.getElementById('modalFullName').value;
  const phone = document.getElementById('modalPhone').value;
  const pincode = document.getElementById('modalPincode').value;
  const street = document.getElementById('modalStreet').value;
  const city = document.getElementById('modalCity').value;
  const state = document.getElementById('modalState').value;
  // Add address to list
  addresses.push({ fullName, phone, pincode, street, city, state, isDefault: false });
  renderAddresses();
  document.getElementById('addressModal').style.display = 'none';
  e.target.reset(); // clear the form
};
