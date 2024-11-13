
document.addEventListener('DOMContentLoaded', function () {

    const dateElement = document.getElementById('date');
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;

    const customerNameInput = document.getElementById('customer-name');
    const customerMobileInput = document.getElementById('customer-mobile');
    const itemNameInput = document.getElementById('item-name');
    const itemPriceInput = document.getElementById('item-price');
    const itemQuantityInput = document.getElementById('item-quantity');
    const addItemButton = document.getElementById('add-item');
    const itemTableBody = document.querySelector('#item-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const generateBillButton = document.getElementById('generate-bill');
    const printContainer = document.getElementById('print-container');
    const printButton = document.getElementById('print-btn');
    const billContent = document.getElementById('bill-content');
  
    let items = []; 
    addItemButton.addEventListener('click', function () {
      const customerName = customerNameInput.value.trim();
      const customerMobile = customerMobileInput.value.trim();
  
      if (!customerName || !customerMobile) {
        alert('Please enter customer details (name and mobile) before adding items.');
        return;
      }
  
      const name = itemNameInput.value.trim();
      const price = parseFloat(itemPriceInput.value);
      const quantity = parseInt(itemQuantityInput.value);
  
      if (name && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
        // Calculate total for this item
        const total = price * quantity;
  
        // Add item to items array
        items.push({ name, price, quantity, total });
  
        // Create table row for item
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${name}</td>
          <td>${price.toFixed(2)}</td>
          <td>${quantity}</td>
          <td>${total.toFixed(2)}</td>
          <td><button class="remove-item">Remove</button></td>
        `;
  
        // Append row to the table
        itemTableBody.appendChild(row);
  
        // Update total price
        updateTotalPrice();
  
        // Clear item input fields
        itemNameInput.value = '';
        itemPriceInput.value = '';
        itemQuantityInput.value = '';
      } else {
        alert('Please fill in all fields for the item correctly.');
      }
    });
  
    // Function to update the total price
    function updateTotalPrice() {
      const total = items.reduce((sum, item) => sum + item.total, 0);
      totalPriceElement.textContent = total.toFixed(2);
    }
  
    // Handle remove item from the table
    itemTableBody.addEventListener('click', function (e) {
      if (e.target.classList.contains('remove-item')) {
        const row = e.target.closest('tr');
        const index = Array.from(itemTableBody.children).indexOf(row);
        items.splice(index, 1); // Remove the item from the array
        row.remove(); // Remove row from the table
        updateTotalPrice(); // Update the total price
      }
    });
  
    // Function to generate the bill
    generateBillButton.addEventListener('click', function () {
      const customerName = customerNameInput.value.trim();
      const customerMobile = customerMobileInput.value.trim();
  
      if (!customerName || !customerMobile) {
        alert('Please fill in the customer details before generating the bill.');
        return;
      }
  
      let billContentHtml = `<h2>Invoice</h2>
      <p><strong>Company Name:</strong> Vijay Watch</p>
      <p><strong>GST Number:</strong> 781265351561</p>
      <p><strong>Address:</strong> Latehar, Jharkhand, 829206</p>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Mobile:</strong> ${customerMobile}</p>
      <p><strong>Date:</strong> ${currentDate}</p>
      <hr>
      <table border="1" cellpadding="10" cellspacing="0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (Rs)</th>
            <th>Quantity</th>
            <th>Total (R)</th>
          </tr>
        </thead>
        <tbody>`;
  
      items.forEach(item => {
        billContentHtml += `
          <tr>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.total.toFixed(2)}</td>
          </tr>
        `;
      });
  
      billContentHtml += `
        </tbody>
      </table>
      <hr>
      <p><strong>Total:</strong>Rs: ${totalPriceElement.textContent}</p>
      `;
  
      billContent.innerHTML = billContentHtml;
      printContainer.style.display = 'block';
    });
  
    printButton.addEventListener('click', function () {
      window.print();
    });
  });
  