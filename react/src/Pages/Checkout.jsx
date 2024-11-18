import React from 'react';
import { useLocation } from 'react-router-dom'; 
import { Button, Typography, Box } from '@mui/material';
import ProductList from '../Components/ProductList';
import CustomerForm from '../Components/CustomerForm'; 
/**
 * Checkout component that displays the shopping list and a form to collect customer information.
 * When the customer submits the form, the order is sent to the server.
 */
const Checkout = () => {
  // Using useLocation hook to get the location object and extract items passed from the Home component
  const location = useLocation();
  const list = location.state?.items || []; 

  // Define the API URL where the customer order will be sent
  const API_URL = "https://localhost:5103/";

  /**
   * Group the items by category for easier display on the checkout page.
   * The items are grouped by category, making it easier to render them on the UI.
   */
  const groupedItems = list.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  /**
   * This function is triggered when the customer submits the form.
   * It gathers customer information (name, address, email) and the list of items,
   * and sends the data to the server to process the order.
   */
  const addClick = async () => {
    // Collect customer details from form input fields
    const fullname = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    // Create the data object to be sent to the server
    const data = {
      fullname,
      address,
      email,
      list: JSON.stringify(list), // Convert list to a JSON string for transmission
    };

    try {
      // Send the customer data and shopping list to the server
      const res = await fetch(API_URL + "api/app/AddCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(data), 
      });
      const result = await res.text();
      alert(result); // Display the server response (success or error message)
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Error submitting the order, please try again.");
    }
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header>
        <Typography variant="h4" gutterBottom textAlign={'center'}>Checkout</Typography>
        <CustomerForm onSubmit={addClick} />
        <Box sx={{ marginTop: 3, maxWidth: 400, width: '100%' }}>
          <ProductList groupedItems={groupedItems} />
        </Box>
      </header>
    </Box>
  );
};

export default Checkout;
