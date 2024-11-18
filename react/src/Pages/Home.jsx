import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Redux/productSlice';
import { Button, Typography, Box } from '@mui/material';
import ProductSelectionForm from '../Components/ProductSelectionForm'; 
import ProductList from '../Components/ProductList';

/**
 * Home Page that displays a shopping list and allows users to select products
 * to add to the list, as well as proceed to checkout.
 */
export function Home() {
  // State to hold the new product details (category, item, count)
  const [newProduct, setNewProduct] = useState({
    category: '',
    item: '',
    count: 1,
  });

  // State to hold the list of available categories
  const [categories, setCategories] = useState([]);

  // State to hold products grouped by category
  const [productsByCategory, setProductsByCategory] = useState({});

  // Redux selector to access the list of items (products) in the store
  const items = useSelector((state) => state.products.items);

  // Redux dispatch hook to dispatch actions (like adding a product)
  const dispatch = useDispatch();

  /**
   * Fetches categories and products from the server on component mount.
   * Also organizes products by category.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        // Organize products by category
        const productLookup = data.reduce((acc, category) => {
          const products = category?.products ? JSON.parse(category.products) : [];
          acc[category.category] = products;
          return acc;
        }, {});
        // Set products by category in state
        setProductsByCategory(productLookup);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 
  /**
   * Handles category change in the product selection form.
   * Updates the newProduct state with the selected category and resets the selected item.
   */
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
      item: value === prevProduct.category ? prevProduct.item : '', // Reset item if category changes
    }));
  };

  /**
   * Adds a new product to the list if the category and item are valid.
   * Dispatches the action to add the product to the Redux store.
   */
  const addNewProduct = () => {
    const availableProducts = productsByCategory[newProduct.category] || [];

    // Check if category and item are selected and if the item is valid for the selected category
    if (newProduct.category && newProduct.item) {
      if (!availableProducts.includes(newProduct.item)) {
        alert('The selected product is not part of the available list for this category.');
      } else {
        // Dispatch action to add product to Redux store
        dispatch(addProduct(newProduct));

        // Reset the product form after adding
        setNewProduct((prevProduct) => ({ ...prevProduct, count: 1 }));
      }
    } else {
      alert('Make sure to select a category and item!');
    }
  };

  /**
   * Groups items from the Redux store by category for easier display in the UI.
   * @returns {Object} Grouped items by category
   */
  const groupedItems = items.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header>
        <Typography variant="h4" gutterBottom textAlign="center">Shopping list</Typography>

        {/* Product selection form with categories and product options */}
        <ProductSelectionForm
          categories={categories}
          productsByCategory={productsByCategory}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleCategoryChange={handleCategoryChange}
        />
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={addNewProduct} sx={{ textTransform: 'none' }}>
            Add Product
          </Button>
          <Link to="/checkout" state={{ items }}>
            <Button variant="outlined" color="secondary" sx={{ textTransform: 'none' }}>
              Go to Checkout
            </Button>
          </Link>
        </Box>
        {/* Display the list of grouped products */}
        <Box sx={{ marginTop: 3, maxWidth: 400, width: '100%' }}>
          <ProductList groupedItems={groupedItems} />
        </Box>
      </header>
    </Box>
  );
}